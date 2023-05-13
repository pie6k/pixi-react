import Reconciler from 'react-reconciler';
import { diffProperties } from './diffProperties';
import { makeHostConfig } from './hostconfig';
import { applyDefaultProps, COMPONENTS } from '../utils';
import data from '../data.json';

/**
 * Instantiate host config and PixiReactFiber, this is side-effecty :(
 * TODO: Consider using a configuration function like the defunct react-modular version, if even only used internally so side
 * effects can be manually listed in package.json
 */
export const hostConfig = makeHostConfig({
    COMPONENTS,
    applyDefaultProps,
    diffProperties,
});

export const PixiReactFiber = Reconciler(hostConfig);

PixiReactFiber.injectIntoDevTools({
    bundleType: process.env.NODE_ENV !== 'production' ? 1 : 0,
    version: data.REACT_DOM_VERSION,
    rendererPackageName: data.PACKAGE_NAME,
});

