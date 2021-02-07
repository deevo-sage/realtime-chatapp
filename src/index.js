import React from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";
import { auth, googleauthprovider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
require("./index.css");
const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="main">
      {!user && (
        <div className="signin-box">
          <button
            className="signin-button"
            onClick={() => {
            auth.signInWithRedirect(googleauthprovider);
            }}
          >
            Signin with google
          </button>
        </div>
      )}{" "}
      {user && (
        <div className="box">
          <Sidebar uid={user.uid} />

          <Router style={{ flex: 1 }}>
            <Chat path="/rooms/:roomID" />
          </Router>
        </div>
      )}
    </div>
  );
};

render(<App />, document.getElementById("root"));
