import React from 'react'
import {auth} from  '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

import SignIn from './SighIn'
import LogOut from './LogOut'
import styled from 'styled-components'
import MsgIco from '../assets/messages.svg' 

const Nav = styled.div`
  display: felx;
  color:white;
  width:100vw;
  justify-content:space-between;
  align-items:center;
  background-color:grey;
  font-family : monospace;

  a{
    text-decoration:none;
    color:inherit;
  }
  h1:hover { 
    opacity:.7;
  }

  @media (max-width:600px){
    width: 100vw;
    
  }
`

const Tittle = styled.a`
  margin: 0 0 0 5%;
  display: flex;
  img{
    width:2rem;
    filter:invert(1);
    margin-left:.3rem;
  }
  @media (max-width:480px){
    h1{
    font-size:1rem;
  }
  }
`


function Navbar() {
    const [user] = useAuthState(auth);
  return (
    <Nav >
    <Tittle href='/'>
    <h1>Superchat</h1>
    <img src={MsgIco} alt="" />
    </Tittle>
    {user? <LogOut /> : <SignIn />}
    </Nav>
  )
}

export default Navbar