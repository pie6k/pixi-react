import { cloneElement, useEffect, useRef } from 'react';
import { Button as PixiButton } from '@pixi/ui';
import type { FederatedPointerEvent } from '@pixi/events';
import type { Container } from '@pixi/display';

type ButtonSignalName = 'onPress' | 'onPress' | 'onDown' | 'onUp' | 'onHover' | 'onOut' | 'onUpOut';
type SignalHandler = (btn?: PixiButton, e?: FederatedPointerEvent) => void;

export type ButtonProps = {
    children: JSX.Element;
    enabled?: boolean;
    onPress?: SignalHandler;
    onDown?: SignalHandler;
    onUp?: SignalHandler;
    onHover?: SignalHandler;
    onOut?: SignalHandler;
    onUpOut?: SignalHandler;
};

const noop = () => {};

const useSignalEffect = (
    buttonInstance: React.RefObject<PixiButton>,
    signalName: ButtonSignalName,
    handler: SignalHandler,
) =>
    useEffect(() =>
    {
        if (!buttonInstance.current)
        {
            return;
        }

        buttonInstance.current[signalName].connect(handler);

        // eslint-disable-next-line consistent-return
        return () =>
        {
            if (!buttonInstance.current)
            {
                return;
            }

            buttonInstance.current[signalName].disconnect(handler);
        };
    }, [signalName, handler]);

/**
 * This is a slightly funky implementation. The pixi-ui Button Class is just a plain JS Class and NOT an extension of
 * Container. It also requires a view that extends Container to be passed through to its constructor. Because of this:
 *
 * 1) We need to somehow instantiate Pixi UI Button outside the PIXI scenegraph
 * 2) We need to have an instantiated view component (not JSX) ready to pass to it when we instantiate it
 * 3) We can't use a custom pixi-react PixiComponent to do this as it won't allow us to do 1) or 2). 1) Because PixiComponent
 *    needs to return a PixiReactContainer not just a plain Object; 2) Because any pixi-react component passed in via a prop
 *    (view or children) will be JSX and NOT a PixiReactContainer instance because the pixi-react Reconciler's hostConfig
 *    createInstance method isn't called until the JSX is actually rendered.
 * 4) react-three-fiber solves part of the problem of non-scenegraph objects using its attach prop, but this relies on
 *    attaching non-scenegraph objects to scenegraph objects, we want to do the opposite
 * 5) We could potentially allow PixiComponent to return plain Objects and pass through a PixiReactContainer defined on a
 *    child JSX element via an attach prop as its scenegraph component, but it's a big refactor
 *
 * To solve this, we're creating a React Component wrapper, since it's easy to add non-scenegraph components in React which
 * return child PixiReactContainer instances:
 */
export const Button = (props: ButtonProps) =>
{
    const {
        children,
        enabled = true,
        onPress = noop,
        onDown = noop,
        onUp = noop,
        onHover = noop,
        onOut = noop,
        onUpOut = noop,
    } = props;
    const viewInstance = useRef<Container>(null!);
    const buttonInstance = useRef<PixiButton>(null!);

    // 2) instantiate a pixi-ui Button with the child view on initial mount
    useEffect(() =>
    {
        buttonInstance.current = new PixiButton(viewInstance.current);
    }, []);

    // 3) update any props whenever they change
    useEffect(() =>
    {
        buttonInstance.current.enabled = enabled;
    }, [enabled]);

    useSignalEffect(buttonInstance, 'onPress', onPress);
    useSignalEffect(buttonInstance, 'onDown', onDown);
    useSignalEffect(buttonInstance, 'onUp', onUp);
    useSignalEffect(buttonInstance, 'onHover', onHover);
    useSignalEffect(buttonInstance, 'onOut', onOut);
    useSignalEffect(buttonInstance, 'onUpOut', onUpOut);

    // 1) Render the passed in JSX pixi-react component from props.children, capturing it via a ref
    return cloneElement(children, {
        ref: viewInstance,
    });
};
