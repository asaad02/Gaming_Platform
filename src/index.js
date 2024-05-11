import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App/index.js'; // Import the Game component
// Import the SessionProvider component
import {SessionProvider} from './SessionProvider/index.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SessionProvider><App /></SessionProvider>);
