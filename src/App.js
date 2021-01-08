import Navbar from './Components/navbar';
import PublicRoute from './ReactRouterRoutes/publicRoute';
import Messages from './Components/messages';
import SignUp from './Components/signUp';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./Context/auth";
import PrivateRoute from './ReactRouterRoutes/privateRoute';
import { useState } from 'react';
import Login from './Components/login';


function App() {
  /*Get localStorage*/
  const existingLocalStorage = localStorage.getItem(process.env.REACT_APP_MY_LOCAL_STORAGE);
  let token, id, username;
  if (existingLocalStorage) {
    /*Check if there are something in localStorage and get token, id & username from localStorage*/
    ({ token, username, id } = JSON.parse(localStorage.getItem(process.env.REACT_APP_MY_LOCAL_STORAGE)));
  }
  const [authTokens, setAuthTokens] = useState(token);

  /*Function to set token, id & username in localStorage*/
  const setTokens = (data) => {
    let authData =
    {
      "token": data.token,
      "id": data.id,
      "username": data.message.split(" ").splice(-1).toString()
    }
    localStorage.setItem(process.env.REACT_APP_MY_LOCAL_STORAGE, JSON.stringify(authData));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="App">
          <Navbar token={token} id={id} />
          <Switch>
            <PrivateRoute exact path="/" component={authTokens ? () => <Messages token={token} username={username} id={id} />
              : Login} />
            <PublicRoute path="/signup" component={SignUp} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/:id" component={Login} />
          </Switch>
        </div>
      </Router >
    </AuthContext.Provider>
  );
}

export default App;
