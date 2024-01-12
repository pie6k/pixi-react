import { getRollupTSConfig, isProductionBuild } from '../../shared/getRollupConfig.mjs';

const buildType = isProductionBuild() ? '' : '-dev';

const external = [
    'pixi.js',
    '@pixi/react',
    '@react-spring/animated',
    'react',
    'react-dom',
    'react-spring'
];

const builds = ['cjs', 'es'].map(
    (format) => getRollupTSConfig(
        `dist/index.${format}${buildType}.js`,
        format,
        { external }
    )
);

export default builds;
