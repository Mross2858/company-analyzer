const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const debugLogger = require('./llm-debug-logger');

// Configuration for critical files and their required elements
const CRITICAL_FILES = {
  'frontend/src/components/DashboardLayout.tsx': [
    'DashboardLayout',
    'CompanyTable',
    'FileUpload',
    'DataVisualizations'
  ],
  'frontend/src/components/CompanyTable.tsx': [
    'CompanyTable',
    'sortField',
    'sortDirection',
    'handleSort'
  ],
  'frontend/src/components/FileUpload.tsx': [
    'FileUpload',
    'useDropzone',
    'onDrop'
  ],
  'frontend/src/components/DataVisualizations.tsx': [
    'DataVisualizations',
    'BarChart',
    'ResponsiveContainer'
  ]
};

function getDiffStats(changedFiles) {
  const stats = {
    additions: 0,
    deletions: 0
  };

  changedFiles.split('\n').forEach(file => {
    if (!file) return;
    const diff = execSync(`git diff HEAD^1 -- "${file}"`, { encoding: 'utf8' });
    const lines = diff.split('\n');
    lines.forEach(line => {
      if (line.startsWith('+') && !line.startsWith('+++')) stats.additions++;
      if (line.startsWith('-') && !line.startsWith('---')) stats.deletions++;
    });
  });

  return stats;
}

function checkChangeScope(changedFiles) {
  const components = Object.keys(CRITICAL_FILES);
  const changedComponents = changedFiles.split('\n')
    .filter(file => components.includes(file));

  if (changedComponents.length > 1) {
    debugLogger.logError({
      type: 'scope',
      message: 'Multiple critical components modified in one PR',
      components: changedComponents,
      affectedFiles: changedComponents
    });
    return false;
  }
  return true;
}

function checkCriticalCode(changedFiles) {
  let success = true;
  
  changedFiles.split('\n').forEach(file => {
    if (!file || !CRITICAL_FILES[file]) return;

    const content = fs.readFileSync(file, 'utf8');
    const missingElements = CRITICAL_FILES[file].filter(element => 
      !content.includes(element)
    );

    if (missingElements.length > 0) {
      debugLogger.logError({
        type: 'deletion',
        message: `Critical elements missing in ${file}`,
        component: file,
        missingElements,
        affectedFiles: [file]
      });
      success = false;
    }
  });

  return success;
}

function main() {
  const changedFiles = process.env.CHANGED_FILES || '';
  const stats = getDiffStats(changedFiles);
  
  if (stats.deletions > stats.additions * 2) {
    debugLogger.logError({
      type: 'large_deletion',
      message: 'Large number of deletions detected',
      stats,
      affectedFiles: changedFiles.split('\n')
    });
    process.exit(1);
  }

  const scopeValid = checkChangeScope(changedFiles);
  const codeValid = checkCriticalCode(changedFiles);

  if (!scopeValid || !codeValid) {
    process.exit(1);
  }

  console.log('✅ Code integrity checks passed');
}

main();