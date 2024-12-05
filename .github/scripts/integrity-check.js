const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

// Get the diff stats
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

// Check if changes are focused
function checkChangeScope(changedFiles) {
  const components = Object.keys(CRITICAL_FILES);
  const changedComponents = changedFiles.split('\n')
    .filter(file => components.includes(file));

  if (changedComponents.length > 1) {
    console.error('⚠️ Warning: Multiple critical components modified in one PR');
    console.error('Modified components:', changedComponents.join(', '));
    console.error('Consider splitting changes into separate PRs for better review');
  }
}

// Verify critical code presence
function checkCriticalCode(changedFiles) {
  changedFiles.split('\n').forEach(file => {
    if (!file || !CRITICAL_FILES[file]) return;

    const content = fs.readFileSync(file, 'utf8');
    const missingElements = CRITICAL_FILES[file].filter(element => 
      !content.includes(element)
    );

    if (missingElements.length > 0) {
      console.error(`❌ Error: Critical elements missing in ${file}:`);
      console.error(missingElements.join(', '));
      process.exit(1);
    }
  });
}

function main() {
  const changedFiles = process.env.CHANGED_FILES || '';
  
  // Get diff statistics
  const stats = getDiffStats(changedFiles);
  
  // Alert on large deletions
  if (stats.deletions > stats.additions * 2) {
    console.error('❌ Error: Large number of deletions detected');
    console.error(`Additions: ${stats.additions}, Deletions: ${stats.deletions}`);
    console.error('Please review changes carefully');
    process.exit(1);
  }

  // Check change scope
  checkChangeScope(changedFiles);

  // Verify critical code
  checkCriticalCode(changedFiles);

  console.log('✅ Code integrity checks passed');
  console.log(`Stats - Additions: ${stats.additions}, Deletions: ${stats.deletions}`);
}

main();