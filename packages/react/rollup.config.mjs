import copy from 'rollup-plugin-copy';
import {
    getBuildFormat,
    getRollupTSConfig,
    isProductionBuild,
} from '../../shared/getRollupConfig.mjs';
import alias from '@rollup/plugin-alias';

const format = getBuildFormat();
const buildType = isProductionBuild() ? '' : '-dev';

const external = [
    'pixi.js',
    '@pixi/react-invariant',
    'lodash.isnil',
    'lodash.times',
    'prop-types',
    'react',
    'react-dom',
    'react-reconciler',
];

let builds;

const mergeOptions = {
    beforePlugins: [
        alias({
            entries: {
                '@react-spring/animated':
                    '../../shared/react-spring-create-host.js',
            },
        }),
        copy({
            targets: [{ src: 'src/global.d.ts', dest: 'dist/types' }],
        }),
    ],
    external,
};

if (format)
{
    builds = [
        getRollupTSConfig(
            `dist/index.${format}${buildType}.js`,
            format,
            mergeOptions
        ),
    ];
}
else
{
    builds = ['cjs', 'es'].map((format) =>
        getRollupTSConfig(
            `dist/index.${format}${buildType}.js`,
            format,
            mergeOptions
        )
    );
}

export default builds;
