# Company Analyzer

## Project Overview
A full-stack application built with FastAPI and React that provides comprehensive company data analysis capabilities. The project aims to create an interactive platform for analyzing company financial data, market trends, and generating insights through data visualization and advanced analytics.

## Milestones Accomplished
*(This section will be updated with each successful pull request)*

Currently implemented features:
- Basic project structure setup with FastAPI backend and React frontend
- Database integration with PostgreSQL and SQLAlchemy
- Authentication system foundation
- Basic data processing capabilities with pandas

## To Do
- [ ] Build front end with dashboard
- [ ] Ensure that the readme is properly changing after every pull request

## Errors and Solutions Log
*(This section will be populated with encountered errors and their solutions)*

### Error 1: Initial README Creation
**Error Description:** Initial attempts to create README using individual file creation failed due to encoding issues.

**Solution:**
Used the `push_files` function instead of individual file creation, which handles the encoding properly.

**Prompt for Similar Issues:**
```
When encountering GitHub API file creation issues:
1. Use push_files instead of create_or_update_file for more reliable file operations
2. Ensure content is properly formatted in UTF-8
3. Use the branch-PR workflow for changes
```

### Error 2: Pull Request Creation
**Error Description:** Attempt to create pull request resulted in 'Unprocessable Entity' error.

**Possible Issues:**
1. PR might already exist
2. Branch might have no changes
3. Base and head branch might be the same
4. Missing required parameters

**Prompt to Fix:**
```
Can you:
1. Check if a PR already exists for this branch
2. Verify the branch has commits that differ from main
3. Ensure base and head branches are different
4. Try creating the PR with minimal required parameters first
5. If still failing, try using the GitHub web interface to create the PR and analyze the difference
```

### Development Setup
1. Clone the repository:
```bash
git clone https://github.com/Mross2858/company-analyzer.git
cd company-analyzer
```

2. Backend Setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

3. Frontend Setup:
```bash
cd frontend
npm install
```

4. Environment Setup:
Create a `.env` file in the backend directory with:
```
DATABASE_URL=postgresql://user:password@localhost:5432/company_analyzer
SECRET_KEY=your_secret_key
```