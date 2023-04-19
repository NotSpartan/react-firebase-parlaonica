
/*
This code exports a functional component called User that takes in props such as user1, user, selectUser, and chat. 
It renders a user’s information such as their name, avatar, and online status. 
It also displays the last message sent between the current user and the selected user, and whether there are any unread messages.

The component uses the useState and useEffect hooks from React to manage state and perform side effects respectively. 
It also imports the Img component, onSnapshot, doc, and docRef functions from Firebase, and the db object from the firebase module.
The first useEffect hook fetches data from an API endpoint and sets the state of the data variable to the last item in the response array.
The second useEffect hook listens for changes to the last message document in the Firestore database 
and updates the state of the data variable accordingly.

The component returns two div elements that display the user’s information and avatar, and a paragraph element 
that displays the last message sent between the current user and the selected user.
*/
//rsc code snippet

import React, {useEffect, useState} from 'react';
import Img from '../image1.jpg';
import {onSnapshot, doc, docRef} from 'firebase/firestore';
import {db} from '../firebase';

// Defining the User component
const User = ({user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

// Listening for changes to the last message document in the Firestore database
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;
    const docRef = doc(db, 'lastMsg', id);

    const unsub = onSnapshot(docRef, (doc) => {
      if(doc.exists()){
        setData(doc.data());
      }
    });
    return () => unsub();
  }, [user1, user2]);
// Rendering the user’s information and last message
  return (
    <>
    <div className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
     onClick={() => selectUser(user)}>
      <div className='user_info'>
        <div className='user_detail'>
          <img src={user.avatar || Img} alt='avatar' className='avatar' />
          <h4>{user.name}</h4>
          {data?.from !== user1 && data?.unread && <small className='unread'>New</small>}
        </div>
        <div className={`user_status ${user.isOnline ? "online" : "offline"}`}
        ></div>
        {data && data !== "" &&(
          <p className="truncate">
            <strong>{data.from === user1 ? "Me:" : null}</strong>
            {data.text ? data.text : "No messages yet"}
            </p>
        )}        
      </div>
    </div>
    <div onClick={() => selectUser(user)} className={`sm_container ${chat.name === user.name && "selected_user"}`}>
      <img src={user.avatar || Img} alt='avatar' className='avatar sm_screen' />
    </div>
    </>
  );
};

export default User;