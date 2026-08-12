@echo off
echo ========================================
echo  FIXING NEXT.JS CONFIG
echo ========================================

cd "E:\local disk d\manish sir\Sunshine\app\web"

echo 1. Removing TypeScript files...
if exist tsconfig.json del tsconfig.json
if exist next-env.d.ts del next-env.d.ts

echo 2. Cleaning Next.js cache...
if exist .next rmdir /s /q .next

echo 3. Starting dev server...
npm run dev

pause