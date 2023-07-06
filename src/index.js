import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { makeServer } from './server';
import reportWebVitals from './reportWebVitals';

import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { PostProvider } from "./context/PostContext";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <PostProvider>
            <App/>
            <ToastContainer />
        </PostProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
