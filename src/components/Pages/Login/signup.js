import React, { useState } from "react";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../Nav/nav";
import Footer from "../Footer/footer";
import { connect } from "react-redux";
import {
  doSignUpwithEmailAndPassword,
  doSignInwithEmailAndPassword,
  doGoogleLoginAction,
} from "../../Store/actions";

function Signup({
  doSignUpwithEmailAndPassword,
  doSignInwithEmailAndPassword,
  doGoogleLoginAction,
  logged,
}) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [toogleUser, setToogleUser] = useState("Sign Up");

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
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
    if (regex.test(user.email) && user.password.length >= 5) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    if (toogleUser === "Sign Up") {
      doSignUpwithEmailAndPassword(user.email, user.password);
      setUser({ email: "", password: "" });
    } else {
      doSignInwithEmailAndPassword(user.email, user.password);
      setUser({ email: "", password: "" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="div-login-container">
        <div className="login-div">
          <form>
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
                placeholder="Enter password"
              />
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
            {logged ? (
              <></>
            ) : (
              <p className="forgot-password text-center">
                {`Login with `}
                <a href="#" onClick={doGoogleLoginAction}>
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
  };
}

export default connect(mapStateToProps, {
  doSignUpwithEmailAndPassword,
  doSignInwithEmailAndPassword,
  doGoogleLoginAction,
})(Signup);
