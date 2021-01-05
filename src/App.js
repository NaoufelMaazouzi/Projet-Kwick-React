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
import { useEffect, useState } from 'react';
import Login from './Components/login';


function App() {
  const existingToken = localStorage.getItem('myAuthInLocalStorage');
  const [authTokens, setAuthTokens] = useState(existingToken);

  const setTokens = (data) => {

    let authData =
    {
      "token": data.token,
      "id": data.id,
      "username": data.message.split(" ").splice(-1).toString()
    }
    localStorage.setItem("myAuthInLocalStorage", JSON.stringify(authData));
    setAuthTokens(data);
  }
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className="App">
          <Navbar isLoggedIn={authTokens} />
          <Switch>
            <PrivateRoute exact path="/" component={authTokens ? Messages : Login} />
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
