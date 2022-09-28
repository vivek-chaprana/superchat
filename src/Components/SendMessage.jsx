import React, { useState } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Plane } from "./Svg";


const SendMessage = () => {
  const [isfile, setisFile] = useState(false);

  //For image
  const [progresspercent, setProgresspercent] = useState(0);
  const [input, setInput] = useState("");
  // const [display, setDisplay] = useState(false);

  const handleImageUpload = async (e) => {


    const { uid, displayName } = auth.currentUser;
    const photo = auth.currentUser.photoURL;


    console.log("HandleImageUpload called");
    //Prevent Reload
    e.preventDefault();
    //Check if file selected
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);


    //To display upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
        console.log("progress  : ",progress);
      },
      //if upload fails
      (error) => {
        alert(error);
      },
      //To get url
      () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          addDoc(collection(db, "messages"), {
            imageURL: downloadURL,
            name: displayName,
            photo,
            uid,
            timestamp: serverTimestamp(),
          });
          console.log("download url  :L   " + downloadURL);
        });
      }
    );



    setisFile(false);
  };

  //Send Message

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "" ) {
      alert("Please Enter a valid message");
      return;
    }
    const { uid, displayName } = auth.currentUser;
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

  const checkImg = (e) => {
    const file = e.target.files[0];
    file ? setisFile(true) : setisFile(false);
  };

  return (
    <div className="outerFormDiv">
      {/* <Box> */}
      {/* <Wrap1 display={display}> */}
      {/* <form className="form" onSubmit={handleImageUplaod}> */}
      {/* <input type="file" accept="image/*"  /> */}
      {/* <button type="submit">Upload</button> */}
      {/* </form> */}
      {/* {!imgUrl && (
            <div className="outerbar">
              <div
                className="innerbar"
                style={{ width: `${progresspercent}%` }}
              >
                {progresspercent}%
              </div>
            </div>
          )}
          {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />} */}
      {/* </Wrap1> */}

      {/* <Wrap2> */}
      {/* <img onClick={() => setDisplay(!display)} src={imgLogo} alt="" /> */}
      {/* </Wrap2> */}
      {/* </Box> */}

      <div className="formDiv">
        <form onSubmit={isfile ? handleImageUpload : sendMessage}>
          {/* <UploadImage /> */}
          <input type="file" accept="image/*" onChange={checkImg} />

          <input
            className="inputMsg"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Message Here"
          />
          <div className="submitBtn">
            <button type="submit">
              <Plane width={window.innerWidth < 481 ? 20 : 40} fill="#FAFAFA" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMessage;
