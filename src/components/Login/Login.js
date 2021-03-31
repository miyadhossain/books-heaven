import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import firebaseConfig from "./firebase.config";
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
      <button onClick={handleGoogleSignIn}>Continue with Google</button>
    </div>
  );
};

export default Login;
