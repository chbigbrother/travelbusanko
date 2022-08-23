import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './members/LoginPage';
import SignupPage from './members/SignupPage';
import HomePage from './homes/HomePage';
import AuthRoute from './components/AuthRoute';
import { refreshToken } from './token/Auth';


function App(){
    
    const [isLogin , setIsLogin] = useState(false);
    const [generateToken , setToken] = useState(false);
    const [userInfo , setUserInfo] = useState(false);
    const [loading , setLoading] = useState(false);
    var TOKEN = '';
    useEffect(()=>{
      try{
          refreshToken(loginCallBack);
      }catch(e){
          console.log(e);
      }
    },[]);
  
    function loginCallBack(login){
      setIsLogin(login);
      setLoading(true);
    }

    function accessToken(token){
      window.localStorage.setItem("token", token);
      setToken(token);
    }

    function logoutCallBack(logout){
      setIsLogin(false);
      localStorage.setItem("token", 'undefined');
      window.location.href= 'http://travelbusanko.com'; 
    }

    function UserInfo(object){
      setUserInfo(object);
    }
    
    if(loading){
      return ( 
        <Router>
        <>
          {!isLogin && localStorage.getItem("token") == 'undefined' ? (
            <Switch>
              <Route exact path="/" render={(props)=> <LoginPage {...props} loginCallBack={loginCallBack} UserInfo={UserInfo} accessToken={accessToken} />} />
              <Route exact path="/members/signup" component={SignupPage} key='/members/signup' />          
            </Switch>
            ) : (
              <AuthRoute exact isLogin={isLogin} path="/" component={HomePage} UserInfo={userInfo} logoutCallBack={logoutCallBack} accessToken={generateToken} />
            )
          }
        </>          
        </Router>
      );
    } else {
      return (
        <div>
          Loading ....
        </div>
      )
    }
}

export default App;
