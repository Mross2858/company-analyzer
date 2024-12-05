const fs = require('fs');
const path = require('path');
const debugLogger = require('./llm-debug-logger');

// Test case 1: Simulate component deletion
function testDeletionDetection() {
  console.log('\nTest Case 1: Component Deletion');
  const error = {
    type: 'deletion',
    message: 'Critical elements missing in CompanyTable',
    component: 'frontend/src/components/CompanyTable.tsx',
    missingElements: ['sortField', 'handleSort'],
    affectedFiles: ['frontend/src/components/CompanyTable.tsx']
  };

  const logFile = debugLogger.logError(error);
  console.log('✓ Created deletion log:', logFile);
  return logFile;
}

// Test case 2: Multiple component changes
function testScopeDetection() {
  console.log('\nTest Case 2: Multiple Component Changes');
  const error = {
    type: 'scope',
    message: 'Multiple critical components modified',
    components: [
      'frontend/src/components/CompanyTable.tsx',
      'frontend/src/components/FileUpload.tsx'
    ],
    affectedFiles: [
      'frontend/src/components/CompanyTable.tsx',
      'frontend/src/components/FileUpload.tsx'
    ]
  };

  const logFile = debugLogger.logError(error);
  console.log('✓ Created scope change log:', logFile);
  return logFile;
}

// Test case 3: Large deletion detection
function testLargeDeletion() {
  console.log('\nTest Case 3: Large Deletion');
  const error = {
    type: 'large_deletion',
    message: 'Large number of deletions detected',
    stats: {
      additions: 5,
      deletions: 50
    },
    affectedFiles: ['frontend/src/components/CompanyTable.tsx']
  };

  const logFile = debugLogger.logError(error);
  console.log('✓ Created large deletion log:', logFile);
  return logFile;
}

// Verify log file contents
function verifyLogFile(logFile) {
  console.log('\nVerifying log file:', logFile);
  try {
    const content = fs.readFileSync(logFile, 'utf8');
    const logs = JSON.parse(content);

    console.log('✓ Log file is valid JSON');
    console.log('✓ Contains', logs.length, 'entries');

    logs.forEach((log, index) => {
      console.log(`\nEntry ${index + 1}:`);
      console.log('✓ Has timestamp:', !!log.timestamp);
      console.log('✓ Has error type:', !!log.error.type);
      console.log('✓ Has fix prompt:', !!log.fixPrompt);
    });

    return true;
  } catch (error) {
    console.error('✗ Error verifying log file:', error);
    return false;
  }
}

// Run all tests
function runTests() {
  console.log('Starting LLM Debug Logger Tests...\n');

  const logFiles = new Set();
  logFiles.add(testDeletionDetection());
  logFiles.add(testScopeDetection());
  logFiles.add(testLargeDeletion());

  let allPassed = true;
  for (const logFile of logFiles) {
    if (!verifyLogFile(logFile)) {
      allPassed = false;
      break;
    }
  }

  console.log('\nTest Summary:');
  console.log(allPassed ? '✅ All tests passed!' : '❌ Some tests failed!');
}

runTests();