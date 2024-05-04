import { useState } from "react";
import FullPageLoader from "../Components/FullPageLoader.js";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PasswordResetModal from "../Components/PasswordResetModal.js";
import "../Css/Login.css";
import { auth } from "../firebase/config.js";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../slice/userSlice.js";

function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login");
  const [userCredentails, setuserCredentials] = useState({});
  const [error, setError] = useState("");
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);

  const handleShowPasswordResetModal = () => {
    setShowPasswordResetModal(true);
  };

  const handleClosePasswordResetModal = () => {
    setShowPasswordResetModal(false);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({ id: user.uid, email: user.email }));
    } else {
      // User is signed out
      dispatch(setUser(null));
    }
    if (isLoading) {
      setIsLoading(false);
    }
  });

  // console.log(auth);

  function handleCredentials(e) {
    setuserCredentials({ ...userCredentails, [e.target.name]: e.target.value });
    // console.log(userCredentails);
  }

  function handleSignup(e) {
    e.preventDefault();
    setError("");
    createUserWithEmailAndPassword(
      auth,
      userCredentails.email,
      userCredentails.password
    ).catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setError(error.message);
      // console.log(errorCode);
      // console.log(errorMessage);
      // ..
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(
      auth,
      userCredentails.email,
      userCredentails.password
    ).catch((error) => {
      setError(error.message);
    });
  }

  // function handlePasswordReset(){
  //   const email = prompt('Please enter your email');
  //   sendPasswordResetEmail(auth, email);
  //   alert('Email has sent! Check your email for password reset guildlines.');
  // }

  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}
      <div>
        <Header />
        <div className="container login-page">
          <section>
            <h1>Welcome to the NASA App</h1>
            <p style={{ color: "red" }}>
              Login or create an account to continue
            </p>
            <div className="login-type">
              <button
                className={`btn ${loginType == "login" ? "selected" : ""}`}
                onClick={() => setLoginType("login")}
              >
                Login
              </button>
              <button
                className={`btn ${loginType == "signup" ? "selected" : ""}`}
                onClick={() => setLoginType("signup")}
              >
                Signup
              </button>
            </div>
            <form className="add-form login">
              <div className="form-control">
                <label>Email *</label>
                <input
                  onChange={(e) => {
                    handleCredentials(e);
                  }}
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-control">
                <label>Password *</label>
                <input
                  onChange={(e) => {
                    handleCredentials(e);
                  }}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </div>
              {loginType == "login" ? (
                <button
                  onClick={(e) => {
                    handleLogin(e);
                  }}
                  className="active btn btn-block"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    handleSignup(e);
                  }}
                  className="active btn btn-block"
                >
                  Sign Up
                </button>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <p
                onClick={handleShowPasswordResetModal}
                className="forgot-password"
              >
                Forgot Password?
              </p>
              <PasswordResetModal
                show={showPasswordResetModal}
                handleClose={handleClosePasswordResetModal}
              />
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
