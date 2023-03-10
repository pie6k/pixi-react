import { Stage } from '@pixi/react';

export const stageDecorator = (Story) => {
    return (
        <Stage>
            <Story />
        </Stage>
    );
};
