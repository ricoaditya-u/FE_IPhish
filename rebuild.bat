@echo off
echo 🔄 Rebuilding Gophish Frontend...
echo.

REM Check if --no-cache flag is set
set NO_CACHE=
if "%1"=="--no-cache" (
    set NO_CACHE=--no-cache
    echo ⚠️  Building without cache...
)

echo 🛑 Stopping existing containers...
docker-compose down

echo 🔨 Building Docker image...
docker-compose build %NO_CACHE%

echo 🚀 Starting container...
docker-compose up -d

echo ✅ Rebuild complete!
echo.
echo 📊 Container status:
docker-compose ps

echo.
echo 🌐 Access your app at: http://localhost:3000

pause


