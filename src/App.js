/* eslint-disable no-console */
import React from 'react';
import './App.css';
import Button from './components/button/Button';

function App() {
  return (
    <div className="App">
      <Button onClick={() => console.log('good lord')}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </Button>
    </div>
  );
}

export default App;
