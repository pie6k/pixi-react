import { MeshRope as PixiMeshRope } from 'pixi.js';
import { applyDefaultProps, getTextureFromProps, invariant } from '../utils';

import type { MeshRopeProps, PixiReactContainer, PixiReactMeshRope } from '../types';

const MeshRope = (root: PixiReactContainer, props: MeshRopeProps) =>
{
    const texture = getTextureFromProps('MeshRope', root, props);
    const { points } = props;

    const rope: PixiReactMeshRope = new PixiMeshRope({ texture, points });

    rope.applyProps = (instance, oldProps, newProps) =>
    {
        const { image, texture, ...props } = newProps;

        invariant(Array.isArray(newProps.points), 'MeshRope points needs to be %s', 'Array<PIXI.Point>');
        let changed = applyDefaultProps(instance, oldProps, props);

        if (image || texture)
        {
            if (texture !== oldProps.texture)
            {
                changed = true;
            }
            instance.texture = getTextureFromProps('MeshRope', root, newProps);
        }

        return changed;
    };

    return rope;
};

export default MeshRope;
