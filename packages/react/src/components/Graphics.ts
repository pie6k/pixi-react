import { Graphics as PixiGraphics } from 'pixi.js';
import { applyDefaultProps, invariant } from '../utils';

import type { GraphicsProps, PixiReactContainer, PixiReactGraphics } from '../types';

const Graphics = (_root: PixiReactContainer, { geometry }: GraphicsProps) =>
{
    invariant(!geometry || geometry instanceof PixiGraphics, `Graphics geometry needs to be a \`PIXI.Graphics\``);
    const g: PixiReactGraphics = geometry ? new PixiGraphics(geometry.clone(true)) : new PixiGraphics();

    g.applyProps = (instance, oldProps, newProps) =>
    {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { draw, geometry, ...props } = newProps;
        let changed = applyDefaultProps(instance, oldProps, props);

        if (oldProps.draw !== draw && typeof draw === 'function')
        {
            changed = true;
            draw.call(g, g);
        }

        return changed;
    };

    return g;
};

export default Graphics;
