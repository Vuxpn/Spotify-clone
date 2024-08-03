import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import PlayerContextProvider from './context/playercontext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <PlayerContextProvider>
                <App />
            </PlayerContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
