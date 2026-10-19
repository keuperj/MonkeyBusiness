import { defineConfig } from 'vite';
export default defineConfig({build:{rollupOptions:{input:{chapter:'index.html',tavern:'tavern-test.html',bridge:'bridge.html'}}}});
