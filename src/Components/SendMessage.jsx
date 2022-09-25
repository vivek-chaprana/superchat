import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../firebase";

import {Plane} from './Svg'
const SendMessage = () => {
  const [input, setInput] = useState("");
  console.log()

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please Enter a valid message");
      return;
    }
    const { uid, displayName} = auth.currentUser;
    const photo = auth.currentUser.photoURL;
    await addDoc(collection(db, "messages"), {
      text: input,
      name: displayName,
      photo,
      uid,
      timestamp: serverTimestamp(),
    });
    setInput("");
    
  };

  return (
    <div className="formDiv">

    <form onSubmit={sendMessage}>
      <input
        className="inputMsg"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Message Here"
      />
      <div className="submitBtn" >
      <button type="submit">

      <Plane width="40" fill="#FAFAFA" />
      </button>
      </div>
    </form>
    </div>
  );
};

export default SendMessage;
