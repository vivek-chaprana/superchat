import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import Exit from '../assets/right-from-bracket.svg'
import styled from 'styled-components'

const Box = styled.div`
margin: 1rem 5% 1rem 0;

  img{
    filter: invert(1);
  }
  img:hover{
    filter: invert(0.8);
    transform: scale(1.1);
  }
`

function LogOut() {


  return (
    <Box onClick={() =>signOut(auth)}>
    <img  width="40px" src={Exit} alt="" />  
    </Box>
  )
}

export default LogOut 