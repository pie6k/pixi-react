import { invariant } from './invariant';

import type {
    ComponentsType,
    ComponentType,
    PixiReactMinimalExpandoContainer,
    PropsType,
} from '../types';

export const COMPONENTS: ComponentsType = {};

/**
 * Create Component
 *
 * @param {string} type
 * @param {Object} lifecycle methods
 */
export function PixiComponent<
    P extends PropsType,
    Container extends PixiReactMinimalExpandoContainer,
    Instance extends PixiReactMinimalExpandoContainer
>(type: string, lifecycle: ComponentType<P, Container, Instance>)
{
    invariant(!!type, 'Expect type to be defined, got `%s`', type);
    invariant(
        !COMPONENTS[type],
        'Component `%s` could not be created, a component with that name already exists.',
        type
    );

    COMPONENTS[type] = lifecycle;

    return type as unknown as React.ComponentType<P>;
}
