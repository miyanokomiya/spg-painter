import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import rust from "@wasm-tool/rollup-plugin-rust";
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
    reactRefresh(),
    rust(),
  ],
  alias: {
    'spg-painter-core': corePath,
  },
})
