import { Application, RendererType, Ticker } from 'pixi.js';
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { PixiReactFiber } from '../reconciler';
import { invariant, PROPS_DISPLAY_OBJECT } from '../utils';
import { AppProvider } from './provider';

// eslint-disable-next-line no-duplicate-imports
import type { ErrorInfo } from 'react';
import type {
    HTMLCanvasProps,
    PixiReactContainer,
    ReactStageProps,
    ReactStagePropsWithFiber,
} from '../types';

class TrackablePromise
{
    isPending: boolean;
    isRejected: boolean;
    isFulfilled: boolean;
    promise: Promise<any>|null = null;
    constructor(promise: Promise<any>)
    {
        this.isPending = true;
        this.isRejected = false;
        this.isFulfilled = false;
        this.promise = promise;

        promise
            .then((value) =>
            {
                this.isFulfilled = true;
                this.isPending = false;

                return value;
            })
            .catch((error) =>
            {
                this.isRejected = true;
                this.isPending = false;
                throw error;
            });
    }
}

/**
 * -------------------------------------------
 * Stage React Component (use this in react-dom)
 *
 * @usage
 *
 * const App = () => (
 *   <Stage
 *     width={500}
 *     height={500}
 *     options={ backgroundColor: 0xff0000 }
 *     onMount={( renderer, canvas ) => {
 *       console.log('PIXI renderer: ', renderer)
 *       console.log('Canvas element: ', canvas)
 *     }}>
 * );
 *
 * -------------------------------------------
 */

export const propTypes = {
    // dimensions
    width: PropTypes.number,
    height: PropTypes.number,

    // will return renderer
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,

    // run ticker at start?
    raf: PropTypes.bool,

    // render component on component lifecycle changes?
    renderOnComponentChange: PropTypes.bool,

    children: PropTypes.node,

    // PIXI options, see https://pixijs.download/dev/docs/PIXI.Application.html
    options: PropTypes.shape({
        antialias: PropTypes.bool,
        autoDensity: PropTypes.bool,
        autoStart: PropTypes.bool,
        background: PropTypes.number,
        backgroundAlpha: PropTypes.number,
        backgroundColor: PropTypes.number,
        bezierSmoothness: PropTypes.number,
        clearBeforeRender: PropTypes.bool,
        context: PropTypes.any,
        eventFeatures: PropTypes.object,
        eventMode: PropTypes.string,
        failIfMajorPerformanceCaveat: PropTypes.bool,
        forceFallbackAlpha: PropTypes.bool,
        width: PropTypes.number,
        height: PropTypes.number,
        hello: PropTypes.bool,
        manageImports: PropTypes.bool,
        multiView: PropTypes.bool,
        powerPreference: PropTypes.string,
        preferences: PropTypes.object,
        preferWebGLVersion: PropTypes.number,
        premultipliedAlpha: PropTypes.bool,
        preserveDrawingBuffer: PropTypes.bool,
        resolution: PropTypes.number,
        roundPixels: PropTypes.bool,
        sharedTicker: PropTypes.bool,
        sharedLoader: PropTypes.bool,
        textureGCActive: PropTypes.bool,
        textureGCMaxIdle: PropTypes.number,
        textureGCCheckCountMax: PropTypes.number,
        useBackBuffer: PropTypes.bool,
        webgl: PropTypes.any,
        webgpu: PropTypes.any,

        // resizeTo needs to be a window or HTMLElement
        resizeTo: (props, propName) =>
        {
            const el = props[propName];

            try
            {
                el
                    && invariant(
                        el === window || el instanceof HTMLElement,
                        `Invalid prop \`resizeTo\` of type ${typeof el}, expect \`window\` or an \`HTMLElement\`.`
                    );
            }
            catch (e)
            {
                return e instanceof Error ? e : null;
            }

            return null;
        },

        // canvas is optional, use if provided
        canvas: (props, propName, componentName) =>
        {
            const el = props[propName];

            try
            {
                el
                    && invariant(
                        el instanceof HTMLCanvasElement,
                        // eslint-disable-next-line max-len
                        `Invalid prop \`canvas\` of type ${typeof el}, supplied to ${componentName}, expected \`<canvas> Element\``
                    );
            }
            catch (e)
            {
                return e instanceof Error ? e : null;
            }

            return null;
        },
    }),
};

const wrappedStagePropTypes = {
    ...propTypes,
    // passed in via configurePixiReactStage HOC
    pixiReactFiberInstance: PropTypes.object,
};

const noop = (_app: Application) => {};

const defaultProps = {
    width: 800,
    height: 600,
    onMount: noop,
    onUnmount: noop,
    options: {},
    raf: true,
    renderOnComponentChange: true,
};

// force optional to required props for defaults to prevent TS undefined errors
type BaseStagePropsWithDefaults = Required<ReactStagePropsWithFiber>;
type HOCStagePropsWithDefaults = Required<ReactStageProps>;

export function getCanvasProps(props: Partial<BaseStagePropsWithDefaults>)
{
    const reserved = [
        ...Object.keys(wrappedStagePropTypes),
        ...Object.keys(PROPS_DISPLAY_OBJECT),
    ];

    return Object.keys(props)
        .filter((p) => !reserved.includes(p))
        .reduce(
            (all, prop) => ({
                ...all,
                [prop]: props[prop as keyof HTMLCanvasProps],
            }),
            {}
        );
}

export class BaseStage extends React.Component<BaseStagePropsWithDefaults>
{
    _canvas: HTMLCanvasElement | null = null;
    _mediaQuery: MediaQueryList | null = null;
    _ticker: Ticker | null = null;
    _needsUpdate: boolean = true;
    app: Application | null = null;
    mountNode: any;

    static propTypes = wrappedStagePropTypes;
    static defaultProps = defaultProps;

    public appReady: TrackablePromise | null = null;

    async componentDidMount()
    {
        const {
            pixiReactFiberInstance,
            onMount,
            width,
            height,
            options,
            raf,
            renderOnComponentChange,
        } = this.props;

        if (this.app)
        {
            this.appReady!.promise = null;
            this.appReady = null;
        }

        this.app = new Application();
        // eslint-disable-next-line no-void
        this.appReady = new TrackablePromise(this.app.init({
            width,
            height,
            view: this._canvas!,
            ...options,
            autoDensity: options?.autoDensity !== false,
        }));

        this.appReady.promise!.then(() =>
        {
            if (process.env.NODE_ENV === 'development' && this.app!.renderer.type === RendererType.WEBGL)
            {
                // workaround for React 18 Strict Mode unmount causing canvas
                // context to be lost
                // @ts-ignore - workaround for development only
                this.app.renderer.context.extensions.loseContext = null;
            }

            this.app!.ticker.autoStart = false;
            this.app!.ticker[raf ? 'start' : 'stop']();

            (this.app!.stage as PixiReactContainer).__reactpixi = {
                root: this.app!.stage,
                parent: null,
                previousAttach: null,
                attachedObjects: [],
            };
            // @ts-ignore - react reconciler lists several parameters as required that are optional
            this.mountNode = pixiReactFiberInstance.createContainer(this.app.stage);
            pixiReactFiberInstance.updateContainer(
                this.getChildren(),
                this.mountNode,
                this
            );

            onMount(this.app!);

            // update size on media query resolution change?
            // only if autoDensity = true
            if (
                options?.autoDensity
            && window.matchMedia
            && options?.resolution === undefined
            )
            {
                this._mediaQuery = window.matchMedia(
                    `(-webkit-min-device-pixel-ratio: 1.3), (min-resolution: 120dpi)`
                );
                this._mediaQuery.addListener(this.updateSize);
            }

            // listen for reconciler changes
            if (renderOnComponentChange && !raf)
            {
                this._ticker = new Ticker();
                this._ticker.autoStart = true;
                this._ticker.add(this.renderStage);
                this.app!.stage.on(
                    '__REACT_PIXI_REQUEST_RENDER__',
                    this.needsRenderUpdate
                );
            }

            this.updateSize();
            this.renderStage();
        });
    }

    componentDidUpdate(prevProps: ReactStagePropsWithFiber)
    {
        const {
            pixiReactFiberInstance,
            width,
            height,
            raf,
            renderOnComponentChange,
            options,
        } = this.props;

        // update resolution
        if (
            options?.resolution !== undefined
            && prevProps?.options?.resolution !== options?.resolution
        )
        {
            this.app!.renderer.resolution = options.resolution;
            this.resetInteractionManager();
        }

        // update size
        if (
            prevProps.height !== height
            || prevProps.width !== width
            || prevProps.options?.resolution !== options?.resolution
        )
        {
            this.updateSize();
        }

        // handle raf change
        if (prevProps.raf !== raf)
        {
            this.app!.ticker[raf ? 'start' : 'stop']();
        }

        // flush fiber
        pixiReactFiberInstance.updateContainer(
            this.getChildren(),
            this.mountNode,
            this
        );

        if (
            prevProps.width !== width
            || prevProps.height !== height
            || prevProps.raf !== raf
            || prevProps.renderOnComponentChange !== renderOnComponentChange
            || prevProps.options !== options
        )
        {
            this._needsUpdate = true;
            this.renderStage();
        }
    }

    updateSize = () =>
    {
        const { width, height, options } = this.props;

        if (!options?.resolution)
        {
            this.app!.renderer.resolution = window.devicePixelRatio;
            this.resetInteractionManager();
        }

        this.app!.renderer.resize(width, height);
    };

    needsRenderUpdate = () =>
    {
        this._needsUpdate = true;
    };

    renderStage = () =>
    {
        const { renderOnComponentChange, raf } = this.props;

        if (!raf && renderOnComponentChange && this._needsUpdate)
        {
            this._needsUpdate = false;
            this.app!.renderer.render(this.app!.stage);
        }
    };

    // provide support for Pixi v6 still
    resetInteractionManager()
    {
        // const { interaction: maybeInteraction } = this.app!.renderer.plugins;

        // if (maybeInteraction?.resolution)
        // {
        //     maybeInteraction.resolution = this.app!.renderer.resolution;
        // }
    }

    getChildren()
    {
        const { children } = this.props;

        return <AppProvider value={this.app}>{children}</AppProvider>;
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo)
    {
        console.error(`Error occurred in \`Stage\`.`);
        console.error(error);
        console.error(errorInfo);
    }

    componentWillUnmount()
    {
        // check if appReady is fulfilled
        if (this.appReady?.isPending)
        {
            this.appReady = null;
            this.app = null;

            return;
        }

        const { pixiReactFiberInstance, onUnmount } = this.props;

        onUnmount(this.app!);

        if (this._ticker)
        {
            this._ticker.remove(this.renderStage);
            this._ticker.destroy();
        }

        this.app!.stage.off(
            '__REACT_PIXI_REQUEST_RENDER__',
            this.needsRenderUpdate
        );

        pixiReactFiberInstance.updateContainer(null, this.mountNode, this);

        if (this._mediaQuery)
        {
            this._mediaQuery.removeListener(this.updateSize);
            this._mediaQuery = null;
        }

        this.app!.destroy();
    }

    render()
    {
        const { options } = this.props;

        if (options && options.canvas)
        {
            invariant(
                options.canvas instanceof HTMLCanvasElement,
                'options.canvas needs to be a `HTMLCanvasElement`'
            );

            return null;
        }

        return (
            <canvas
                {...getCanvasProps(this.props)}
                ref={(c: HTMLCanvasElement) => (this._canvas = c)}
            />
        );
    }
}

export const Stage = forwardRef<BaseStage, ReactStageProps>(
    (props, ref) =>
    {
        const normalizedProps = {
            ...defaultProps,
            ...props,
        };

        return (
            <BaseStage
                ref={ref}
                {...(normalizedProps as HOCStagePropsWithDefaults)}
                pixiReactFiberInstance={PixiReactFiber}
            />
        );
    }
);

Stage.displayName = 'Stage';
