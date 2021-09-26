import React, { useState, useEffect } from 'react';
import {
  db,
  collection,
  onSnapshot,
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword
} from './firebase';
import Post from './components/Post';
import './App.css';
import Modal from '@material-ui/core/Modal';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import ImageUpload from './components/ImageUpload';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPosts] = useState([]);
  const [isSignupModalOpened, setIsSignupModalOpened] = useState(false);
  const [isSigninModalOpened, setIsSigninModalOpened] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    onSnapshot(collection(db, "posts"), (d) => {
      const posts = [];
      d.forEach((doc) => {
        posts.push({
          id: doc.id,
          post: doc.data()
        });
      });
      setPosts(posts);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        // User is signed out
      }
    });
    return () => {
      unsubscribe();
    }
  }, []);

  const signup = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
          setUser({...user, displayName: username });
        }).catch((error) => {
          // An error occurred
        });
        setIsSignupModalOpened(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        setIsSigninModalOpened(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className="app">
      {user?.displayName && <ImageUpload username={user.displayName}/>}
      <Modal
        open={isSignupModalOpened}
        onClose={() => setIsSignupModalOpened(false)}
      >
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <Input
              type="text"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              type="pasword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button type="submit" onClick={signup}>
              Sign Up
            </Button>
          </form>
        </Box>

      </Modal>
      <Modal
        open={isSigninModalOpened}
        onClose={() => setIsSigninModalOpened(false)}
      >
        <Box sx={style}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              type="pasword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button type="submit" onClick={signin}>
              Login
            </Button>
          </form>
        </Box>

      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {user ?
        <Button onClick={() => auth.signOut()}>
          Logout
        </Button>
        :
        <>
          <Button onClick={() => setIsSignupModalOpened(true)}>
            Sing Up
          </Button>
          <Button onClick={() => setIsSigninModalOpened(true)}>
            Sing In
          </Button>
        </>
      }
      {posts.length > 0 && posts.map(({ id, post: { username, imageURL, caption } }) => (
        <Post
          key={id}
          username={username}
          imageURL={imageURL}
          caption={caption}
        />
      ))}
    </div>
  );
}

export default App;
