import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://fluffy1720.github.io/formation-plan-frontend-prod/dual-branch/',
});
