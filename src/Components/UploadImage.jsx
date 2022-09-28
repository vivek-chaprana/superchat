import { useState } from "react";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import imgLogo from "../assets/image.svg";
import styled from "styled-components";



const Box = styled.div`
  img{
    filter: invert(1);
    width:30px;
  }
`

const Wrap1 = styled.div`
display : ${props => props.display ? "block" : "none"};
border : 1px solid lime;

`

const Wrap2 = styled.div`
`





function UploadImage() {
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);
  const [display, setDisplay] = useState(false);

  const handleSubmit = (e) => {
    //Prevent Reload
    e.preventDefault();
    //Check if file selected
    const file = e.target[0]?.files[0];

    // console.log(file);
    // console.log("e now");
    // console.log(e)

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
          setImgUrl(downloadURL);
          // console.log(downloadURL);
        });
      }
    );
  };

  return (
    <Box>
      <Wrap1 display={display} >
        <form className="form" onSubmit={handleSubmit}>
          <input type="file" accept="image/*" />
          <button type="submit">Upload</button>
        </form>
        {!imgUrl && (
          <div className="outerbar">
            <div className="innerbar" style={{ width: `${progresspercent}%` }}>
              {progresspercent}%
            </div>
          </div>
        )}
        {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
      </Wrap1>

      <Wrap2>
        <img  onClick={() => setDisplay(!display)}   src={imgLogo} alt="" />
      </Wrap2>
    </Box>
  );
}
export default UploadImage;
