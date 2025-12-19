import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Global CSS (Tailwind)
import './index.css';

// Import AOS Styles (installed via npm)
import 'aos/dist/aos.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);