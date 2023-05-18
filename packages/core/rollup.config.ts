import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import packageJSON from './package.json' assert { type: 'json' }

const input = Object.fromEntries(
    glob
        .sync(['src/**/*.tsx', 'src/**/*.ts'], {
            ignore: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/**/*.stories.tsx'],
        })
        .map((file) => [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            path.relative('src', file.slice(0, file.length - path.extname(file).length)),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url)),
        ])
)

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const dependencies = [
    // ...Object.keys(packageJSON.peerDependencies ?? {}),
    ...Object.keys(packageJSON.dependencies ?? {}),
    ...Object.keys(packageJSON.devDependencies ?? {}),
]

function createPackageRegex(name) {
    return new RegExp(`^${name}(/.*)?`)
}

export default {
    // input: 'src/index.ts',
    // external: ['styled-components', 'react', 'react-dom'],
    // output: ['esm', 'umd'].map((format) => ({
    //     interop: 'auto',
    //     file: `dist/browser.${format}.js`,
    //     format,
    //     sourcemap: true,
    //     name: 'primer',
    //     globals: {
    //         react: 'React',
    //         'react-dom': 'ReactDOM',
    //         'styled-components': 'styled',
    //     },
    // })),

    input: 'src/index.ts',
    external: dependencies.map(createPackageRegex),
    output: {
        format: 'esm',
        exports: 'auto',
        dir: 'lib',
        interop: 'auto',
        preserveModules: true,
        preserveModulesRoot: 'src',
    },
    plugins: [
        // Note: it's important that the babel-plugin-preval is loaded first
        // to work as-intended
        babel({
            extensions,
            exclude: /node_modules/,
            babelHelpers: 'inline',
            babelrc: false,
            configFile: false,
            presets: [
                '@babel/preset-typescript',
                [
                    '@babel/preset-react',
                    {
                        modules: false,
                        runtime: 'automatic',
                    },
                ],
            ],
            plugins: [
                'macros',
                'preval',
                'add-react-displayname',
                'dev-expression',
                'babel-plugin-styled-components',
                // '@babel/plugin-proposal-nullish-coalescing-operator',
                // '@babel/plugin-proposal-optional-chaining',
                // [
                //     'babel-plugin-transform-replace-expressions',
                //     {
                //         replace: {
                //             __DEV__: "process.env.NODE_ENV !== 'production'",
                //         },
                //     },
                // ],
            ],
        }),
        commonjs({
            extensions,
        }),
        resolve({
            extensions,
        }),
    ],
}
