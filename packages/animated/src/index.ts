import type {
    BitmapText as BaseBitmapText,
    Container as BaseContainer,
    Graphics as BaseGraphics,
    NineSlicePlane as BaseNineSlicePane,
    ParticleContainer as BaseParticleContainer,
    Sprite as BaseSprite,
    AnimatedSprite as BaseAnimatedSprite,
    Text as BaseText,
    TilingSprite as BaseTilingSprite,
    SimpleMesh as BaseSimpleMesh,
    SimpleRope as BaseSimpleRope } from '@pixi/react';
import {
    TYPES
} from '@pixi/react';

import { animated } from './react-spring';

export const BitmapText = animated[TYPES.BitmapText] as typeof BaseBitmapText;
export const Container = animated[TYPES.Container] as typeof BaseContainer;
export const Graphics = animated[TYPES.Graphics] as typeof BaseGraphics;
export const NineSlicePlane = animated[TYPES.NineSlicePlane] as typeof BaseNineSlicePane;
export const ParticleContainer = animated[TYPES.ParticleContainer] as typeof BaseParticleContainer;
export const Sprite = animated[TYPES.Sprite] as typeof BaseSprite;
export const AnimatedSprite = animated[TYPES.AnimatedSprite] as typeof BaseAnimatedSprite;
export const Text = animated[TYPES.Text] as typeof BaseText;
export const TilingSprite = animated[TYPES.TilingSprite] as typeof BaseTilingSprite;
export const SimpleMesh = animated[TYPES.SimpleMesh] as typeof BaseSimpleMesh;
export const SimpleRope = animated[TYPES.SimpleRope] as typeof BaseSimpleRope;
