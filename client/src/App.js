import React, { useContext } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/NavbarComponent';
import PasswordReset from './components/PasswordReset';
import SecuredPage from './components/SecuredPage';
import UserList from './components/UserList';
import Auth from './HOC/Auth';
// import OpenPage from './components/OpenPage';
import Global from './HOC/Global';

import { GlobalContext } from "./HOC/Global";

function App() {

  return (
    <div className="App">
      <Global>

        <Router>
          <NavbarComponent />
          <Switch>

            <Route exact path="/register" component={Auth(Register, false)} />
            <Route exact path="/login" component={Auth(Login, false)} />
            <Route exact path="/passwordReset" component={Auth(PasswordReset, false)} />
            <Route exact path="/SecuredPage" component={Auth(SecuredPage, true)} />
            <Route exact path="/SecuredPage/:userId" component={Auth(SecuredPage, true)} />
            <Route exact path="/Users" component={Auth(UserList, true)} />
            {/* <Route exact path="/OpenPage" component={Auth(OpenPage,false)} /> */}
            <Redirect to="/404" component={<h1>404</h1>} />
          </Switch>
        </Router>

      </Global>
    </div>
  );
}

export default App;
