import { MeshSimple as PixiMeshSimple } from 'pixi.js';
import { applyDefaultProps, getTextureFromProps } from '../utils';

import type { MeshSimpleProps, PixiReactContainer, PixiReactMeshSimple } from '../types';

const MeshSimple = (root: PixiReactContainer, props: MeshSimpleProps) =>
{
    const texture = getTextureFromProps('Mesh', root, props);
    const { vertices, uvs, indices, topology = 'triangle-list' } = props;

    const meshSimple: PixiReactMeshSimple = new PixiMeshSimple({ texture, vertices, uvs, indices, topology });

    meshSimple.applyProps = (instance, oldProps, newProps) =>
    {
        const { image, texture, ...props } = newProps;
        let changed = applyDefaultProps(instance, oldProps, props);

        if (image || texture)
        {
            // change = true not required for image, getTextureFromProps will call update
            if (texture !== oldProps.texture)
            {
                changed = true;
            }
            instance.texture = getTextureFromProps('Mesh', root, newProps);
        }

        return changed;
    };

    return meshSimple;
};

export default MeshSimple;
