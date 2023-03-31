import { CheckBox as PixiCheckBox } from '@pixi/ui';
import type { Container } from '@pixi/display';
import type { CheckBoxOptions as PixiCheckBoxOptions } from '@pixi/ui';
import type {
    BaseReactContainerProps,
    BasePixiReactContainer,
    PixiReactContainer,
} from './types';

export type PixiReactCheckBox = BasePixiReactContainer<Container, PixiCheckBox>;

export type CheckBoxProps = BaseReactContainerProps<
PixiCheckBox,
PixiCheckBoxOptions
>;

const CheckBox = (
    _root: PixiReactContainer,
    { style, text, checked }: CheckBoxProps
) =>
    // TODO: pick util?
    // TODO: shallow equal util?
    // TODO: force overwrite?
    new PixiCheckBox({
        style,
        text,
        checked,
    });

export default CheckBox;
