import { useCallback, useMemo } from 'react';
import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { Graphics as PixiGraphics } from '@pixi/graphics';
import { Container, Graphics, Text } from '@pixi/react';

import { Button } from '../../Button';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { getColor } from '../utils/color';

const args = {
    color: '#A5E24D',
    size: 150,
    radius: 150,
    disabled: false,
    action: action('Button'),
};

export const UseGraphics: ComponentStory<typeof Button> = ({ size, color, disabled, radius, action }: any) =>
{
    const normalizedColor = useMemo(() => getColor(color), [color]);

    const draw = useCallback(
        (g: PixiGraphics) =>
        {
            g.clear();
            g.beginFill(normalizedColor).drawRoundedRect(0, 0, size, size, radius);
        },
        [normalizedColor, size, radius],
    );

    const halfSize = size / 2;

    // TODO: update pixi-ui Button to allow view to be settable after instantiation, this hack recreates Button on certain
    // prop changes so Storybook dynamic controls work
    // const key = `${size}${color}${radius}`;

    return (
        <Button
            enabled={!disabled}
            onPress={() => action('onPress')}
            onDown={() => action('onDown')}
            onUp={() => action('onUp')}
            onHover={() => action('onHover')}
            onOut={() => action('onOut')}
            onUpOut={() => action('onUpOut')}
        >
            <Container>
                <Graphics draw={draw} />
                <Text anchor={[0.5, 0.5]} x={halfSize} y={halfSize} text="🤙" style={{ fontSize: 70 }} />
            </Container>
        </Button>
    );
};

export default {
    title: 'Components/Button/Use Graphics',
    component: UseGraphics,
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
} as ComponentMeta<typeof Button>;
