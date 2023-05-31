import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import { RollupOptions } from 'rollup'
import packageJSON from './package.json' assert { type: 'json' }

const extensions = ['.js', '.jsx', '.ts', '.tsx']
const dependencies = [
    ...Object.keys(packageJSON.peerDependencies ?? {}),
    ...Object.keys(packageJSON.dependencies ?? {}),
    ...Object.keys(packageJSON.devDependencies ?? {}),
]

function createPackageRegex(name: string) {
    return new RegExp(`^${name}(/.*)?`)
}

const options: RollupOptions = {
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
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
            ],
        }),
        // commonjs({
        //     extensions,
        // }),
        resolve({
            extensions,
        }),
    ],
}

export default options
