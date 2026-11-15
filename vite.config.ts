import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({ base: '/identity-discontinuity-web/', plugins: [svelte()], build: { sourcemap: false } });
