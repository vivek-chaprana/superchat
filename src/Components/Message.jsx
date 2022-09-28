import React  from "react";
import { auth } from "../firebase";



const Message = ({ message }) => {
  const isUser = message.uid === auth.currentUser.uid;

  return (
    <>
      <div className="centerDiv">
        <div
          className={isUser ? "mine" : "enemy"}
        >
          <div
            className={
              isUser ? "mineMsg" : "enemyMsg"
            }
          >
            <p className="name">{message.name}</p>
            <div
              className={
                isUser
                  ? "myImgAndText"
                  : "enemyImgAndText"
              }
            >
              <img className="profileImg" src={message.photo} alt="" />
              <div
                className={
                  isUser
                    ? "myText text"
                    : "enemyText text"
                }
              >
              {'imageURL' in message ? <img className="photu" src={message.imageURL} alt="[ Failed to load image ]" /> : <p>{message.text}</p>}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
