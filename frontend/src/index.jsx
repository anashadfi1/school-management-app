import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StudentContextProvider } from './authentication/context/StudentContext'
import { AuthContextProvider } from './authentication/context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StudentContextProvider>
        <App />
      </StudentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);