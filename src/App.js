import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot } from './firebase';
import Post from './components/Post';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
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

  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src=""
          alt=""
        />
      </div>
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
