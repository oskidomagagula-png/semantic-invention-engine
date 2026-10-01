@echo off
REM Semantic Invention Engine - Local Development Setup (Windows)
REM Starts both frontend and backend servers

echo 🚀 Starting Semantic Invention Engine (Local Development)...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    exit /b 1
)

echo ✓ Node.js version:
node --version
echo ✓ npm version:
npm --version
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
) else (
    echo ✓ Dependencies already installed
)

REM Create .env if it doesn't exist
if not exist ".env" (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✓ .env file created (update if needed)
)

echo.
echo ════════════════════════════════════════════════════════════
echo 🎯 Starting servers...
echo ════════════════════════════════════════════════════════════
echo.
echo Backend API:  http://localhost:3001
echo Frontend UI:  http://localhost:5173
echo.
echo Press Ctrl+C to stop all servers
echo.

REM Start both servers concurrently
call npm run dev
