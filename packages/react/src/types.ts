import type React from 'react';
import type {
    ForwardRefExoticComponent,
    PropsWithoutRef,
    RefAttributes,
} from 'react';
import type { HostConfig, Reconciler } from 'react-reconciler';
import type { Container } from '@pixi/display';
import type { IPoint, Resource, Texture } from '@pixi/core';
import type { AnimatedSprite, FrameObject } from '@pixi/sprite-animated';
import type { Graphics } from '@pixi/graphics';
import type { BitmapText, IBitmapTextStyle } from '@pixi/text-bitmap';
import type { NineSlicePlane, SimpleMesh, SimpleRope } from '@pixi/mesh-extras';
import type { ParticleContainer } from '@pixi/particle-container';
import type { Sprite } from '@pixi/sprite';
import type { TilingSprite } from '@pixi/sprite-tiling';
import type { Text, TextStyle } from '@pixi/text';
import type { Application, IApplicationOptions } from '@pixi/app';
import type { DRAW_MODES } from '@pixi/constants';

// TODO: this is a circular dependency, but writing a working interface for BaseStage is a nightmare
import type { BaseStage } from './stage';

/**
 * START GENERIC TYPES - These types have no tight coupling to Pixi and depend on having concrete Pixi types injected via
 * Generics. They were originally written for a modular version of pixi-react, which has since been discontinued since it
 * was deemed overly complex for minimal use case. Keeping these flexible types around could prove useful in the future.
 */

export type PropsType = { [key: string]: any };

/**
 * Minimal stuff maybe isn't required since we aren't modular anymore?
 */

interface MinimalDisplayObject
{
    emit: (type: any, data?: any) => void;
    visible: boolean;
    destroy: (opts: {
        children?: boolean;
        texture?: boolean;
        baseTexture?: boolean;
    }) => void;
}

// Defines a minimal expected type for a PIXI Container to allow for different implementations across PIXI versions
export interface MinimalContainer extends MinimalDisplayObject
{
    children: any[];
    addChild: (...children: any[]) => any;
    removeChild: (child: any) => void;
    getChildIndex: (child: any) => number;
    setChildIndex: (child: any, index: number) => void;
    addChildAt: (child: any, index: number) => void;
    on: (evt: any, handler: any) => void;
    removeListener: (evt: any, handler: any) => void;
}

export interface MinimalPointData
{
    x: number;
    y: number;
}

export interface MinimalPoint extends MinimalPointData
{
    copyFrom(p: MinimalPoint): this;
    copyTo<T extends MinimalPoint>(p: T): T;
    equals<T extends MinimalPointData>(p: T): boolean;
    set(x?: number, y?: number): void;
}

export type LocalState<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = {
    root: Container | null;
    parent: Container | null;
    previousAttach: any;
    attach?: AttachType<Container, Instance>;
    attachedObjects: Container[];
};

export interface PixiReactMinimalExpandoContainer extends MinimalContainer
{
    config?: lifeCycleConfigType;
    applyProps?: applyPropsType<PropsType, any>;
    didMount?: didMountType<any, any>;
    willUnmount?: willUnmountType<any, any>;
    __reactpixi?: LocalState<any, any>;
}

// TODO: defining twice like this seems to be the only way to get around an
// issue with circular references and the fact this version uses generics
export type PixiReactExpandoContainer<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = {
    config?: lifeCycleConfigType;
    applyProps?: applyPropsType<PropsType, Instance>;
    didMount?: didMountType<Container, Instance>;
    willUnmount?: willUnmountType<Container, Instance>;
    __reactpixi?: LocalState<Container, Instance>;
};

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
    T
>() => T extends Y ? 1 : 2
    ? A
    : B;

type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
    >;
}[keyof T];

type AnySource<PixiTexture> =
    | number
    | ImageSource
    | VideoSource
    | HTMLCanvasElement
    | PixiTexture;

export type PointCoords = [number, number] | [number];
export type GenericPointLike<PixiIPoint extends MinimalPoint = MinimalPoint> =
    | PixiIPoint
    | PointCoords
    | number
    | { x?: number; y?: number }
    | string;

type WithPointLike<PixiIPoint extends MinimalPoint, T extends keyof any> = {
    [P in T]: GenericPointLike<PixiIPoint>;
};

export type AttachFnType<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = (
    parent: Container,
    self: Instance
) => (parent: Container, self: Instance) => void;
export type AttachType<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = string | AttachFnType<Container, Instance>;

type WithAttach<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = {
    attach?: AttachType<Container, Instance>;
};

export interface GenericWithSource<PixiTexture>
{
    /**
     * Directly apply an image
     *
     * @example
     *
     * image="./image.png"
     */
    image?: ImageSource;

    /**
     * Directly apply a video
     *
     * @example
     *
     * video="./video.mp4"
     */
    video?: VideoSource;

    /**
     * Directly apply an already created PixiJS Texture
     */
    texture?: PixiTexture;

    /**
     * Directly apply a source.
     * Can be an image, video, canvas, frame id or even a texture
     *
     * @example
     *
     * source="./image.jpg"
     * source="./video.mp4"
     * source={document.querySelector('img')}
     * source={document.querySelector('video')}
     * source={document.querySelector('canvas')}
     */
    source?: AnySource<PixiTexture>;
}

export type InstanceProps<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = PropsType & WithAttach<Container, Instance>;

// This helper is used to create types for the prop argument to React.FC
export type GenericReactContainerProps<
    PixiIPoint extends MinimalPoint,
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer,
    Props = object
> = Partial<
Omit<
Instance,
'children' | PointLikeProps | ReadonlyKeys<Instance> | keyof Props
> &
WithPointLike<PixiIPoint, PointLikeProps>
> &
WithAttach<Container, Instance> &
Props &
InteractionEvents & { ref?: React.Ref<Instance> };

// This helper is used to create types for the return argument of component lifecycle create
export type BasePixiReactContainer<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = Instance & PixiReactExpandoContainer<Container, Instance>;

export type UpdatePayload = Array<any> | null;

export type NoTimeout = -1;

export type TimeoutHandle = ReturnType<typeof setTimeout>;

// Defines a minimal expected type for PixiReactFiber to allow for different implementations across React versions
export type genericCreateInstanceType<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = (
    type: string,
    props: PropsType,
    rootContainer: Container,
    hostContext: any,
    internalHandle: any
) => Instance;

/**
 * Reconciler Types
 */
export type GenericPixiReactHostConfig<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = HostConfig<
string,
PropsType,
Container,
Instance,
any,
Instance,
Instance,
Instance,
any,
UpdatePayload,
any,
TimeoutHandle,
NoTimeout
>;

export type GenericPixiReactReconciler<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = Reconciler<Container, Instance, any, Instance, Instance>;

export type diffPropertiesType<PixiContainer> = (
    instance: PixiContainer,
    type: string,
    lastProps: PropsType,
    nextProps: PropsType
) => UpdatePayload;

export type ReactRoot = {
    render: (element: JSX.Element) => any;
    unmount: () => void;
};

export type RootEntry = {
    pixiFiberContainer: any;
    reactRoot: ReactRoot;
};

export type GenericRoots<Container extends MinimalContainer> = Map<
Container,
RootEntry
>;

export type GenericCreateRootType<Container extends MinimalContainer> = (
    container: Container
) => ReactRoot;

export type GenericRenderType<Container extends MinimalContainer> = (
    element: JSX.Element,
    container: Container,
    callback?: () => void
) => any;

export type GenericUnmountComponentAtNodeType<
    Container extends MinimalContainer
> = (container: Container) => void;

type MountUnmountType<Application> = (app: Application) => void;

export type DisplayObjectSettableProperty =
    | 'alpha'
    | 'buttonMode'
    | 'cacheAsBitmap'
    | 'cursor'
    | 'filterArea'
    | 'filters'
    | 'hitArea'
    | 'interactive'
    | 'mask'
    | 'pivot'
    | 'position'
    | 'renderable'
    | 'rotation'
    | 'scale'
    | 'skew'
    | 'transform'
    | 'visible'
    | 'x'
    | 'y';

type InteractionEventTypes =
    | 'click'
    | 'mousedown'
    | 'mousemove'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'mouseupoutside'
    | 'tap'
    | 'touchstart'
    | 'touchmove'
    | 'touchend'
    | 'touchendoutside'
    | 'pointercancel'
    | 'pointerout'
    | 'pointerover'
    | 'pointertap'
    | 'pointerdown'
    | 'pointerup'
    | 'pointerupoutside'
    | 'pointermove'
    | 'rightclick'
    | 'rightdown'
    | 'rightup'
    | 'rightupoutside'
    | 'touchcancel';

export type InteractionEvents = {
    [P in InteractionEventTypes]?: (event: any) => void;
};

export type PointLikeProps = 'position' | 'scale' | 'pivot' | 'anchor' | 'skew';

export type ImageSource = string | HTMLImageElement;
export type VideoSource = string | HTMLVideoElement;

export type HTMLCanvasProps = React.CanvasHTMLAttributes<HTMLCanvasElement>;

export type GenericStageProps<Application, ApplicationOptions> =
    HTMLCanvasProps & {
        children: React.ReactNode;
        width?: number;
        height?: number;
        onMount?: MountUnmountType<Application>;
        onUnmount?: MountUnmountType<Application>;
        raf?: boolean;
        renderOnComponentChange?: boolean;
        options?: Partial<ApplicationOptions>;
    };

export type GenericStagePropsWithFiber<
    Application,
    ApplicationOptions,
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = GenericStageProps<Application, ApplicationOptions> & {
    pixiReactFiberInstance: GenericPixiReactReconciler<Container, Instance>;
};

// TODO: Is it possible to write a forwardRef compatible interface for BaseStage?
// export interface IBaseStage<Application, IApplicationOptions, PixiContainer extends MinimalContainer, Ticker>
//     extends React.Component<Required<StagePropsWithFiber<Application, IApplicationOptions, PixiContainer>>>
// {
//     _canvas: HTMLCanvasElement | null;
//     _mediaQuery: MediaQueryList | null;
//     _ticker: Ticker | null;
//     _needsUpdate: boolean;
//     app: Application | null;
//     mountNode: any;
//     updateSize: () => void;
//     needsRenderUpdate: () => void;
//     renderStage: () => void;
//     resetInteractionManager: () => void;
//     getChildren: () => any;
// }
//
// export type ReactStageComponent<
//     Application,
//     ApplicationOptions,
//     PixiContainer extends MinimalContainer,
//     Ticker,
// > = ForwardRefExoticComponent<
// PropsWithoutRef<StageProps<Application, ApplicationOptions>> &
// RefAttributes<IBaseStage<Application, ApplicationOptions, PixiContainer, Ticker>>
// >;

export type GenericReactStageComponent<
    BaseStage,
    Application,
    ApplicationOptions
> = ForwardRefExoticComponent<
PropsWithoutRef<GenericStageProps<Application, ApplicationOptions>> &
RefAttributes<BaseStage>
>;

export type applyPropsType<
    P extends PropsType,
    Instance extends PixiReactMinimalExpandoContainer
> = (
    instance: Instance,
    oldProps: Readonly<P>,
    newProps: Readonly<P>
) => boolean;

export type didMountType<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = (instance: Instance, parent: Container) => void;

export type willUnmountType<
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = (instance: Instance, parent: Container) => void;

export type lifeCycleConfigType = {
    /**
     * Destroy instance on unmount?
     * @default true
     */
    destroy?: boolean;

    /**
     * Destroy child instances?
     * @default true
     */
    destroyChildren?: boolean;

    /**
     * Destroy underlying Texture instance
     * @default false
     */
    destroyTexture?: boolean;

    /**
     * Destroy underlying BaseTexture instance
     * @default false
     */
    destroyBaseTexture?: boolean;
};

// Used in place of ICustomComponent for internal components
export type createCustomComponentType<
    P extends PropsType,
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> = (root: Container, props: P) => Instance;

export interface ICustomComponent<
    P extends PropsType,
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
>
{
    /**
     * Create the PIXI instance
     * The component is created during React reconciliation.
     *
     * @param props passed down props
     * @param {PixiContainer} root passed down props
     * @returns {PixiContainer}
     */
    create(props: P, root?: Container | null): Instance;

    /**
     * Instance mounted
     * This is called during React reconciliation.
     *
     * @param {PixiContainer} instance
     * @param {PixiContainer} parent
     */
    didMount?: didMountType<Container, Instance>;

    /**
     * Instance will unmount
     * This is called during React reconciliation.
     *
     * @param {PixiContainer} instance
     * @param {PixiContainer} parent
     */
    willUnmount?: willUnmountType<Container, Instance>;

    /**
     * Apply props for this custom component.
     * This is called during React reconciliation.
     *
     * @param {PixiContainer} instance
     * @param oldProps
     * @param newProps
     */
    applyProps?: applyPropsType<P, Instance>;

    /**
     * Reconcile config
     */
    config?: lifeCycleConfigType;
}

export type ComponentType<
    P extends PropsType,
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
> =
    | createCustomComponentType<P, Container, Instance>
    | ICustomComponent<P, Container, Instance>;

export type ComponentsType = Record<string, ComponentType<any, any, any>>;

export type PixiComponentType = <
    P extends PropsType,
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
>(
    type: string,
    lifecycle: ComponentType<P, Container, Instance>
) => React.ComponentType<P>;

export type PixiReactRenderEventType =
    | 'appendInitialChild'
    | 'appendChild'
    | 'appendChildToContainer'
    | 'removeChild'
    | 'removeChildFromContainer'
    | 'insertInContainerBefore'
    | 'commitUpdate';

export type PixiReactRenderEventPayload = {
    detail: PixiReactRenderEventType;
};

/**
 * END GENERIC TYPES the below concrete types inject imported Pixi types into the above Generic types
 */

// These are types for the "expando" Pixi instances, that are returned from
// the component lifecycle create method with additional properties/methods
// added for interopability with Pixi React
export type PixiReactAnimatedSprite = BasePixiReactContainer<
Container,
AnimatedSprite
>;
export type PixiReactBitmapText = BasePixiReactContainer<Container, BitmapText>;
export type PixiReactContainer = BasePixiReactContainer<Container, Container>;
export type PixiReactGraphics = BasePixiReactContainer<Container, Graphics>;
export type PixiReactNineSlicePlane = BasePixiReactContainer<
Container,
NineSlicePlane
>;
export type PixiReactParticleContainer = BasePixiReactContainer<
Container,
ParticleContainer
>;
export type PixiReactSimpleMesh = BasePixiReactContainer<Container, SimpleMesh>;
export type PixiReactSimpleRope = BasePixiReactContainer<Container, SimpleRope>;
export type PixiReactSprite = BasePixiReactContainer<Container, Sprite>;
export type PixiReactText = BasePixiReactContainer<Container, Text>;
export type PixiReactTilingSprite = BasePixiReactContainer<
Container,
TilingSprite
>;

export type PixiReactTexture = Texture & {
    __reactpixi?: {
        root: PixiReactContainer | null;
    };
};

type WithSource = GenericWithSource<Texture>;
export type PointLike = GenericPointLike<IPoint>;

export type BaseReactContainerProps<
    PixiInstance extends MinimalContainer,
    Props = object
> = GenericReactContainerProps<IPoint, Container, PixiInstance, Props>;

// These are types for all of the React props each of the predefined Pixi React
// Components requires, the first definitions are properties specific to the
// Pixi React versions, below they are combined with all the properties pulled
// from each specific Pixi Component, as well as all the inherited DisplayObject
// and Container props
// TODO: do some of these props just come from the PIXI components?
// Compare with original handwritten types
// Might also be nicer if these were colocated with the components themselves
export type AnimatedSpriteTexturesProp = Texture<Resource>[] | FrameObject[];
export type AnimatedSpriteProps = PropsType & {
    textures?: AnimatedSpriteTexturesProp;
    images?: string[];
    isPlaying?: boolean;
    initialFrame?: number;
};
export type BitmapTextProps = PropsType & {
    text: string;
    style: Partial<IBitmapTextStyle>;
};
export type SpriteProps = PropsType & WithSource;
export type TextProps = PropsType &
WithSource & {
    text?: string;
    style?: Partial<TextStyle>;
    isSprite?: boolean;
};
export type GraphicsProps = PropsType & {
    draw?(graphics: Graphics): void;
    geometry?: Graphics;
};
export type NineSlicePlaneProps = PropsType &
WithSource & {
    leftWidth?: number;
    topWidth?: number;
    rightWidth?: number;
    bottomWidth?: number;
};
export type ParticleContainerProps = PropsType & {
    maxSize?: number;
    // TODO: properties contents
    properties?: object;
    batchSize?: number;
    autoResize?: boolean;
};
export type TilingSpriteProps = PropsType &
WithSource & {
    tilePosition?: PointLike;
    tileScale?: PointLike;
};
export type SimpleMeshProps = PropsType &
WithSource & {
    image?: string | HTMLImageElement;
    texture?: Texture;
    vertices?: Float32Array;
    uvs?: Float32Array;
    indices?: Uint16Array;
    drawMode?: DRAW_MODES;
};
export type SimpleRopeProps = PropsType &
WithSource & {
    points: IPoint[];
};

// Merge above props with relevant Pixi Component and DisplayObject/Container props
export type ReactStageProps = GenericStageProps<
Application,
IApplicationOptions
>;
export type ReactStagePropsWithFiber = GenericStagePropsWithFiber<
Application,
IApplicationOptions,
PixiReactContainer,
PixiReactContainer
>;
export type ReactAnimatedSpriteProps = BaseReactContainerProps<
AnimatedSprite,
AnimatedSpriteProps
>;
export type ReactBitmapTextProps = BaseReactContainerProps<
BitmapText,
BitmapTextProps
>;
export type ReactContainerProps = BaseReactContainerProps<Container>;
export type ReactGraphicsProps = BaseReactContainerProps<
Graphics,
GraphicsProps
>;
export type ReactNineSlicePlaneProps = BaseReactContainerProps<
NineSlicePlane,
NineSlicePlaneProps
>;
export type ReactParticleContainerProps = BaseReactContainerProps<
ParticleContainer,
ParticleContainerProps
>;
export type ReactSimpleMeshProps = BaseReactContainerProps<
SimpleMesh,
SimpleMeshProps
>;
export type ReactSimpleRopeProps = BaseReactContainerProps<
SimpleRope,
SimpleRopeProps
>;
export type ReactSpriteProps = BaseReactContainerProps<Sprite, SpriteProps>;
export type ReactTextProps = BaseReactContainerProps<Text, TextProps>;
export type ReactTilingSpriteProps = BaseReactContainerProps<
TilingSprite,
TilingSpriteProps
>;

// Types for the actual React components themselves for when they're rendered in JSX
export type ReactStageComponent = GenericReactStageComponent<
BaseStage,
Application,
IApplicationOptions
>;
export type ReactAnimatedSpriteComponent = React.FC<ReactAnimatedSpriteProps>;
export type ReactBitmapTextComponent = React.FC<ReactBitmapTextProps>;
export type ReactContainerComponent = React.FC<
React.PropsWithChildren<ReactContainerProps>
>;
export type ReactGraphicsComponent = React.FC<ReactGraphicsProps>;
export type ReactNineSlicePlaneComponent = React.FC<ReactNineSlicePlaneProps>;
export type ReactParticleContainerComponent = React.FC<
React.PropsWithChildren<ReactParticleContainerProps>
>;
export type ReactSimpleMeshComponent = React.FC<ReactSimpleMeshProps>;
export type ReactSimpleRopeComponent = React.FC<ReactSimpleRopeProps>;
export type ReactSpriteComponent = React.FC<
React.PropsWithChildren<ReactSpriteProps>
>;
export type ReactTextComponent = React.FC<ReactTextProps>;
export type ReactTilingSpriteComponent = React.FC<ReactTilingSpriteProps>;

// TODO: Do we need to create Concrete types like this for everything?
// Can we supply the Generics on the functions themselves rather than the
// function type? It might work and create simpler code/types but will need
// the functions themselves to be rewritten as Generic. This could be a way to
// minimize the size of the versioned pixi components package

// Concrete types for this version of PIXI, with the Container/ExpandoContainer generics pre-supplied
export type createInstanceType = genericCreateInstanceType<
PixiReactContainer,
PixiReactContainer
>;

export type Roots = GenericRoots<PixiReactContainer>;

export type CreateRootType = GenericCreateRootType<PixiReactContainer>;

export type RenderType = GenericRenderType<Container>;

export type UnmountComponentAtNodeType =
    GenericUnmountComponentAtNodeType<Container>;
