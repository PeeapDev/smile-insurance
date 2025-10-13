@echo off
REM Docker Offline Deployment for Windows Server
REM Run this on Windows Server 2019

echo ========================================
echo   Smile Insurance - Docker Deployment
echo ========================================

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Docker is not installed!
    echo Please install Docker Desktop for Windows
    pause
    exit /b 1
)

echo Docker found:
docker --version

REM Load Docker images
echo Loading Docker images...
docker load -i docker-images\smile-web.tar
docker load -i docker-images\postgres.tar
docker load -i docker-images\redis.tar
docker load -i docker-images\nginx.tar

REM Start services
echo Starting services...
docker compose up -d

REM Check status
echo Checking service status...
docker compose ps

echo.
echo ========================================
echo    Deployment Complete!
echo ========================================
echo.
echo Services running:
echo   - Web Application: http://localhost:3000
echo   - Database: PostgreSQL (internal)
echo   - Cache: Redis (internal)
echo   - Proxy: Nginx (port 80)
echo.
echo To stop services: docker compose down
echo To view logs: docker compose logs
echo.
pause
