import React from 'react';
import { PixiComponent } from '@pixi/react';

import { stageDecorator } from './stageDecorator';
import { registerComponents } from '../src';

registerComponents(PixiComponent);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [stageDecorator];
