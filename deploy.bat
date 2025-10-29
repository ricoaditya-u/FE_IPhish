@echo off
echo 🚀 Starting deployment...

echo.
echo 📋 Choose environment:
echo 1) Development
echo 2) Production
set /p choice="Enter choice [1]: "
if "%choice%"=="" set choice=1

if "%choice%"=="2" (
    echo 🏭 Production deployment
    set COMPOSE_FILE=docker-compose.prod.yml
) else (
    echo 🔧 Development deployment
    set COMPOSE_FILE=docker-compose.yml
)

echo.
echo What do you want to do?
echo 1) Build and start
echo 2) Rebuild and restart
echo 3) Stop
echo 4) View logs
set /p action="Enter choice [1]: "
if "%action%"=="" set action=1

if "%action%"=="1" (
    echo 🔨 Building and starting containers...
    docker-compose -f %COMPOSE_FILE% up -d --build
    echo ✅ Deployment complete!
    echo 🌐 Access your app at: http://localhost:3000
)

if "%action%"=="2" (
    echo 🔄 Rebuilding and restarting...
    docker-compose -f %COMPOSE_FILE% down
    docker-compose -f %COMPOSE_FILE% up -d --build
    echo ✅ Redeployment complete!
)

if "%action%"=="3" (
    echo 🛑 Stopping containers...
    docker-compose -f %COMPOSE_FILE% down
    echo ✅ Containers stopped!
)

if "%action%"=="4" (
    echo 📋 Viewing logs...
    docker-compose -f %COMPOSE_FILE% logs -f
)

echo.
echo 📊 Container status:
docker-compose -f %COMPOSE_FILE% ps

pause


