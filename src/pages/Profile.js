/*
This file represents the user profile page. It allows users to view and edit their profile information, including their avatar image. 
The page retrieves user data from the Firebase Firestore database and displays it on the page. 
Users can upload a new avatar image,
 which is stored in Firebase Storage and the image URL is updated in the Firestore database. 
 Users can also delete their current avatar image, which will remove the image from Firebase Storage 
 and update the Firestore database accordingly.
*/

import React, { useState, useEffect } from "react";
import Camera from "../components/svg/Camera";
import Img from "../image1.jpg";
import {storage, db, auth} from "../firebase";
import {ref, getDownloadURL, uploadBytes, deleteObject} from "firebase/storage";
import {getDoc, doc, updateDoc} from "firebase/firestore"
import Delete from "../components/svg/Delete";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [img, setImg] = useState('');  // state to store the selected image file
  const [user, setUser] = useState();  // state to store the user data retrieved from Firestore
  const navigate = useNavigate();
  useEffect(() => {
    // retrieve user data from Firestore
    getDoc(doc(db, "users", auth.currentUser.uid)).then(docSnap =>{
      if(docSnap.exists){
        setUser(docSnap.data());
      }
    });
    // upload new avatar image to Firebase Storage and update Firestore database
    if(img){
      const uploadImg = async () => {
        const imgRef = ref(
          storage, 
          `avatar/${new Date().getTime()} - ${img.name}`
          );

          try {
            if(user.avatarPath){
              await deleteObject(ref(storage, user.avatarPath));
            }
            const snap = uploadBytes(imgRef, img);
            const url = await getDownloadURL(ref(storage, (await snap).ref.fullPath));
  
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
              avatar: url,
              avatarPath: (await snap).ref.fullPath,
            });
            console.log(url);
            setImg("");            
          } catch (err) {
            console.log(err.message);
          }
        };
        uploadImg();
      }
  }, [img]);
/*
This code defines the deleteImage function, which is called when the user clicks on the delete button for their avatar image. 
The function prompts the user to confirm the deletion, and if confirmed, deletes the image from Firebase Storage and updates 
the Firestore database accordingly. 
The code also defines the Profile component, which displays the user's profile information, 
including their avatar image. 
The component retrieves user data from Firestore and displays it on the page.
 Users can upload a new avatar image, which is stored in Firebase Storage and the image URL is updated in the Firestore database. 
 Users can also delete their current avatar image, which will remove the image from Firebase Storage and update 
 the Firestore database accordingly.
*/
  const deleteImage = async () =>{
    try {
      const confirm = window.confirm('Delete avatar?'); // prompt user to confirm deletion
        if(confirm){
          await deleteObject(ref(storage, user.avatarPath)); // delete image from Firebase Storage
            await updateDoc(doc(db, "users", auth.currentUser.uid), { // update Firestore database
            avatar: "",
            avatarPath: "",
          });
          navigate("/", { replace: true }); // navigate to home page
      }
      
    } catch (error) {
      console.log(error.message); // log any errors
    }
  }

/* 
This code uses conditional rendering to check if the `user` object exists. 
If it does, it renders a `section` element that contains two `div` elements.
The first `div` element has a class of `profile_container` and contains an `img` element that displays the user's avatar image. 
If the user does not have an avatar image, it displays a default image.
The `img` element has a `src` attribute that is set to the `user.avatar` value if it exists, otherwise it is set to the `Img` variable.
The second `div` element has a class of `text_container` and displays the user's name, email, and the date they joined.
The `h3` element displays the user's name, the `p` element displays their email, and the `small` element 
displays the date they joined.
The code also includes an `input` element of type `file` that allows users to select a new avatar image. 
When a user selects a new image, the `onChange` event handler updates the `img` state with the selected file.
The `deleteImage` function is called when the user clicks on the delete button for their avatar image. 
The function prompts the user to confirm the deletion, and if confirmed, deletes the image from Firebase Storage 
and updates the Firestore database accordingly.
If the `user` object does not exist, the code returns `null`. 
*/
  return user ?(
    <section>
      <div className="profile_container">
        <div className="img_container">
        <img src={user && user.avatar || Img} alt="avatar" />
          <div className="overlay">
            <label htmlFor="photo">
              <Camera />
            </label>
            {user.avatar ? <Delete deleteImage={deleteImage}/> : null }
            <input type="file" accept='image/*' style={{display: "none"}} id="photo" onChange={e => setImg(e.target.files[0])}/>
          </div>
        </div>
      </div>

      <div className="text_container">
        <h3>{user && user.name}</h3>
        <p>{user && user.email}</p>
        <hr />
        <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
      </div>
    </section>
  )    :null;
}

export default Profile;