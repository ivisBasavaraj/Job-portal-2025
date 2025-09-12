@echo off
echo Starting Job Portal Application...

echo.
echo Starting Backend Server...
start cmd /k "cd tale-backend && npm run dev"

timeout /t 3

echo.
echo Starting Frontend Server...
start cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause