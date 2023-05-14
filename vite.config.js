'use strict';
import { resolve as pathResolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// eslint-disable-next-line no-undef
const resolve = (dir) => pathResolve(__dirname, dir);

export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src'),
      '~': resolve('./src/assets'),
      '#': resolve('./src/components'),
      '%': resolve('./src/views'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  envPrefix: 'VUE_APP_',
});
