// src/pages/LoginPage.jsx

import { useEffect, useState } from "react";
import { refreshToken } from '../token/Auth';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.css';
import axios from "axios";

const url = 'http://travelbusanko.com';

function LoginPage(props){
    
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    
    /// input data 변화시 value 값을 변경시 useState 해준다.
    const handleInputId = (e) => {
        setInputId(e.target.value)
    };

    const handleinputPw = (e) => {
        setInputPw(e.target.value)
    }

    function onClickLogin(){
        
        try{
            let data = {userId: inputId, userPw: inputPw};
            axios.post(url + "/api/login",JSON.stringify(data), {
                headers: {
                  "Content-Type": `application/json`,
                }})
            .then(res =>{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data;
                props.loginCallBack(true);
                props.accessToken(res.data.token);
                props.UserInfo(inputId);
                props.history.push("/");
                
                setTimeout(function(){
                    refreshToken(null);
                    window.location.href= 'http://travelbusanko.com'; 
                } , (60 * 10000));
            })
            .catch(ex=>{
                console.log("login requset fail : " + ex);
            })
            .finally(()=>{console.log("login request end")});
        }catch(e){
            console.log(e);
        }
        
        
    }

    useEffect(()=>{
        
    })

    return(
        <div className="App">
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                    <h3 className="Auth-form-title">로그인</h3>
                    <div className="form-group mt-3">
                        <label>아이디</label>
                        <input type="text" className="form-control mt-1" placeholder="아이디를 입력하세요." name = "user_id" onChange = { handleInputId } />
                    </div>
                    <div className="form-group mt-3">
                        <label>비밀번호</label>
                        <input type="password" className="form-control mt-1" placeholder="비밀번호를 입력하세요." name = "user_pw" onChange = { handleinputPw } />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="button" className="btn btn-primary" onClick = { onClickLogin } >
                        로그인
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        <Link to="/members/signup">회원가입</Link>
                    </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;