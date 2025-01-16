import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.body);
root.render(
  <React.StrictMode>
    <App />
    <div className="text-white text-2xl text-center">
      by <a href="https://github.com/ourouimed" className='font-bold text-cyan-500'>Ourouimed</a> &copy; {new Date().getFullYear()}
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
