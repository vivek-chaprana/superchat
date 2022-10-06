import React, { useState, useRef } from "react";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Plane from "../assets/paper-plane.svg";
import imgLogo from "../assets/image.svg";
import styled from "styled-components";
import Cancel from "../assets/cancel.png";

const FormDiv = styled.div`
  display: flex;
  @media (max-width:480px){
    input {
      font-size:.8rem;
    }
  }
`;
const WrapOfPopUp = styled.div`
  display: ${(props) => (props.display ? "flex" : "none")};
  z-index: 10;
  background-color: rgba(250, 250, 250, 0.4);
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  bottom: 0;
`;
const PopUpImage = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  width: 60%;
  height: 70%;
  background-color: #252525;
  border: 1px solid black;

  @media (max-width: 600px) {
    width: 90%;
    height: 80%;
  }
`;

const CenterImageDiv = styled.div`
  width: 100%;
  height: 80%;
  background-color: #252525;
  display: flex;
  justify-content: center;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: scale-down;
    overflow: hidden;
  }
`;
const CrossBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  img {
    margin: 5px 5px 0 0;
    cursor:pointer;
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
    margin: 5px 0;
  }
`;

const ImageLogo = styled.div`
  margin: auto 0 auto 1rem;
  cursor : pointer;
  img {
    width: 40px;
  }
  img:hover{
    opacity: .9;
  }
  img:active{
    transform: scale(0.95);
  }
  @media (max-width:480px){
    img{
      width: 20px;
    }
  }
`;
const PlaneLogo = styled.div`
margin: .25rem 1rem .25rem 0;
img {
  width: 40px;
}
img:hover{
    opacity: .9;
  }
  img:active{
    transform: scale(0.95);
  }
@media (max-width:480px){
  img{
    width: 20px;
  }
}
`;

const SendMessage = () => {
  const [isfile, setisFile] = useState(false);
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

  return (
    <>
      <WrapOfPopUp display={display ? 1 : undefined}>
        <PopUpImage>
          <CrossBtn>
            <img
              width="36px"
              alt=""
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
              className={btnActiveClass}
            >
              <span>Send</span>
              <div className="success">
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
        <FormDiv display={display ? 1 : undefined} className="formDiv">
          <form onSubmit={isfile ? handleImageUpload : sendMessage}>
            <input
              ref={hiddenFileInput}
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              onChange={checkImg}
            />
            <ImageLogo>
              <img
                className="LogoImages" 
                onClick={(e) => {
                  hiddenFileInput.current.click();
                }}
                src={imgLogo}
                alt=""
              />
            </ImageLogo>

            <input
              className="inputMsg"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Message Here"
            />
            <PlaneLogo className="submitBtn">
              <button ref={submitBtn} type="submit">
                <img
                  className="LogoImages"
                  src={Plane}
                  alt=""
                />
              </button>
            </PlaneLogo>
          </form>
        </FormDiv>
      </div>
    </>
  );
};

export default SendMessage;
