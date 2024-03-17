import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import App from './local-module/App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from 'react-router-dom';
import EventPage from './local-module/Events/EventPage.jsx';
import MyEvent from './local-module/profile/MyEvent.jsx';
import RegisterForm from './local-module/Events/RegisterForm.jsx';
import Navbar from './local-module/navbar.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
     <App/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
