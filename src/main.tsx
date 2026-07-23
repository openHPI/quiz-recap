import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { exampleData as data } from './static/data';
import { Data } from './types';
import './i18n';

const renderQuizRecap = (id: string, data: Data, locale = 'en') => {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Quiz Recap element #${id} was not found`);
  }

  const root = ReactDOM.createRoot(element);
  root.render(
    <React.StrictMode>
      <App data={data} locale={locale} />
    </React.StrictMode>,
  );

  return root;
};

// Exclude demo page setup from build
if (import.meta.env.DEV) {
  renderQuizRecap('quiz-recap', data);
}

export default renderQuizRecap;
export type * from './types';
