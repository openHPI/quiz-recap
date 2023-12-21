import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { webtechData } from './static/data';

const root = ReactDOM.createRoot(
  document.getElementById('quiz-recap') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App questions={webtechData.questions} answers={webtechData.answers} />
  </React.StrictMode>
);
