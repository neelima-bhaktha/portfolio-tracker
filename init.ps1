$ErrorActionPreference = "Stop"

Write-Host "Initializing Backend..."
New-Item -ItemType Directory -Force -Path backend | Out-Null
Push-Location backend
npm init -y
npm install express dotenv cors helmet jsonwebtoken bcrypt pg reflect-metadata typeorm axios ioredis finnhub
npm install -D typescript @types/express @types/node @types/cors @types/jsonwebtoken @types/bcrypt ts-node-dev tsconfig-paths
npx tsc --init
Pop-Location

Write-Host "Initializing Frontend..."
# Vite CLI non-interactive mode
npm create vite@latest frontend -- --template react-ts
Push-Location frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom axios lucide-react recharts @tanstack/react-query date-fns clsx tailwind-merge
Pop-Location

Write-Host "Initialization Complete."
