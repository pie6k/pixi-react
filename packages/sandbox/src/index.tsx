import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Assets } from 'pixi.js';

async function init() {
    await Assets.load('https://pixijs.io/pixi-react/img/bunny.png');
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    );
}

init();
