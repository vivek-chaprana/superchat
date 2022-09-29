import React, { useState, useRef } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { Plane } from "./Svg";
import imgLogo from "../assets/image.svg";
import styled from "styled-components";
import Cancel from "../assets/cancel.png";

const FormDiv = styled.div`
  display: ${(props) => (props.display ? "none" : "flex")};
`;
const WrapOfPopUp = styled.div`
  display: ${(props) => (props.display ? "flex" : "none")};
  z-index: 10;
  background-color: transparent;
  justify-content: center;
`;
const PopUpImage = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 50%;
  height: 60%;
  border: 1px solid cyan;
  background-color: #252525;

  @media (max-width: 600px) {
    width: 95%;
    height: 90%;
  }

`;

const CenterImageDiv = styled.div`
  width: 100%;
  background-color: #252525;
  display: flex;
  justify-content: center;
`;

const ImgDiv = styled.div`
  height:20rem;
  


  img {
    height: 100%;
    width: auto;
    object-fit: cover;
    overflow: hidden;
    border: 2px dotted black;
  }
  ${'' /* @media (max-width:1200px){
    height:17rem;

  }
  @media (max-width:1000px){
    height:14.5rem;

  }
  @media (max-width:800px){
    height:11rem;

  }
  @media (max-width:480px){
    height:11rem;

  }
  @media (max-width:340px){
    height:10rem;

  } */}
`;
const CrossBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  img {
    margin: 1rem 1rem 0 0;
  }
  img:hover {
    transform: scale(1.1);
  }
  img:active {
    transform: scale(0.9);
  }
`;
const SubmitBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    margin: 1rem 0;
  }
`;

const SendMessage = () => {
  const [isfile, setisFile] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const [input, setInput] = useState("");
  const [phile, setPhile] = useState();
  const [display, setDisplay] = useState(false);
  const [btnActiveClass, setBtnActiveClass] = useState();

  const handleImageUpload = async (e) => {
    const { uid, displayName } = auth.currentUser;
    const photo = auth.currentUser.photoURL;
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
      },
      //if upload fails
      (error) => {
        alert(error);
      },
      //To get url
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //Sending image
          addDoc(collection(db, "messages"), {
            imageURL: downloadURL,
            name: displayName,
            photo,
            uid,
            timestamp: serverTimestamp(),
          });
        });
      }
    );
    setisFile(false);
  };

  //Send Message function
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input === "") {
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

  //Check if file selected
  const checkImg = (e) => {
    const file = e.target.files[0];
    file ? setisFile(true) : setisFile(false);
    setPhile(URL.createObjectURL(e.target.files[0]));
    setDisplay(true);
  };

  //Hidden file input
  const hiddenFileInput = useRef(null);
  const submitBtn = useRef(null);
  console.log("display : ", display);

  return (
    <>
      <WrapOfPopUp display={display}>
        <PopUpImage>
          <CrossBtn>
            <img
              width="36px"
              src={Cancel}
              onClick={() => {
                setPhile();
                setDisplay(false);
              }}
            />
          </CrossBtn>
          <CenterImageDiv>
            <ImgDiv>
              <img src={phile} alt="" />
            </ImgDiv>
          </CenterImageDiv>
          <SubmitBtn>
            <button
              onClick={(e) => {
                setBtnActiveClass("is_active");
                setDisplay(false);
                submitBtn.current.click();
                setTimeout(() => {
                  setBtnActiveClass("");
                }, 1000);
              }}
              id="button"
              class={btnActiveClass}
            >
              <span>Send</span>
              <div class="success">
                <svg
                  viewBox="0 0 29.756 29.756"
                  style={{
                    enableBackground: "new 0 0 29.756 29.756",
                  }}
                  xmlSpace="preserve"
                >
                  <path d="m29.049 5.009-.859-.858a2.434 2.434 0 0 0-3.434 0L10.172 18.737l-5.175-5.173a2.433 2.433 0 0 0-3.432.001l-.858.857a2.437 2.437 0 0 0 0 3.433l7.744 7.752a2.437 2.437 0 0 0 3.433 0L29.049 8.442a2.438 2.438 0 0 0 0-3.433z" />
                </svg>
              </div>
            </button>
          </SubmitBtn>
        </PopUpImage>
      </WrapOfPopUp>
      <div className="outerFormDiv">
        <FormDiv display={display} className="formDiv">
          <form onSubmit={isfile ? handleImageUpload : sendMessage}>
            <input
              ref={hiddenFileInput}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={checkImg}
            />
            <div>
              <img
                onClick={(e) => {
                  hiddenFileInput.current.click();
                }}
                width="40px"
                src={imgLogo}
                alt=""
                style={{ filter: "invert(0.9)" }}
              />
            </div>

            <input
              className="inputMsg"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Message Here"
            />
            <div className="submitBtn">
              <button ref={submitBtn} type="submit">
                <Plane
                  width={window.innerWidth < 481 ? 20 : 40}
                  fill="#FAFAFA"
                />
              </button>
            </div>
          </form>
        </FormDiv>
      </div>
    </>
  );
};

export default SendMessage;
