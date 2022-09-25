import './App.css';

//firebase
// import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {auth} from './firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import Navbar from './Components/Navbar';
import Chat from './Components/Chat';
import styled from 'styled-components';
import NotSignIn from './Components/NotSignIn/NotSignIn';

//This is just a comment.

const Box = styled.div`
`


function App() {

  const [user] = useAuthState(auth);
  return (
    <Box >
    <Navbar />
    {user? <Chat /> : <NotSignIn />}
    </Box>
  );
}

export default App;
