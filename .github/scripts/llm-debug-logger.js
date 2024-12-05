const fs = require('fs');
const path = require('path');

class LLMDebugLogger {
  constructor() {
    this.logDir = path.join(process.cwd(), '.github', 'debug-logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  generateFixPrompt(error) {
    let prompt = 'I need to fix the following issue in my codebase:\n\n';
    
    if (error.type === 'deletion') {
      prompt += `Critical code was deleted from ${error.component}. \n`;
      prompt += 'The following elements were removed:\n';
      prompt += error.missingElements.map(e => `- ${e}`).join('\n');
      prompt += '\n\nPlease restore these elements while preserving any new changes.';
    }
    
    if (error.type === 'scope') {
      prompt += `Changes affected multiple components: ${error.components.join(', ')}\n`;
      prompt += 'Please help me separate these changes into focused updates.';
    }

    return prompt;
  }

  createDebugEntry(error) {
    return {
      timestamp: new Date().toISOString(),
      error: {
        type: error.type,
        message: error.message,
        component: error.component,
        missingElements: error.missingElements,
        affectedFiles: error.affectedFiles
      },
      changes: {
        additions: error.stats?.additions || 0,
        deletions: error.stats?.deletions || 0
      },
      fixPrompt: this.generateFixPrompt(error),
      status: 'open'
    };
  }

  logError(error) {
    const date = new Date();
    const logFile = path.join(
      this.logDir,
      `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}.json`
    );

    let logs = [];
    if (fs.existsSync(logFile)) {
      logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
    }

    const debugEntry = this.createDebugEntry(error);
    logs.push(debugEntry);

    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    
    console.error('Debug log created:');
    console.error(`File: ${logFile}`);
    console.error('Fix Prompt:');
    console.error(debugEntry.fixPrompt);

    return logFile;
  }
}

module.exports = new LLMDebugLogger();