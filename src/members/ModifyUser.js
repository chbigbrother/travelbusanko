import { useEffect, useState } from "react";
import { refreshToken } from '../token/Auth';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.css';
import axios from "axios";
import Swal from "sweetalert2";

const url = 'http://travelbusanko.com'; 

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
                console.log(data.birthday);
                setInputId(data.id);
                setInputPw(data.password);
                setInputName(data.name);
                setInputEmail(data.email);
                setInputPhone(data.phone_number);
                setInputBirth(data.birthday);
            })
        }
        
    },[]);
    const onClickEvent = () => {
        axios.post(url + '/api/user/info/update', null, {
            params: {
                'user_id': inputId,
                'user_pwd': inputPw,
                'user_name': inputName,
                'user_email': inputEmail,
                'user_phone': inputPhone,
                'user_birth': inputBirth,
            }
        }).then((response) => {
            document.location.href = url;
        }).catch()
    }
    
    
    return(
        <>
        <div className="App">
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">????????? ?????? ??????</h3>
                        <div className="form-group mt-3">
                            <label>?????????</label>
                            <input type="text" className="form-control mt-1" placeholder="????????? ??????" readOnly="readonly" name = "user_id" value={inputId} onChange = { handleInputId } />
                        </div>
                        <div className="form-group mt-3">
                            <label>????????????</label>
                            <input type="password" className="form-control mt-1" placeholder="???????????? ??????" name = "user_pwd" value={inputPw} onChange = { handleinputPw } />
                        </div>
                        <div className="form-group mt-3">
                            <label>??????</label>
                            <input type="text" className="form-control mt-1" placeholder="e.g ?????????" name = "user_name" value={inputName} onChange = { handleinputName } />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email ??????</label>
                            <input type="email" className="form-control mt-1" placeholder="Email ?????? ??????" name = "user_email" value={inputEmail} onChange = { handleinputEmail } />
                        </div>
                        
                        <div className="form-group mt-3">
                            <label>????????????</label>
                            <input type="text" className="form-control mt-1" placeholder="010-1234-0000" name = "user_phone" value={inputPhone} onChange = { handleinputPhone } />
                        </div>
                        <div className="form-group mt-3">
                            <label>????????????</label>  
                            <input type="text" className="form-control mt-1" placeholder="6?????? ???????????? ??????" name = "user_birth" value={inputBirth} onChange = { handleinputBirth } />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" className="btn btn-primary" onClick={ onClickEvent }>
                            ?????? ?????? ??????
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