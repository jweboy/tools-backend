import React from 'react';
import { render } from 'react-dom';
import SystemLayout from './layouts';
// import App from './App';

const App = () => {
  return (
    <div>
      <SystemLayout />
    </div>
  );
};

render(<App />, document.getElementById('root'));
