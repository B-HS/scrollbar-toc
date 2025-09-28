import { getPackageInfo } from '../config'

export const buildDevBundle = async () => {
    const { libraryName } = getPackageInfo()

    const result = await Bun.build({
        entrypoints: ['./src/client.tsx'],
        target: 'browser',
        format: 'esm',
        minify: false,
        sourcemap: 'inline',
        external: libraryName ? [libraryName] : [],
    })

    if (!result.success) {
        console.error('❌ Build failed:', result.logs)
        throw new Error('Dev bundle failed')
    }

    return await result.outputs[0]?.text()
}
