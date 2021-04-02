import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";
import GoogleIcon from "../../icons/Group 573.png";
import firebaseConfig from "./firebase.config";
import "./Login.css";
!firebase.apps.length && firebase.initializeApp(firebaseConfig);
const Login = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    success: false,
    error: "",
  });
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const { register, errors, watch, handleSubmit } = useForm({});
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = () => {
    // sign up
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    // sign in
    if (!newUser) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.error = "";
          setUser(newUserInfo);
          updateUserName(user.name);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
  };

  // blur handle
  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 8;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (e.target.name === "password_repeat") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
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

  const updateUserName = (name, email) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
        email: email,
      })
      .then(() => {
        const newUserInfo = { ...user };
        setUser(newUserInfo);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUserInfo = { ...user };
        newUserInfo.error = errorMessage;
        setUser(newUserInfo);
      });
  };
  return (
    <div className="login">
      <form className="formStyle">
        <h3>{newUser ? "Create an account" : "Log in"}</h3>
        {newUser && <label className="labelStyle">Name</label>}
        {newUser && (
          <input
            className="inputStyle"
            onBlur={handleBlur}
            type="text"
            id="name"
            name="name"
            ref={register({
              required: "You must specify your name",
            })}
          />
        )}
        {errors.name && <p className="error">{errors.name.message}</p>}
        <label className="labelStyle">Username or Email</label>
        <input
          className="inputStyle"
          onBlur={handleBlur}
          name="email"
          ref={register({
            required: "You must specify your email",
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <label className="labelStyle">Password</label>
        <input
          className="inputStyle"
          onBlur={handleBlur}
          name="password"
          type="password"
          ref={register({
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        {newUser && <label className="labelStyle">Confirm password</label>}
        {newUser && (
          <input
            className="inputStyle"
            onBlur={handleBlur}
            name="password_repeat"
            type="password"
            ref={register({
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
          />
        )}
        {errors.password_repeat && (
          <p className="error">{errors.password_repeat.message}</p>
        )}

        <input
          className="inputStyle"
          onClick={handleSubmit(onSubmit)}
          type="submit"
          value={newUser ? "Create account" : "Log in"}
        />
        <span className="text-danger">
          {newUser ? "Already have an account?" : "Dont't have an account?"}
        </span>
        <a className="accountLink" onClick={() => setNewUser(!newUser)}>
          {newUser ? "Log in" : "Create an account"}
        </a>
      </form>
      <h6 className="mt-3" style={{ color: "red", textAlign: "center" }}>
        {user.error}
      </h6>
      <h6 className="text-center">Or</h6>
      <button
        onClick={handleGoogleSignIn}
        className="mx-auto d-block btn button rounded-pill buttonStyle"
      >
        <img style={{ width: "20px" }} src={GoogleIcon} alt="" /> Continue with
        Google
      </button>
    </div>
  );
};

export default Login;
