@echo off
REM Smile Insurance - Windows Server Deployment Script
REM Run this on Windows Server 2019 (offline)

echo ========================================
echo    Smile Insurance - Server Setup
echo ========================================

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo Download the Windows installer and copy it to this server
    pause
    exit /b 1
)

echo Node.js found: 
node --version

REM Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not available!
    pause
    exit /b 1
)

echo npm found:
npm --version

REM Check if dependencies are already installed
if exist "node_modules" (
    echo Dependencies already installed, skipping npm install
) else (
    echo ERROR: node_modules not found!
    echo This package should include pre-installed dependencies
    echo Please use the offline deployment package
    pause
    exit /b 1
)

REM Build the application
echo Building application...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

REM Create Windows service script
echo Creating Windows service script...
echo @echo off > start-smile-insurance.bat
echo echo Starting Smile Insurance Server... >> start-smile-insurance.bat
echo cd /d "%~dp0" >> start-smile-insurance.bat
echo npm start >> start-smile-insurance.bat
echo pause >> start-smile-insurance.bat

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo To start the server:
echo   1. Double-click 'start-smile-insurance.bat'
echo   2. Or run: npm start
echo.
echo Server will be available at:
echo   http://localhost:3000
echo   http://[server-ip]:3000
echo.
echo Press any key to start the server now...
pause

REM Start the server
echo Starting Smile Insurance Server...
npm start
