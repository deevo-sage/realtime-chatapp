import React, { useState, useEffect } from "react";
require("./sidebar.css");
import { Search, Dots, Msg, Back } from "../svgs";
import firebase, { auth, firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "@reach/router";
//https://avatars.dicebear.com/api/jdenticon/${seed}.svg
const Sidebar = ({ setpressed, uid }) => {
  const databaseref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("rooms");
  const query = databaseref.orderBy("timeStamp",'desc').limit(10);
  const [rooms] = useCollectionData(query, { idField: "id" });
  const [search, setsearch] = useState("");
  const [searched, setsearched] = useState(false);
  const [searchedroom, setsearchedroom] = useState([]);

  useEffect(() => {
    if (search != "") {
      firestore
        .collection("rooms")
        .doc(search)
        .get()
        .then((snap) => {
          if (snap.exists) {
            var data = snap.data();
            data.id = snap.id;
            setsearchedroom(data);
          } else {
            alert("room not found");
            setsearched(false);
          }
        });
    }
  }, [searched]);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          className="avatar"
          src={`https://avatars.dicebear.com/api/avataaars/${uid}.svg`}
        />
        <div className="header-svgs">
          <span
            onClick={() => {
              setpressed(true);
            }}
          >
            <Msg />
          </span>
          <span
            onClick={() => {
              auth.signOut();
            }}
          >
            <Dots />
          </span>
        </div>
      </div>
      <div className="sidebar-search">
        <span
          onClick={() => {
            setsearched(true);
          }}
        >
          <Search />
        </span>

        <input
          className="search"
          placeholder="search for room"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
      </div>
      <div className="sidebar-chats">
        <h3>Chats</h3>
        {!searched ? (
          <div className="Chats">
            {rooms &&
              rooms.map((item) => {
                return (
                  <Chatbutton
                    key={item.id}
                    seed={item.id}
                    chatname={item.name}
                  />
                );
              })}
          </div>
        ) : (
          <div className="Chats">
            <span
              onClick={() => {
                setsearched(false);
              }}
            >
              <Back />
            </span>
            <span
              onClick={() => {
                setsearched(false);
                
              }}
            >
              <Chatbutton
                key={searchedroom.id}
                seed={searchedroom.id}
                chatname={searchedroom.name}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
const Chatbutton = ({ seed, chatname, lastmessage}) => {
    const addtomyroom = () => {
      firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("rooms")
        .doc(seed)
        .set({
          name: chatname,
          uid: seed,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    };
  return (
      <Link to={`/rooms/${seed}`} onClick={addtomyroom}>
        <div className="chatbutton">
          <img
            className="avatar"
            src={`https://avatars.dicebear.com/api/jdenticon/${seed}.svg`}
          />
          <div className="chatbutton-text">
            <p className="chat-name">{chatname}</p>
            <p className="lastmsg">{lastmessage}</p>
          </div>
        </div>
      </Link>
  );
};
const MakeRoom = ({ setpressed, uid }) => {
  const [roomname, setroomname] = useState("");
  const [roomnumber, setroomnumber] = useState("");
  const makeroom = (e) => {
    e.preventDefault();
    firestore
      .collection("room")
      .doc(roomnumber)
      .get()
      .then((snap) => {
        if (snap.exists) {
          alert("Room Code taken");
        } else {
          firestore.collection("rooms").doc(roomnumber).set({
            name: roomname,
            uid: roomnumber,
          });
          firestore
            .collection("users")
            .doc(uid)
            .collection("rooms")
            .doc(roomnumber)
            .set({
              name: roomname,
              uid: roomnumber,
              timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          setpressed(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          className="avatar"
          src={`https://avatars.dicebear.com/api/jdenticon/${uid}.svg`}
        />
        <div className="header-svgs">
          <span
            onClick={() => {
              setpressed(false);
            }}
          >
            <Back />
          </span>
          <span
            onClick={() => {
              auth.signOut();
            }}
          >
            <Dots />
          </span>
        </div>
      </div>

      <div className="sidebar-chats">
        <h3>Make a Room</h3>
        <form className="make-room" onSubmit={makeroom}>
          <input
            placeholder="Room Name"
            value={roomname}
            onChange={(e) => {
              setroomname(e.target.value);
            }}
          ></input>
          <input
            placeholder="Room Code"
            value={roomnumber}
            onChange={(e) => {
              setroomnumber(e.target.value);
            }}
          ></input>
          <button type="submit" className="make-room-button">
            Create
          </button>
          <p>
            =focusin
            
            room icon is randomly generated by room Code (credits:-{" "}
            <a href="https://avatars.dicebear.com/" style={{ color: "green" }}>
              dicebear
            </a>
            )
          </p>
          <img
            className="avatar"
            src={`https://avatars.dicebear.com/api/jdenticon/${roomnumber}.svg`}
          />
        </form>
      </div>
    </div>
  );
};
const Sidebarcont = ({ uid }) => {
  const [pressed, setpressed] = useState(false);
  return (
    <>
      {!pressed ? (
        <Sidebar setpressed={setpressed} uid={uid} />
      ) : (
        <MakeRoom setpressed={setpressed} uid={uid} />
      )}
    </>
  );
};
export default Sidebarcont;
