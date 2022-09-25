import React from 'react'
import {auth} from  '../firebase'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
import GoogleImg from '../assets/google.svg'
import styled from 'styled-components'

const Box = styled.div`
margin: 1% 5% 1% 0;
`

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider)
  // signInWithPopup(auth,provider);
}

const GoogleBtn= styled.div`
display:flex;
border: 1.5px solid white;
padding:1rem;
align-items: center;
justify-content: space-between;
font-size:1rem;
cursor:pointer;


  img{
    filter: invert(1);
    width: 30px;
    margin-right: 1rem;
  }
  &:hover{
    color: black;
    border: 1.5px solid black;
    img{
      filter: invert(0);
    }
  }

  @media (max-width: 600px){
    p{
      display: none;
    }
    img{
      margin:0;
    }

  }
`

function SighIn() {
  return (
    <Box className="signIn">
        <GoogleBtn onClick={googleSignIn} >
          <img src={GoogleImg} alt="" />
          <p>Sign In With Google</p>
        </GoogleBtn>
    </Box>
    
  )
}

export default SighIn   