// @flow
import React, { useState, useEffect } from "react";
import { Dots, Send } from "../svgs";
import {
  useCollectionData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import firebase, { firestore, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

require("./chat.css");
const Chat = (props) => {
  const [user] = useAuthState(auth);
  const [text, settext] = useState("");
  const seed = props.roomID;
  const Chatname = "Chat name";
  const dbref = firestore.collection("rooms").doc(seed);
  const [roomdata] = useDocumentDataOnce(dbref, { idField: "id" });
  const query = dbref.collection("messages").orderBy("createdAt", "desc");
  const [messages] = useCollectionData(query, { idField: "id" });

  const sendmessage = (e) => {
    e.preventDefault();
    firestore.collection("rooms").doc(seed).collection("messages").add({
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name: user.displayName,
      uid: user.uid,
    });
    settext("");
    setTimeout(200)
  };
  return (
    <div className="chat">
      <div className="chat-header">
        <div>
          <img
            className="avatar"
            src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`}
          />
          {roomdata && <p>{roomdata.name + " #" + seed}</p>}
        </div>
        <Dots />
      </div>
      <div className="chat-msgs">
        {messages &&
          messages.map((message, key) => {
            if (key != 0 && key != messages.length - 1)
              return (
                <Message
                  message={message}
                  key={"message" + message.id}
                  id={user.uid}
                  createdAt={message.createdAt}
                  previd={messages[key + 1].uid}
                />
              );
            else if (key === 0 && key != messages.length - 1)
              return (
                <Message
                  message={message}
                  key={"message" + message.id}
                  id={user.uid}
                  createdAt={message.createdAt}
                  previd={messages[key + 1].uid}
                />
              );
            else {
              return (
                <Message
                  message={message}
                  key={"message" + message.id}
                  id={user.uid}
                  createdAt={message.createdAt}
                  previd="123"
                />
              );
            }
          })}
      </div>
      <div className="chat-input">
        <span>😉</span>
        <form onSubmit={sendmessage} className="msg-form">
          <input
            placeholder="type your message here"
            className="msg-input"
            value={text}
            onChange={(e) => {
              settext(e.target.value);
            }}
          />
          <button type="submit" className="msg-button">
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
};
const Message = ({ message, id, previd,createdAt }) => {
  const [createdAt2,setcreatedAt]=useState(null)
  const { text, uid, name } = message;
  useEffect(() => {
setcreatedAt(message.createdAt)
  },[]);
  if(createdAt)
  {
    const date_ob = new Date(createdAt.toDate());
    var hours = ("0" + date_ob.getHours()).slice(-2);
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);
  }
  return (
    <div className={`msg-cont ${uid === id ? "sent" : "recieved"}`}>
      <div className={`message ${uid === id ? "msg-sent" : "msg-recieved"}`}>
        {previd != uid && previd != null && <p className="name">{name}</p>}
        <p className="text">{text}</p>
        {createdAt && (
          <p className="createdAt">{hours + ":" + minutes + ":" + seconds}</p>
        )}
      </div>
    </div>
  );
};
export default Chat;
