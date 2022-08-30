import { useEffect, useState } from "react";
import { refreshToken } from '../token/Auth';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.css';
import axios from "axios";
import Swal from "sweetalert2";

const url = 'http://travelbusanko.com'; // 'http://localhost:5000'// 

function ModifyUser(props){
    const userinfo = props.location.inputValue.userinfo;
    
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputBirth, setInputBirth] = useState('');

    const handleInputId = (e) => {
        setInputId(e.target.value)
    };

    const handleinputPw = (e) => {
        setInputPw(e.target.value)
    }
    const handleinputName = (e) => {
        setInputName(e.target.value)
    }
    const handleinputEmail = (e) => {
        setInputEmail(e.target.value)
    }
    const handleinputPhone = (e) => {
        setInputPhone(e.target.value)
    }
    const handleinputBirth = (e) => {
        setInputBirth(e.target.value)
    }
    
    useEffect(()=>{
        
        if (typeof(userinfo) != 'undefined'){
            axios.get(url + `/api/user/info/${userinfo}`, {
                headers: {
                  "Content-Type": `application/json`,
                }})
            .then(res =>{
                var data = res.data[0];
                setInputId(data.id);
                setInputPw(data.password);
                setInputName(data.name);
                setInputEmail(data.email);
                setInputPhone(data.phone_number);
                setInputBirth(data.birthday);
            })
        }
        
    },[]);
    const onClickEvent = {

    }
    
    
    return(
        <>
        <div className="App">
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">사용자 정보 수정</h3>
                        <div className="form-group mt-3">
                            <label>아이디</label>
                            <input type="text" className="form-control mt-1" placeholder="아이디 입력" readOnly="readonly" name = "user_id" value={inputId} onChange = { handleInputId } />
                        </div>
                        <div className="form-group mt-3">
                            <label>비밀번호</label>
                            <input type="password" className="form-control mt-1" placeholder="비밀번호 입력" name = "user_pwd" value={inputPw} onChange = { handleinputPw } />
                        </div>
                        <div className="form-group mt-3">
                            <label>이름</label>
                            <input type="text" className="form-control mt-1" placeholder="e.g 홍길동" name = "user_name" value={inputName} onChange = { handleinputName } />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email 주소</label>
                            <input type="email" className="form-control mt-1" placeholder="Email 주소 입력" name = "user_email" value={inputEmail} onChange = { handleinputEmail } />
                        </div>
                        
                        <div className="form-group mt-3">
                            <label>전화번호</label>
                            <input type="text" className="form-control mt-1" placeholder="010-1234-0000" name = "user_phone" value={inputPhone} onChange = { handleinputPhone } />
                        </div>
                        <div className="form-group mt-3">
                            <label>생년월일</label>  
                            <input type="text" className="form-control mt-1" placeholder="6자리 생년월일 입력" name = "user_birth" value={inputBirth} onChange = { handleinputBirth } />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick={onClickEvent}>
                            회원 정보 수정
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            
                        </p>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default ModifyUser;