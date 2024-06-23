import React from 'react';
import ReactDOM from 'react-dom/client';
import TicTacToe from './components/TicTacToe';
import '../src/styles/global.css'; // Assuming you have a global CSS file

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <TicTacToe />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);