import {  Link, NavLink } from 'react-router-dom';
import {Fragment} from 'react';
import axios from 'axios';

const NavBar = (props) =>{ 
    const userinfo = props.UserInfo;
    const handleLogout = () => {  // 로그아웃을 위한 메소드 제작
      axios.post('http://localhost:5000/api/logout', {
          headers: {'Content-Type': 'application/json'},
          withCredentials: true,
        }).then(() => props.logoutCallBack())  // 로그인 상태 변경
        // .catch((e) => alert(e));
    };
    return(
    <Fragment>
    <nav className="navbar bg-light">               
        <div className="container">         
          <p className="fs-4 fw-bold text-primary " to="/"> TRAVEL KOREA </p>            
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
              <li className="nav-item me-3">
                <NavLink               
                 activeClassName="active"
                 className="nav-link" 
                 aria-current="page" 
                 onClick={handleLogout}
                 to="/login">
                 <img src="/images/icons8-edit-profile-80.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />                            
                </NavLink>
                { userinfo }
              </li>                 
              <li>
                <NavLink               
                 activeClassName="active"
                 className="nav-link" 
                 aria-current="page" 
                 to="/Members">
                 <img src="/images/icons8-search-58.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />                             
                </NavLink>

                
              </li> 
              
            </ul>          
        </div>
    </nav>   
    <nav className="navbar navbar-dark bg-primary">               
        <div className="container">
          <Link className="navbar-brand" to="/"> HOME </Link>              
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