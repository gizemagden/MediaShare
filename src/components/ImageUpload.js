import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import {
  ref,
  storage,
  uploadBytesResumable,
  getDownloadURL,
  addDoc,
  collection,
  db,
  serverTimestamp,
} from '../firebase';
function ImageUpload({ username }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  }

  const handleUpload = () => {
    const imagesRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, image);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // show toast!
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, "posts"), {
            timeStamp: serverTimestamp(),
            username: username,
            caption: caption,
            imageURL: downloadURL
          });
          setProgress(0);
          setCaption('');
          setImage(null);
        });
      }
    );
  }

  return (
    <div>
      <progress value={progress} max="100"/>
      <input type="text" value={caption} placeholder="Enter a caption..." onChange={handleCaptionChange} />
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  )
}

export default ImageUpload;
