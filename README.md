# Company Analyzer

## Project Overview
A full-stack application built with FastAPI and React that provides comprehensive company data analysis capabilities using Claude AI. The project aims to create an interactive platform for analyzing company financial data, market trends, and generating insights through data visualization and advanced analytics.

## Milestones & Objectives
- [x] Set up basic project structure
- [x] Create environment configuration system
- [ ] Implement Claude AI Integration
  - [x] Set up API service
  - [x] Create React hooks
  - [ ] Build chat interface
  - [ ] Add company-specific analysis prompts
- [ ] Develop Frontend Features
  - [ ] Chat interface with Claude
  - [ ] Company data visualization
  - [ ] Financial metrics dashboard
  - [ ] Real-time analysis updates

## Currently Implemented Features
- Basic project structure with FastAPI backend and React frontend
- Database integration with PostgreSQL and SQLAlchemy
- Authentication system foundation
- Claude AI service integration
- Basic data processing capabilities

## Development Setup

### 1. Clone and Install
```bash
git clone https://github.com/Mross2858/company-analyzer.git
cd company-analyzer
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Copy environment file
cp .env.example .env
# Start development server
npm run dev
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
# Copy environment file
cp .env.example .env
```

## Error Solutions Log

### Error 1: Claude API Integration
**Error Description:** Integrating Claude API with proper authentication and error handling

**Solution:**
1. Use environment variables for API keys
2. Implement proper error boundaries
3. Add request/response logging

**Prompt for Implementation:**
```
When implementing Claude AI features:
1. Start with basic message functionality
2. Add company-specific context
3. Implement error handling
4. Add typing support
5. Test with various inputs
```

### Error 2: Frontend State Management
**Error Description:** Managing chat history and analysis state

**Solution:**
1. Use React hooks for local state
2. Implement proper message threading
3. Add loading states

**Prompt to Fix:**
```
For chat interface implementation:
1. Create ChatMessage component
2. Add message history management
3. Implement loading states
4. Add error boundaries
5. Test user interactions
```

## Frontend Implementation Guide

### 1. Start the Development Server
```bash
cd frontend
npm run dev
```

### 2. Access the Interface
Open `http://localhost:5173` in your browser

### 3. Test the Chat Interface
- Use the chat input to ask questions about company analysis
- Try different financial metrics queries
- Test error scenarios

### 4. Development Tips
- Check console for API errors
- Use React Developer Tools for debugging
- Monitor network requests in DevTools
- Test with various screen sizes