import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { exampleData as data } from './static/data';
import { Data } from './types';
import './i18n';

const renderQuizRecap = (id: string, data: Data, locale = 'en') => {
  const root = ReactDOM.createRoot(document.getElementById(id) as HTMLElement);
  root.render(
    <React.StrictMode>
      <App data={data} locale={locale} />
    </React.StrictMode>,
  );
};

// Exclude demo page setup from build
if (import.meta.env.DEV) {
  renderQuizRecap('quiz-recap', data);
}

export default renderQuizRecap;
export type * from './types';
