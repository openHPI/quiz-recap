import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { aiData as data } from './static/data';

const root = ReactDOM.createRoot(
  document.getElementById('quiz-recap') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App questions={data.questions} answers={data.answers} />
  </React.StrictMode>
);
