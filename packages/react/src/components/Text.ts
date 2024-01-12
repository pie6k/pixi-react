import { Text as PixiText } from 'pixi.js';

import type { PixiReactContainer, PixiReactSprite, PixiReactText, TextProps } from '../types';

const Text = (_root: PixiReactContainer, props: TextProps): PixiReactText | PixiReactSprite =>
{
    const { text = '', style = {} } = props;
    const pixiText = new PixiText({ text, style });

    return pixiText;
};

export default Text;
