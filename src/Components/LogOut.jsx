import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import styled from "styled-components";
import logo from "../assets/messages.svg";

const Box = styled.div`
  width: 22%;
  margin-right: 10rem;

  @media (max-width: 600px) {
    width: auto;
    margin-right: 1rem;
  }
`;

const Div1 = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  font-size: 0.9rem;
  font-weight: 400;

  & p:hover {
    opacity: 0.8;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    border-radius: 50%;
    margin-left: 1rem;
  }

  @media (max-width: 600px) {
    p {
      display: none;
      margin-right: 0;
    }
  }
`;
const Div2 = styled.div`
  width: inherit;
  border: 2px solid rgba(255, 255, 255,0.5)  ;
  display: ${(props) => (props.display ? "block" : "none")};
  position: absolute;
  z-index: 1;
  background-color: #252525;
  a {
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
    opacity: 0.7;
    transform: scale(1.05);
  }
  a:active {
    transform: scale(0.9);
  }

  @media (max-width: 600px) {
    width: 80%;
    right: 0;

    a {
      opacity: 0.9;
      text-decoration: underline;
    }
  }
`;
const SignOutDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  p {
    cursor: pointer;
  }
  p:hover {
    text-decoration: underline;
    opacity: 0.7;
    transform: scale(1.05);
  }
  p:active {
    transform: scale(0.9);
  }

  @media (max-width: 600px) {
    p {
      opacity: 0.9;
    }
  }
`;

const Brand = styled.span`
  display: flex;
  align-items: center;
  font-size: 16px;
  cursor: default;

  img {
    filter: invert(1);
    width: 18px;
    margin-left: 0.2rem;
  }
`;

const Div3 = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  padding: 1rem;
`;

const DetailsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ImgDiv = styled.div`
  margin-right: 1rem;
  img {
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
`;

function LogOut() {
  const [display, setDisplay] = useState(false);
  const name = auth.currentUser.displayName;
  const email = auth.currentUser.email;
  const image = auth.currentUser.photoURL;

  console.log(auth.currentUser);

  return (
    // <Box >
    <Box>
      <Div1 onClick={() => setDisplay(!display)}>
        <p>Google Account &nbsp; | &nbsp;</p>
        <span>
          <p>{name}</p>
          <img width="35" src={image} alt="User" />
        </span>
      </Div1>
      <Div2 display={display}>
        <SignOutDiv>
          <Brand>
            Superchat <img src={logo} alt="" />{" "}
          </Brand>
          <p onClick={() => signOut(auth)}>Sign Out</p>
        </SignOutDiv>
        <Div3>
          <ImgDiv>
            <img src={image} alt="User" />
          </ImgDiv>
          <DetailsDiv>
            <h3>{name}</h3>
            <p>{email}</p>
            <a href="https://aboutme.google.com">My Google Account</a>
          </DetailsDiv>
        </Div3>
      </Div2>
    </Box>
  );
}

export default LogOut;
