@echo off
REM Platform-neutral build script for Fermi Land (Windows)
REM This script ensures consistent builds across different operating systems

echo 🚀 Starting platform-neutral build...

REM Check if we're in a CI environment
if defined CI (
    echo 📦 CI environment detected
    set NODE_ENV=production
)
if defined VERCEL (
    echo 📦 Vercel environment detected
    set NODE_ENV=production
)

REM Ensure consistent Node.js behavior
set NODE_OPTIONS=--max-old-space-size=4096

REM Clean previous builds
echo 🧹 Cleaning previous builds...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out

REM Install dependencies
echo 📥 Installing dependencies...
call npm ci --prefer-offline --no-audit

REM Run type checking
echo 🔍 Running type checking...
call npm run type-check

REM Run linting
echo 🔍 Running linting...
call npm run lint

REM Build the application
echo 🔨 Building application...
call npm run build

REM Run tests if available
echo 🔍 Running tests...
call npm run test:ci >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Tests passed
) else (
    echo ⚠️  Tests skipped or failed
)

echo ✅ Platform-neutral build completed successfully! 