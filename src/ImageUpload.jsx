import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { storage } from "./firebase";

function ImageUpload(props) {
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
    const uploadTask = storage.ref("images/${image.name}").put(image);
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
        //complete function
        storage.ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url=>{
                //post image inside db
                db.collection("posts").add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    caption:caption,
                    imageUrl:url,
                    username:username,
                })
            })
      }
    );
  };

  return (
    <div>
      {/*i want to have*/}
      {/*Caption input*/}
      {/*file picker*/}
      {/*post button*/}
      <input
        type="text"
        placeholder="Enter a caption..."
        onClick={handleChange}
      />
      <input type="file" onClick={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
