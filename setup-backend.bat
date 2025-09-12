@echo off
echo Setting up Job Portal Backend...

echo.
echo 1. Installing backend dependencies...
cd tale-backend
call npm install

echo.
echo 2. Starting MongoDB (make sure MongoDB is installed)
echo Please ensure MongoDB is running on mongodb://localhost:27017

echo.
echo 3. Creating admin user...
call npm run create-admin

echo.
echo 4. Adding sample data...
call npm run add-sample-data

echo.
echo 5. Starting backend server...
call npm run dev

pause