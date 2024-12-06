# Company Analyzer

[Previous sections remain the same...]

## Local Development Setup

### Environment Configuration

1. **Frontend Setup (.env file)**
   ```bash
   cd frontend
   cp .env.example .env
   ```
   Then edit frontend/.env and add your environment variables

2. **Backend Setup (.env file)**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Then edit backend/.env and add your environment variables

### Security Precautions
- Never commit .env files to the repository
- Keep your API keys secure and rotate them if they're exposed
- Use different API keys for development and production
- Monitor API usage for unusual activity

### Required Environment Variables

#### Frontend (.env)
- `VITE_CLAUDE_API_URL`: Claude API endpoint
- `VITE_CLAUDE_API_KEY`: Your Claude API key
- `VITE_APP_URL`: Frontend application URL

#### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Application secret key
- `JWT_SECRET`: JWT token secret
- `CLAUDE_API_KEY`: Claude API key for backend services
- `ALLOWED_ORIGINS`: CORS allowed origins

[Previous error sections remain the same...]

### Error 6: Secure Environment Setup
**Error Description:** Need to ensure secure handling of environment variables and API keys

**Solution:**
1. Use .env.example files for documentation
2. Keep actual .env files local
3. Set up proper security measures

**Prompt to Fix:**
```
When setting up environment variables:
1. Create .env.example files with placeholder values
2. Document all required variables in README
3. Provide clear setup instructions
4. Never commit actual .env files
5. Use secure methods to share sensitive values
```