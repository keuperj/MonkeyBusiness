import { defineConfig } from '@playwright/test';
export default defineConfig({workers:1,testDir:'./tests',use:{baseURL:'http://127.0.0.1:5173',launchOptions:{executablePath:process.env.CHROMIUM_PATH||undefined}},webServer:{command:'npm run dev',url:'http://127.0.0.1:5173',reuseExistingServer:!process.env.CI},reporter:'list'});
