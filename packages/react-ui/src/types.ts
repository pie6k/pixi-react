import type { Container } from '@pixi/display';
import type {
    MinimalContainer,
    PixiReactContainer as BasePixiReactContainer,
    ReactContainerProps as GenericReactContainerProps,
} from '@pixi/react-types';
import type { ObservablePoint, Point } from '@pixi/math';

// TODO: There's a lot here that's duped from react-components-pixi-7
// That's because these concrete types depend on the imported version of pixi
// What's the best way to define them in a modular way?
// Could/should we define these in a react-types-pixi-7 module!?
// Or should we just import directly from 'react-components-pixi-7'?

export type BaseReactContainerProps<PixiContainer extends MinimalContainer, Props = object> = GenericReactContainerProps<
Point,
ObservablePoint,
PixiContainer,
Props
>;

export type ReactContainerProps = BaseReactContainerProps<Container>;

export type PixiReactContainer = BasePixiReactContainer<Container>;
