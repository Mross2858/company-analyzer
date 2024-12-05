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
- Frontend configuration:
  - Added Vite + React + TypeScript setup
  - Configured Tailwind CSS with proper theme setup
  - Integrated shadcn/ui components
  - Set up development tools (ESLint, PostCSS)
- Claude AI Integration:
  - Backend API endpoint for Claude interaction
  - Frontend chat interface
  - Real-time communication setup

## To Do
- [x] Add Claude AI integration
  - [x] Create backend endpoint
  - [x] Build frontend chat interface
  - [ ] Add file upload capabilities
  - [ ] Implement context-aware responses
- [ ] Build front end with dashboard
  - [x] Create basic dashboard layout
  - [x] Set up frontend development environment
  - [ ] Add real data integration
  - [ ] Implement interactive features
  - [ ] Add user settings and preferences
- [ ] Ensure that the readme is properly changing after every pull request

## Setup Instructions

### Environment Variables
Create a `.env` file in the backend directory with:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/company_analyzer
SECRET_KEY=your_secret_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Backend Setup
1. Create virtual environment:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the server:
```bash
uvicorn app.main:app --reload
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Errors and Solutions Log

### Error 1: Initial README Creation
**Error Description:** Initial attempts to create README using individual file creation failed due to encoding issues.

**Solution:**
Used the `push_files` function instead of individual file creation, which handles the encoding properly.

### Error 2: Pull Request Creation
**Error Description:** Attempt to create pull request resulted in 'Unprocessable Entity' error.

**Solution:**
Work directly in feature branches and merge manually when needed.

### Error 3: Frontend Setup Requirements
**Error Description:** Need to ensure proper setup for shadcn/ui components and Tailwind CSS.

**Solution:**
- Added proper configuration files
- Set up component architecture
- Configured build tools correctly

### Error 4: Claude Integration
**Error Description:** Need to handle API communication securely.

**Solution:**
- Created backend proxy for Claude API
- Implemented proper error handling
- Added loading states for better UX

## API Documentation

### POST /chat
Endpoint for interacting with Claude AI.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "string"
    }
  ],
  "system": "string" // Optional system message
}
```

**Response:**
```json
{
  "response": "string",
  "error": "string" // Optional error message
}
```