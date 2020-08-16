import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { storage, db } from "./firebase";
import firebase from "firebase";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      /*target the first files you select fro dir*/
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
      let uploadTask;
      uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        /*progress function,,,*/
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside database
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
              setCaption("");
            setImage(null);

          });
      }
    );
  };

  return (
    <div>
      {/*i want to have*/}


      {/*progress bar*/}
      <progress value={progress} max="100" />
        {/*Caption input*/}
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={event => setCaption(event.target.value)}
        value={caption}
      />
        {/*file picker*/}
        <input type="file" onChange={handleChange} />
        {/*post button*/}
        <Button onChange={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
