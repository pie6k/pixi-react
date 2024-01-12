import { Application } from 'pixi.js';
import { useContext } from 'react';
import { Context } from '../stage/provider';
import { invariant } from '../utils';

export function useApp(): Application
{
    const app = useContext(Context);

    invariant(
        app instanceof Application,
        'No Context found with `%s`. Make sure to wrap component with `%s`',
        'PIXI.Application',
        'AppProvider'
    );

    // invariant will throw if app is null
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return app!;
}
