import React, { useState, useContext } from "react";
import { PageHeader, Input, Button } from "antd";
import { Link, navigate } from "@reach/router";
import { storeUserInfoInLocal } from "../utils/utils";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import _ from "lodash";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSingin = () => {
    // console.log("[SignIn > onSignIn]", email, password);
    const payload = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    if (email !== "" && password !== "") {
      //make sign in request
      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHDQU7IHb6UrR23Eb_g6f37tnxPPk3M44",
          payload
        )
        .then((response) => {
          console.log(response);
          const c_userData = _.pick(response.data, [
            "email",
            "expiresIn",
            "idToken",
            "localId",
          ]);
          //store response data in authcontext
          authContext.authenticatedUser = { c_userData };
          authContext.authenticatedUserChange(c_userData);
          //store data in localstorage
          storeUserInfoInLocal(c_userData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    navigate("/posts");
  };

  return (
    <div className="sign-up-container">
      <div className="page-header-container">
        <PageHeader
          style={{ border: "1px solid rgb(235, 237, 240)" }}
          title="SignIn"
        />
      </div>

      <div className="c-post-inputs-container">
        <div className="c-post-input-container">
          <div className="c-post-input-title">Email</div>
          <div className="c-post-input">
            <Input placeholder="Email" onChange={onEmailChange} />
          </div>
        </div>

        <div className="c-post-input-container">
          <div className="c-post-input-title">Password</div>
          <div className="c-post-input">
            <Input.Password
              placeholder="Password"
              onChange={onPasswordChange}
            />
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <div style={{ float: "left" }}>
            <Link to="/sign_up">Do not have Account, Sign Up</Link>
          </div>
          <div className="c-post-input-button clearfix ">
            <Button type="primary" size="large" onClick={onSingin}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
