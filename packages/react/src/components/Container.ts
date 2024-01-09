import { Container as PixiContainer } from 'pixi.js';

import type { PixiReactContainer } from '../types';

const Container = (): PixiReactContainer => new PixiContainer();

export default Container;
