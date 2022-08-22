import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './LoginPage.css';

var url = 'http://travelbusanko.com';

function LoginPage() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    /// input data 변화시 value 값을 변경시 useState 해준다.
    const handleInputId = (e) => {
        setInputId(e.target.value)
    };

    const handleinputPw = (e) => {
        setInputPw(e.target.value)
    }

    /// login 버튼 클릭 이벤트
    const onClickLogin = () => {
        Axios.post(url + '/api/login', null, {
            params: {
                'user_id': inputId,
                'user_pwd': inputPw
            }
        }).then((response) => {
            
            if (response.data.userId === undefined) {
                alert('입력하신 id가 일치하지 않습니다.')
            } else if (response.data.userId === null) {
                alert('입력하신 pwd가 일치하지 않습니다.')
            } else if (response.data.userId === inputId) {
                console.log("success?");
                sessionStorage.setItem('user_id', inputId)
                document.location.href = url
            }
            
        }).catch()
    }

    return ( 
        <>
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
                        <Link to="/Members/signup">회원가입</Link>
                    </p>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default LoginPage;