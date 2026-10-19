import { defineConfig } from 'vite';
export default defineConfig({build:{rollupOptions:{input:{tavern:'index.html',bridge:'bridge.html'}}}});
