@echo off
title Cek-Gula Local Runner
echo ========================================================
echo        MEMULAI SISTEM CEK-GULA (100%% LOKAL)
echo ========================================================
echo.

echo [1/3] Menyalakan AI Service (FastAPI Uvicorn port 7860)...
start "Cek-Gula AI Service" cmd /k "cd /d "%~dp0ai-service" && python -m uvicorn app:app --port 7860"

echo [2/3] Menyalakan Backend API (Express.js port 3000)...
start "Cek-Gula Backend" cmd /k "cd /d "%~dp0cek-gula-backend" && npm run dev"

echo [3/3] Menyalakan Frontend Web (Vite port 5173)...
start "Cek-Gula Frontend" cmd /k "cd /d "%~dp0cek-gula-frontend" && npm run dev"

echo.
echo ========================================================
echo Ketiga layanan telah diluncurkan di terminal terpisah:
echo   1. AI Service : http://localhost:7860
echo   2. Backend    : http://localhost:3000
echo   3. Frontend   : http://localhost:5173
echo.
echo Buka browser Anda di: http://localhost:5173
echo ========================================================
