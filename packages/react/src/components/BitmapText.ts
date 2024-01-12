import { BitmapText as PixiBitmapText } from 'pixi.js';

import type { BitmapTextProps, PixiReactBitmapText, PixiReactContainer } from '../types';

const BitmapText = (_root: PixiReactContainer, props: BitmapTextProps): PixiReactBitmapText =>
{
    const { text, style } = props;

    return new PixiBitmapText({ text, style });
};

export default BitmapText;
