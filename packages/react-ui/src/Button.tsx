import { cloneElement, useEffect, useMemo, useCallback } from 'react';
import { Button as PixiButton } from '@pixi/ui';
import type { FederatedPointerEvent } from '@pixi/events';
import type { Container } from '@pixi/display';

type ButtonSignalName =
    | 'onPress'
    | 'onPress'
    | 'onDown'
    | 'onUp'
    | 'onHover'
    | 'onOut'
    | 'onUpOut';
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
    buttonInstance: PixiButton,
    signalName: ButtonSignalName,
    handler: SignalHandler
) =>
    useEffect(() =>
    {
        if (!buttonInstance)
        {
            return;
        }

        buttonInstance[signalName].connect(handler);

        // eslint-disable-next-line consistent-return
        return () =>
        {
            if (!buttonInstance)
            {
                return;
            }

            buttonInstance[signalName].disconnect(handler);
        };
    }, [signalName, handler]);

/**
 * The pixi-ui Button Class is just a plain JS Class and NOT an extension of Container. It also requires a view that extends
 * Container to be passed to it. Because of this:
 *
 * - We need to instantiate Pixi UI Button outside the PIXI scenegraph
 * - We need to have an instantiated view component (not JSX) to pass to it
 * - We can't use a custom pixi-react PixiComponent to do this as it won't allow us to do 1) or 2). 1) Because PixiComponent
 *   needs to return a PixiReactContainer not just a plain Object; 2) Because any pixi-react component passed in via a prop
 *   (view or children) will be JSX and NOT a PixiReactContainer instance because the pixi-react Reconciler's hostConfig
 *   createInstance method isn't called until the JSX is actually rendered.
 *
 * To solve this we use a standard React Functional Component as a wrapper, since this is already outside the pixi scenegraph:
 *
 * 1) Instantiate Pixi UI Button in a `useMemo`
 * 2) Return `props.children` to offload rendering to PixiReactFiber
 * 3) Retrieve the resultant Pixi Component Instance via a callback ref and pass it to `PixiButton.init`
 * 4) Update props via `useEffect`
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
    // 1) instantiate an empty PixiButton
    const buttonInstance = useMemo<PixiButton>(() => new PixiButton(), []);

    // 3) initialize the buttonInstance with the rendered child
    const handleViewUpdate = useCallback(
        (viewInstance: Container) =>
        {
            if (!viewInstance)
            {
                return;
            }
            buttonInstance.init(viewInstance);
        },
        [buttonInstance]
    );

    // 4) update any props whenever they change
    useEffect(() =>
    {
        buttonInstance.enabled = enabled;
    }, [buttonInstance, enabled]);

    useSignalEffect(buttonInstance, 'onPress', onPress);
    useSignalEffect(buttonInstance, 'onDown', onDown);
    useSignalEffect(buttonInstance, 'onUp', onUp);
    useSignalEffect(buttonInstance, 'onHover', onHover);
    useSignalEffect(buttonInstance, 'onOut', onOut);
    useSignalEffect(buttonInstance, 'onUpOut', onUpOut);

    // 2) Render the passed in JSX pixi-react component from props.children, using a callback ref
    return cloneElement(children, {
        ref: handleViewUpdate,
    });
};
