import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import App from './local-module/App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider} from "react-redux";
import rootReducer from "./reducer/combineReducer";
import {configureStore} from "@reduxjs/toolkit"
import {Toaster} from "react-hot-toast";
// import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const store=configureStore(
  {
    reducer:rootReducer,
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
     <App/>
     <Toaster/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
