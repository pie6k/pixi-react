import React from 'react';
import { act } from 'react-dom/test-utils';
import { Application } from '@pixi/app';
import { render, Stage, Text, unmountComponentAtNode } from '../src';
import { roots } from '../src/render';

jest.useFakeTimers();

const app = new Application();
const element = () => (
    <Stage>
        <Text text="Hello Word!" />
    </Stage>
);

describe('unmount render', () =>
{
    beforeEach(() =>
    {
        roots.clear();
    });

    test('remove root', () =>
    {
        expect(roots.size).toBe(0);

        act(() =>
        {
            render(element, app.stage);
        });
        expect(roots.size).toBe(1);

        act(() =>
        {
            unmountComponentAtNode(app.stage);
        });
        expect(roots.size).toBe(0);
    });

    test('unmount component', () =>
    {
        const unmount = jest.fn();

        const App = () =>
        {
            React.useEffect(() => unmount);

            return null;
        };

        act(() =>
        {
            render(<App />, app.stage);
        });

        act(() =>
        {
            unmountComponentAtNode(app.stage);
        });
        jest.advanceTimersByTime(1000);

        expect(unmount).toBeCalledTimes(1);
    });
});
