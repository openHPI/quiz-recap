import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import App from './App';
import { exampleData as data } from './static/data';

const root = ReactDOM.createRoot(
  document.getElementById('quiz-recap') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>,
);
