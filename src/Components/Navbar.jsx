import React from 'react'
import {auth} from  '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

import SignIn from './SighIn'
import LogOut from './LogOut'
import styled from 'styled-components'


const Nav = styled.div`
  display: felx;
  color:white;
  width:100vw;
  justify-content:space-between;
  align-items:center;
  background-color:grey;
  font-family : monospace;

  @media (max-width:600px){
    
  }
`

const Tittle = styled.h1`
  margin: 0 0 0 5%;
`


function Navbar() {
    const [user] = useAuthState(auth);
  return (
    <Nav >
    <Tittle>Tittle</Tittle>
    {user? <LogOut /> : <SignIn />}
    </Nav>
  )
}

export default Navbar