import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import filesize from 'rollup-plugin-filesize';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { visualizer } from 'rollup-plugin-visualizer';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export const isProductionBuild = () => process.env.NODE_ENV === 'production';

export const getBuildFormat = () => process.env.FORMAT;

export function getRollupTSConfig(dest, format, merge = {})
{
    const prod = isProductionBuild();

    return {
        input: merge.input || 'src/index.ts',
        output: {
            exports: 'named',
            file: dest,
            format,
            sourcemap: !prod,
            ...(merge.output || {}),
        },
        plugins: [
            sourcemaps(),
            json(),
            resolve({
                browser: true,
                preferBuiltins: false,
                mainFields: ['main', 'jsnext'],
            }),
            dts({
                tsconfig: 'tsconfig.types.json',
            }),
            esbuild({
                exclude: '**/node_modules/**',
                target: 'es2017',
                minify: prod,
            }),
            ...(merge.beforePlugins || []),
            commonjs(),
            replace({
                __DEV__: prod ? 'false' : 'true',
                'process.env.NODE_ENV': prod ? '"production"' : '"development"',
                preventAssignment: true,
            }),
            filesize(),
            visualizer(),
        ].filter(Boolean),
        external: merge.external,
    };
}
