import { defineConfig } from 'vite'
import preprocess from 'svelte-preprocess'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import rust from '@wasm-tool/rollup-plugin-rust'
import path from 'path'

const corePath = path.join(__dirname, 'packages/spg-painter-core/Cargo.toml')

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'spg-painter-core': corePath,
      },
    },
  },
  plugins: [
    svelte({
      emitCss: false,
      preprocess: preprocess(),
    }),
    rust(),
  ],
  resolve: {
    alias: {
      'spg-painter-core': corePath,
    },
  },
})
