import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.spec.ts'],
    deps: {
      // Inline TanStack router plugin and related packages to avoid Vite plugin transforms
      inline: ['@tanstack/router-plugin', '@tanstack/router', '@tanstack/react-router'],
    },
    // Increase timeout slightly for CI/slow machines
    testTimeout: 10000,
  },
});
