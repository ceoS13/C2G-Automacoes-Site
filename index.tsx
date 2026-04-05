
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import Global CSS (Tailwind)
import './index.css';

// Defer Vercel Speed Insights to after page load (non-blocking)
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    import('@vercel/speed-insights').then(({ injectSpeedInsights }) => {
      injectSpeedInsights();
    });
  });
}

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
