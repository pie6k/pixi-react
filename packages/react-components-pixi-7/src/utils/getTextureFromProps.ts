import { Texture } from '@pixi/core';
import { getTextureFromProps as genericGetTextureFromProps } from '@pixi/react-utils';
import { invariant } from '@pixi/react-invariant';
import type { PropsType } from '@pixi/react-types';
import type { PixiReactContainer } from '../types';

export const getTextureFromProps = (
    elementType: string,
    root: PixiReactContainer,
    props: PropsType = {}
) =>
{
    if (props.texture)
    {
        invariant(
            props.texture instanceof Texture,
            `${elementType} texture needs to be typeof \`Texture\``
        );
    }

    return genericGetTextureFromProps(Texture, elementType, root, props);
};
