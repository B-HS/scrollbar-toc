import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: true,
    clean: true,
    platform: 'neutral',
    shims: true,
    sourcemap: true,
})
