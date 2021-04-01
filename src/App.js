import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin";
import CheckOut from "./components/CheckOut/CheckOut";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <PrivateRoute path="/checkOut/:id">
            <Header />
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Header />
            <Orders />
          </PrivateRoute>
          <Route path="/login">
            <Header />
            <Login />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
