import {  Link, NavLink, useHistory } from 'react-router-dom';
import { Fragment, useState, useRef } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';

const NavBar = (props) =>{ 
    const userinfo = props.UserInfo;
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const nextPage = useHistory();
    const ref = useRef(null);
    console.log(nextPage);
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };

    const handleLogout = () => {  // 로그아웃을 위한 메소드 제작
      Swal.fire({
        icon: "warning",
        title: "로그아웃",
        text: `로그아웃 하시겠습니까??`,
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
        }).then((res) => {
            /* Read more about isConfirmed, isDenied below */
            if (res.isConfirmed) {
              //삭제 요청 처리
              axios.post('http://travelbusanko.com/api/logout', {
                      headers: {'Content-Type': 'application/json'},
                      withCredentials: true,
                    }).then(() => props.logoutCallBack())  // 로그인 상태 변경
                    // .catch((e) => alert(e));
            }
            else{
                //취소
            }
        });
    };

    return(
    <Fragment>
    <nav className="navbar bg-light">               
        <div className="container">         
          <p className="fs-4 fw-bold text-primary " to="/home"> TRAVEL KOREA </p>            
          <ul 
            style={{
                flexDirection: 'row'
            }}
             className="navbar-nav"
          >
              <li className="nav-item me-3">
                  <NavLink               
                  activeClassName="active"
                  className="nav-link" 
                  aria-current="page" 
                  to="/maps">
                    <img src="/images/icons8-location-48.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                  map                
                  </NavLink>
              </li>  
              <li className="nav-item me-3" ref={ref}>
                <Button style={{"background": "none", "border":"none"}} 
                  onClick={handleClick}><img src="/images/icons8-edit-profile-80.png" 
                  alt="" 
                  width="30" 
                  height="24" 
                  className="d-inline-block align-text-top"/>
                </Button>
                <Overlay
                  show={show}
                  target={target}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Header as="h3">{ userinfo }</Popover.Header>
                    <Popover.Body>
                      <Button style={{"background": "none", "border":"none"}}             
                        activeClassName="active"
                        className="nav-link" 
                        aria-current="page" 
                        onClick={() =>  nextPage.push({
                          pathname: "/user/modify",
                          inputValue: {userinfo},
                          })}
                        >
                          사용자 정보 변경
                      </Button>
                      <hr/>
                      <NavLink               
                        activeClassName="active"
                        className="nav-link" 
                        aria-current="page" 
                        onClick={ handleLogout } 
                        to="#">
                          로그아웃
                      </NavLink>
                    </Popover.Body>
                  </Popover>
                </Overlay>
                {/* <NavLink               
                 activeClassName="active"
                 className="nav-link" 
                 aria-current="page" 
                 onClick={handleLogout}
                 to="#">
                 <img src="/images/icons8-edit-profile-80.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />                            
                </NavLink> */}                
              </li>                 
              <li>
                <NavLink               
                 activeClassName="active"
                 className="nav-link" 
                 aria-current="page" 
                 to="/">
                 <img src="/images/icons8-search-58.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />                             
                </NavLink>

                
              </li> 
              
            </ul>          
        </div>
    </nav>   
    <nav className="navbar navbar-dark bg-primary">               
        <div className="container">
          <Link className="navbar-brand" to="/home"> HOME </Link>              
          <ul 
            style={{
                flexDirection: 'row'
            }}
             className="navbar-nav"
          >
              <li className="nav-item me-3">
                <NavLink               
                 activeClassName="active"
                 className="nav-link" 
                 aria-current="page" 
                 to="/locations">
                  <img src="/images/geo-alt.svg" alt="" width="30" height="24" className="d-inline-block align-text-top" />            
                 addLocation
               </NavLink>
              </li>   
              <li className="nav-item me-3">
                <NavLink               
                 activeClassName="active"
                 className="nav-link" 
                 aria-current="page" 
                 to="/events">
                 Event
                </NavLink>
              </li>   
              <li className="nav-item me-3">
                <NavLink               
                 activeClassName="active"
                 className="nav-link" 
                 aria-current="page" 
                 to="/blogs">
                  Blogs
                </NavLink>
              </li>                
            </ul>          
        </div>
    </nav>
{/* 
    
    <footer class="bd-footer p-3 p-md-5 mt-5 bg-light text-center text-sm-left">
      <div class="container">
        <ul class="bd-footer-links">
          <li className="nav-item"><a href="http://travelbusanko.com/">HOME</a></li>
          <li className="nav-item"><a href="http://travelbusanko.com/">About</a></li>      
        </ul>
        <p class="text-center text-muted">COPYRIGHT(C) 2022 Company, Inc. ALL RIGHTS RESERVED. </p>
      </div>
    </footer>
     */}
  </Fragment>
    )  
};

export default NavBar;