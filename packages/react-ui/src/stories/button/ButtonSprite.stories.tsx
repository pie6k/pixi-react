import { useMemo } from 'react';
import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container, Sprite, Text } from '@pixi/react';
import type { PointCoords } from '@pixi/react-types';

import { Button } from '../../Button';
import { argTypes, getDefaultArgs } from '../utils/argTypes';
import { getColor } from '../utils/color';
import { useAssets } from '../useAssets';
import type { Texture } from '@pixi/core';

const args = {
    text: 'Click me!',
    textColor: '#FFFFFF',
    disabled: false,
    action: action('Button'),
};

export const UseSprite: ComponentStory<typeof Button> = ({ text, textColor, disabled, action }: any) =>
{
    const textStyle = useMemo(
        () => ({
            fontSize: 40,
            fill: getColor(textColor),
        }),
        [textColor],
    );

    const { assets, isLoading } = useAssets({ url: 'button.png' });
    const texture = assets! as Texture;
    const textPosition = useMemo(
        () => ({
            // TODO: why is this cast necessary?
            anchor: [0.5, 0.5] as PointCoords,
            x: texture ? texture.width / 2 : 0,
            y: texture ? texture.height / 2 - 12 : 0,
        }),
        [texture],
    );

    if (isLoading || !texture)
    {
        return <Text text="Loading" style={textStyle} />;
    }

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
                <Sprite texture={texture} />
                <Text {...textPosition} text={text} style={textStyle} />
            </Container>
        </Button>
    );
};

export default {
    title: 'Components/Button/Use Sprite',
    component: UseSprite,
    argTypes: argTypes(args),
    args: getDefaultArgs(args),
} as ComponentMeta<typeof Button>;
