import React, { useEffect } from "react";
import { useState } from "react";
import "./style.css";
import { SessionContext } from "../SessionProvider";

export function Login() {
  const { loginStatus, setLoginStatus, username, setUsername, setUserCreate } =
    React.useContext(SessionContext);
  const [showLogin, setShowLogin] = useState(false);

  const login = () => {
    // show the login form
    setShowLogin(!showLogin);
  };

  const logout = async () => {
    try {
      const response = await fetch(
        "https://cis4250w24-03.socs.uoguelph.ca/api/sessions/logout.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username: username }),
        }
      );
      const data = await response.json();
      if (data !== "Cya!") {
        console.log(data);
        // sleep for 1 second
        await new Promise((r) => setTimeout(r, 2000));
        // set the login status
        setLoginStatus(!loginStatus);
        // reload the page
        location.reload();
      } else {
        setUsername("");
        // set the login status
        setLoginStatus(!loginStatus);
        // reload the page
        location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const verify = async () => {
    try {
      const response = await fetch(
        "https://cis4250w24-03.socs.uoguelph.ca/api/sessions/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username: username }),
        }
      );

      const data = await response.json();

      if (data["status"] === "new") {
        setUserCreate(true);
      } else {
        setUserCreate(false);
      }

      setLoginStatus(!loginStatus);
      setShowLogin(!showLogin);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loginStatus ? (
        <button id="logout" className="top-right-button" onClick={logout}>
          Logout
        </button>
      ) : (
        <button id="login" className="top-right-button" onClick={login}>
          Login
        </button>
      )}

      {showLogin ? (
        <>
          <div id="login-form">
            <h1>What should I call you?</h1>
            <input
              id="input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button id="submit" onClick={verify}>
              Login
            </button>
          </div>

          <div id="login-form-background" onClick={login}></div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;
