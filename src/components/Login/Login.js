import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import GoogleIcon from "../../icons/Group 573.png";
import firebaseConfig from "./firebase.config";
import "./Login.css";
!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    success: false,
    error: "",
  });
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  // google sign
  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signInedUser = { name: displayName, email, success: true };
        setUser(signInedUser);
        setLoggedInUser(signInedUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUserInfo = { ...user };
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
  };
  return (
    <div>
      <div className="formStyle">
        <h3 className="text-center">Login</h3>
        <button
          className="mx-auto d-block btn loginBtn rounded-pill mt-5"
          onClick={handleGoogleSignIn}
        >
          <img style={{ width: "20px" }} src={GoogleIcon} alt="" /> Continue
          with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
