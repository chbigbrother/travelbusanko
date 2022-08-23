import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    //401은 Access Token or Refresh Token 이 invalid 될때
    //response data의 code값이 
    // 4401 : access Token error , 4402: refresh Token error
    if(error.response.status === 401){
      if(error.response.data.code === '4401'){
        window.location.href= '/'; 
      }
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);


