import type { ComponentsType, PixiComponentType } from '@pixi/react-types';
import { Button } from './Button';

const TYPES = {
};

// Button is a normal React component that wraps pixi-ui Button
export {
    Button
};

const components: ComponentsType = {};

export function registerComponents(PixiComponent: PixiComponentType)
{
    Object.keys(TYPES).forEach((type) => PixiComponent(type, components[type]));
}
