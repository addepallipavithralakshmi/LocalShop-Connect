@echo off
title LocalShop Connect

echo.
echo  ==========================================
echo   LocalShop Connect - Dev Launcher
echo  ==========================================
echo.
echo  [1] Start both servers (normal)
echo  [2] Start both servers + re-seed database
echo  [3] Re-seed database only
echo  [4] Run schema only (fresh DB setup)
echo  [5] Exit
echo.
set /p choice="  Choose an option (1-5): "

if "%choice%"=="1" goto START
if "%choice%"=="2" goto SEED_AND_START
if "%choice%"=="3" goto SEED_ONLY
if "%choice%"=="4" goto SCHEMA_ONLY
if "%choice%"=="5" exit
echo  Invalid option. Defaulting to option 1.
goto START


:SEED_AND_START
echo.
echo  Running database seed first...
cd /d %~dp0backend
call npm run seed
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  Seed failed! Check error above. Press any key to exit.
    pause > nul
    exit
)
cd /d %~dp0
goto START


:SEED_ONLY
echo.
echo  Running database seed...
cd /d %~dp0backend
call npm run seed
echo.
echo  Done! Press any key to exit.
pause > nul
exit


:SCHEMA_ONLY
echo.
echo  Applying schema to database...
cd /d %~dp0backend
call npm run schema
echo.
echo  Done! Press any key to exit.
pause > nul
exit


:START
echo.
echo  Starting Backend (Node + Express)...
start "LocalShop - Backend" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 2 /nobreak > nul

echo  Starting Frontend (Vite + React)...
start "LocalShop - Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo  ==========================================
echo   Both servers are starting!
echo.
echo   Backend  : http://localhost:5000
echo   Frontend : http://localhost:5173
echo  ==========================================
echo.
echo  Close this window anytime.
echo.
pause
