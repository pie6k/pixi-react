/// <reference path="./global.d.ts" />
import {
    AnimatedSprite as AnimatedSpriteComponent,
    BitmapText as BitmapTextComponent,
    Container as ContainerComponent,
    Graphics as GraphicsComponent,
    MeshRope as MeshRopeComponent,
    MeshSimple as MeshSimpleComponent,
    NineSliceSprite as NineSliceSpriteComponent,
    ParticleContainer as ParticleContainerComponent,
    Sprite as SpriteComponent, Text as TextComponent, TilingSprite as TilingSpriteComponent
} from './components';
import { PixiReactFiber } from './reconciler';
import { applyDefaultProps, eventHandlers, PixiComponent } from './utils';

import type {
    ComponentsType,
    ReactAnimatedSpriteComponent,
    ReactBitmapTextComponent,
    ReactContainerComponent,
    ReactGraphicsComponent,
    ReactMeshRopeComponent,
    ReactMeshSimpleComponent,
    ReactNineSliceSpriteComponent,
    ReactSpriteComponent,
    ReactTextComponent,
    ReactTilingSpriteComponent,
} from './types';

/**
 * Available tag types
 *
 * @type {Object}
 */
export const TYPES = {
    BitmapText: 'BitmapText',
    Container: 'Container',
    Graphics: 'Graphics',
    NineSliceSprite: 'NineSliceSprite',
    ParticleContainer: 'ParticleContainer',
    Sprite: 'Sprite',
    AnimatedSprite: 'AnimatedSprite',
    Text: 'Text',
    TilingSprite: 'TilingSprite',
    MeshSimple: 'MeshSimple',
    MeshRope: 'MeshRope',
};

export const BitmapText
    = TYPES.BitmapText as unknown as ReactBitmapTextComponent;
export const Container = TYPES.Container as unknown as ReactContainerComponent;
export const Graphics = TYPES.Graphics as unknown as ReactGraphicsComponent;
export const NineSliceSprite
    = TYPES.NineSliceSprite as unknown as ReactNineSliceSpriteComponent;
export const ParticleContainer
    = TYPES.ParticleContainer as unknown as ReactParticleContainerComponent;
export const Sprite = TYPES.Sprite as unknown as ReactSpriteComponent;
export const AnimatedSprite
    = TYPES.AnimatedSprite as unknown as ReactAnimatedSpriteComponent;
export const Text = TYPES.Text as unknown as ReactTextComponent;
export const TilingSprite
    = TYPES.TilingSprite as unknown as ReactTilingSpriteComponent;
export const MeshSimple
    = TYPES.MeshSimple as unknown as ReactMeshSimpleComponent;
export const MeshRope
    = TYPES.MeshRope as unknown as ReactMeshRopeComponent;

const components: ComponentsType = {
    AnimatedSprite: AnimatedSpriteComponent,
    BitmapText: BitmapTextComponent,
    Container: ContainerComponent,
    Graphics: GraphicsComponent,
    NineSliceSprite: NineSliceSpriteComponent,
    ParticleContainer: ParticleContainerComponent,
    MeshSimple: MeshSimpleComponent,
    MeshRope: MeshRopeComponent,
    Sprite: SpriteComponent,
    Text: TextComponent,
    TilingSprite: TilingSpriteComponent,
};

/**
 * Register components, this is side-effecty :(
 * TODO: Consider using a configuration function like the defunct react-modular version, if even only used internally so side
 * effects can be manually listed in package.json
 */
Object.keys(TYPES).forEach((type) => PixiComponent(type, components[type]));

export { withFilters } from './hoc';
export { useApp, useTick } from './hooks';
export { createRoot, render, roots, unmountComponentAtNode } from './render';
export { Stage } from './stage';
export {
    AppConsumer,
    Context as AppContext,
    AppProvider,
    withPixiApp,
} from './stage/provider';
export { applyDefaultProps, eventHandlers, PixiComponent, PixiReactFiber };
