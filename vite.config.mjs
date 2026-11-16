import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: './',
    // Tailwind for this Vite app is applied by @tailwindcss/vite.
    // An empty PostCSS config stops Vite from also loading the root
    // postcss.config.mjs, which exists so the Next.js app can compile Tailwind.
    css: {
        postcss: {
            plugins: [],
        },
    },
    plugins: [
        tailwindcss(),
    ],
    server: {
        proxy: {
            '/api': {
                target: 'https://api.kie.ai',
                changeOrigin: true,
                secure: false
            },
            '/.netlify/functions': {
                target: 'https://higgsfield-matu.netlify.app',
                changeOrigin: true,
                secure: true
            },
            '/download-media': {
                target: 'https://higgsfield-matu.netlify.app',
                changeOrigin: true,
                secure: true
            }
        }
    }
});
