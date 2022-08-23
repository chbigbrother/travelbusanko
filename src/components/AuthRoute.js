import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
  import NavBar from '../components/NavBar';
  import routes from '../routes';

function AuthRoute(props) {
    return (
        <Router>
        <NavBar UserInfo={props.UserInfo} logoutCallBack={props.logoutCallBack} />
        <div className="container mt-3" >  
          <Switch>
          {routes.map((route) => {
              return <Route key={route.path} exact path={route.path} component={route.component} />;           
          })}
          </Switch>
        </div>
      </Router>
    );
};

export default AuthRoute;