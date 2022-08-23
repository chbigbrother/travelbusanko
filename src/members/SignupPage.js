import Axios from "axios";
import { useEffect, useState } from "react";
import './LoginPage.css';

var url = 'http://travelbusanko.com';

function SignupPage() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputBirth, setInputBirth] = useState('');
    console.log("ccccc");
    
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

    const checkAvailId = () => {
        console.log(inputId)
        Axios.post(url + '/api/checkid', null, {
            params: {
                'user_id': inputId,
            }
        }).then((response) => {
            if(response.data.message=='No'){
                alert('사용이 불가능한 아이디 입니다.')
            }else{
                alert('사용이 가능한 아이디 입니다.')
            }
        })
    }

    /// login 버튼 클릭 이벤트
    const onClickSignup = () => {
        Axios.post(url + '/api/signup', null, {
            params: {
                'user_id': inputId,
                'user_pwd': inputPw,
                'user_name': inputName,
                'user_email': inputEmail,
                'user_phone': inputPhone,
                'user_birth': inputBirth,

            }
        }).then((response) => {
            /*if (response.data.userId === undefined) {
                alert('입력하신 id가 일치하지 않습니다.')
            } else if (response.data.userId === null) {
                alert('입력하신 pwd가 일치하지 않습니다.')
            } else if (response.data.userId === inputId) {
                sessionStorage.setItem('user_id', inputId)
                document.location.href = url + '/'
            }*/
            console.log(response);
            document.location.href = url
        }).catch()
    }

    return ( 
        <>
        <div className="App">
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">회원가입</h3>
                        <div className="form-group mt-3">
                            <label>아이디</label>
                            <input type="text" className="form-control mt-1" placeholder="아이디 입력" name = "user_id" onChange = { handleInputId } />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" className="btn btn-primary" onClick = { checkAvailId } >
                            아이디 중복 확인
                            </button>
                        </div>
                        <div className="form-group mt-3">
                            <label>비밀번호</label>
                            <input type="password" className="form-control mt-1" placeholder="비밀번호 입력" name = "user_pwd" onChange = { handleinputPw } />
                        </div>
                        <div className="form-group mt-3">
                            <label>이름</label>
                            <input type="text" className="form-control mt-1" placeholder="e.g 홍길동" name = "user_name" onChange = { handleinputName } />
                        </div>
                        <div className="form-group mt-3">
                            <label>Email 주소</label>
                            <input type="email" className="form-control mt-1" placeholder="Email 주소 입력" name = "user_email" onChange = { handleinputEmail } />
                        </div>
                        
                        <div className="form-group mt-3">
                            <label>전화번호</label>
                            <input type="text" className="form-control mt-1" placeholder="010-1234-0000" name = "user_phone" onChange = { handleinputPhone } />
                        </div>
                        <div className="form-group mt-3">
                            <label>생년월일</label>
                            <input type="text" className="form-control mt-1" placeholder="6자리 생년월일 입력" name = "user_birth" onChange = { handleinputBirth } />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" onClick = { onClickSignup } >
                            회원가입
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

export default SignupPage;