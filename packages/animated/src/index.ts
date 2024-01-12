import {
    TYPES
} from '@pixi/react';
import { animated } from './react-spring';

import type {
    AnimatedSprite as BaseAnimatedSprite,
    BitmapText as BaseBitmapText,
    Container as BaseContainer,
    Graphics as BaseGraphics,
    MeshRope as BaseMeshRope, MeshSimple as BaseMeshSimple,
    NineSliceSprite as BaseNineSlicePane,
    Sprite as BaseSprite,
    Text as BaseText,
    TilingSprite as BaseTilingSprite
} from '@pixi/react';

export const BitmapText = animated[TYPES.BitmapText] as typeof BaseBitmapText;
export const Container = animated[TYPES.Container] as typeof BaseContainer;
export const Graphics = animated[TYPES.Graphics] as typeof BaseGraphics;
export const NineSliceSprite = animated[TYPES.NineSliceSprite] as typeof BaseNineSlicePane;
export const Sprite = animated[TYPES.Sprite] as typeof BaseSprite;
export const AnimatedSprite = animated[TYPES.AnimatedSprite] as typeof BaseAnimatedSprite;
export const Text = animated[TYPES.Text] as typeof BaseText;
export const TilingSprite = animated[TYPES.TilingSprite] as typeof BaseTilingSprite;
export const MeshSimple = animated[TYPES.MeshSimple] as typeof BaseMeshSimple;
export const MeshRope = animated[TYPES.MeshRope] as typeof BaseMeshRope;
