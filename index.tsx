
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Import Global CSS (Tailwind + Micro-AOS)
import './index.css';

// REMOVIDO: import 'aos/dist/aos.css'; 
// Motivo: Substituído por implementação nativa leve no index.css para performance (LCP/TBT).

// Initialize Vercel Speed Insights
injectSpeedInsights();

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
