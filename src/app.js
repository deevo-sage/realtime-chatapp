import React, { useEffect, useState, useRef } from "react";
import { render } from "react-dom";
import firebase, { auth, firestore, googleauthprovider } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
require("./app.css");
const Appfunction = () => {
  const [user] = useAuthState(auth);
  const [searchval, setsearchval] = useState("");
  const [searched, setsearched] = useState(false);
  const searchuser = (e) => {
    e.preventDefault();
const {uid,photoURL,displayName}=auth.currentUser
    firestore
      .collection("users")
      .doc(searchval)
      .get((snap) => {
        if (snap.exists) {
          const user2=snap.data();
          setsearched(true);
          firestore
            .collection("users")
            .doc(uid)
            .collection("chats")
            .add({user1:{uid,photoURL,displayName},user2:{uid:user2.uid,photoURL:user2.photoURL,displayName:user2.name}});
        }
            firestore
            .collection("users")
            .doc(user2.uid)
            .collection("chats")
            .add({user1:{uid,photoURL,displayName},user2:{uid:user2.uid,photoURL:user2.photoURL,displayName:user2.name}});
        
      });
  };
  return (
    <div className="App">
      <header>
        <p>Firebase chatroom</p>
        your id: <p>{auth.currentUser && auth.currentUser.uid}</p>
        <form className="input-form" onSubmit={searchuser}>
          <input
            className="input-text"
            type="text"
            value={searchval}
            onChange={(e) => {
              setsearchval(e.target.value);
            }}
          />
          <button type="submit">👀</button>
        </form>
        <Signout />
      </header>
      {searched ? (
        <section>{console.log("yay bruh user found")}</section>
      ) : (
        <section>{user ? <ChatList /> : <Signinwithgoogle />}</section>
      )}
    </div>
  );
};
const ChatList = () => {
  const chatsref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("chats");
  const query = chatsref.orderBy("createdAt").limit(25);
  const [chats] = useCollectionData(query, { idField: "id" });
  return (
    <>
      {chats && chats.map((chat) => {
        return <ChatButton chat={chat} />;
      })}
    </>
  );
};

const ChatButton = ({ chat }) => {
  const { user1, user2 } = chat;
  return (
    <div>
      <img
        src={
          auth.currentUser.uid === user1.uid ? user1.photoURL : user2.photoURL
        }
      />

      <p>{auth.currentUser.uid === user1.uid ? user1.name : user2.name}</p>
    </div>
  );
};
const Chatroom = () => {
  const dummy = useRef();
  const messageref = firestore.collection("messages");
  const query = messageref.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [inputtext, setinputtext] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    console.log(photoURL);
    await messageref.add({
      text: inputtext,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setinputtext("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((message) => {
            return <Chatmessage key={message.id} message={message} />;
          })}
        <div ref={dummy}></div>
      </main>
      <form className="input-form" onSubmit={sendMessage}>
        <input
          className="input-text"
          value={inputtext}
          onChange={(e) => {
            setinputtext(e.target.value);
          }}
        />
        <button type="submit">👀</button>
      </form>
    </>
  );
};

const Chatmessage = (props) => {
  const { text, uid, photoURL } = props.message;
  const messageclass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageclass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
};

const Signinwithgoogle = () => {
  return (
    <button
      onClick={async () => {
        await auth.signInWithPopup(googleauthprovider);
        console.log(auth.currentUser.uid);
        firestore
          .collection("users")
          .doc(auth.currentUser.uid)
          .get()
          .then((snap) => {
            if (snap.exists) {
            } else {
              console.log("adding");
              firestore.collection("users").doc(auth.currentUser.uid).set({
                name: auth.currentUser.displayName,
                photoURL: auth.currentUser.photoURL,
                uid: auth.currentUser.uid,
              });
            }
          });
      }}
    >
      Sign in
    </button>
  );
};
const Signout = () => {
  return (
    auth.currentUser && (
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign Out
      </button>
    )
  );
};

render(<Appfunction />, document.getElementById("root"));
