import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Sidebar from "./components/sidebar/sidebar";
import Chat from "./components/chat/chat";
import { auth, googleauthprovider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./index.css";
import { useEffect } from "react";
const App = () => {
  const [user, setuser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setuser(user);
    });
  });
  return (
    <div className="main">
      {!user && (
        <div className="signin-box">
          <button
            className="signin-button"
            onClick={() => {
              auth.signInWithPopup(googleauthprovider);
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
            <Chat path="/rooms/:roomID" user={user} />
          </Router>
        </div>
      )}
    </div>
  );
};

render(<App />, document.getElementById("root"));
