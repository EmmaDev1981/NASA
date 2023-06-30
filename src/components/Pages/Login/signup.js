import React, { useState, useEffect } from "react";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Nav/nav";
import Footer from "../Footer/footer";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";
import { useNavigate } from "react-router-dom";
import {
  doSignUpwithEmailAndPassword,
  doSignInwithEmailAndPassword,
  doGoogleLoginAction,
  resetLogin,
  doResetPasswordByEmail
} from "../../Store/actions";

function Signup({
  doSignUpwithEmailAndPassword,
  doSignInwithEmailAndPassword,
  doGoogleLoginAction,
  logged,
  error_login,
  fetching_login,
  resetLogin,
  doResetPasswordByEmail
}) {

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
    repeatPassword: ""
  });

  const [toogleUser, setToogleUser] = useState("Sign Up");
  const navigate = useNavigate()

  const handleToogle = () => {
    if (toogleUser === "Sign Up") {
      setToogleUser("Sign In");
    } else {
      setToogleUser("Sign Up");
    }
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //* missing validate INPUTS
  const validate = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regex.test(user.email) && user.password.length === 8) {
      if (user.password === user.repeatPassword) {
        return true;
      } else {
        handleWrongNotEqualPassword()
        return false
      }
    } else {
      handleWrongEmailOrPassFormat()
      return false;
    }
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    if (validate) {
      if (toogleUser === "Sign Up") {
        doSignUpwithEmailAndPassword(user.email, user.password);
        setUser({ email: "", password: "", repeatPassword: "" });
        navigate("/home");
        handleLoginSuccess()
      } else {
        doSignInwithEmailAndPassword(user.email, user.password);
        setUser({ email: "", password: "", repeatPassword: "" });
        navigate("/home");
        handleLoginSuccess()
      }
    }
  };

  const handleGoogleLogin = () => {
    resetLogin()
    doGoogleLoginAction()
    navigate("/home");
  }

  const handleResetPass = () => {
    doResetPasswordByEmail(user.email)
  }

  //toast "login success"
  const { enqueueSnackbar } = useSnackbar();
  const handleLoginSuccess = () => {
    enqueueSnackbar(
      `LOGIN SUCCESS: Thanks!!`,
      {
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        TransitionComponent: Slide,
        variant: "success",
      }
    );
  }

  // //toast 1 "warning wrong email format or password"
  const handleWrongEmailOrPassFormat = () => {
    enqueueSnackbar(`WRONG EMAIL or PASSWORD FORMAT`, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      TransitionComponent: Slide,
      variant: "warning",
    });
  };

  // //toast 2 "warning wrong passwords, not equals"
  const handleWrongNotEqualPassword = () => {
    enqueueSnackbar(`PLEASE CHECK PASSWORD, NOT EQUAL`, {
      anchorOrigin: {
        vertical: "top",
        horizontal: "left",
      },
      TransitionComponent: Slide,
      variant: "warning",
    });
  };

  return (
    <>
      <Navbar />
      <div className="home-sub-title">
        <h2>Login / Registration</h2>
      </div>
      <div className="div-login-container">
        <div className="login-div">
          <form>
            <p className="forgot-password text-center">
              {(error_login === null)
                ? ("")
                : ("LOGIN ERROR")}
            </p>
            <p className="forgot-password text-center">
              {(fetching_login)
                ? ("LOADING...")
                : ("")}
            </p>
            <h3 className="text-center">{toogleUser}</h3>
            <div className="form-group">
              <label>Email address</label>
              <input
                disabled={logged}
                type="email"
                name="email"
                onChange={handleInputChange}
                value={user.email}
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                disabled={logged}
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter 8 digits password"
              />
            </div>
            <div className="form-group">
              <label> Confirm Password</label>
              <input
                disabled={logged}
                type="password"
                name="repeatPassword"
                value={user.repeatPassword}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Confirm 8 digits password"
              />
              <p className="forgot-password text-center">
                {`Forgot Password `}
                <a href="#" onClick={handleResetPass}>
                  sent email
                </a>
              </p>
            </div>
            <div className="text-center">
              <button
                disabled={logged}
                onClick={handleSubmitSignUp}
                className="btn btn-primary w-80 mt-3 mb-3"
              >
                {toogleUser}
              </button>
            </div>
            <p className="forgot-password text-center">
              {toogleUser === "Sign In"
                ? "Need Register?"
                : "Already Register?"}{" "}
              <a href="#" onClick={handleToogle}>
                {toogleUser === "Sign In" ? "sign up" : "sign in"}
              </a>
            </p>
            {logged || screenWidth < 600 ? (
              <></>
            ) : (
              <p className="forgot-password text-center">
                {`Login with `}
                <a href="#" onClick={handleGoogleLogin}>
                  Google Account
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

function mapStateToProps(state) {
  return {
    logged: state.userLogged,
    error_login: state.error_login,
    fetching_login: state.fetching_login
  };
}

export default connect(mapStateToProps, {
  doSignUpwithEmailAndPassword,
  doSignInwithEmailAndPassword,
  doGoogleLoginAction,
  resetLogin,
  doResetPasswordByEmail
})(Signup);
