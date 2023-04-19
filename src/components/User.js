//rsc code snippet
import React, {useEffect, useState} from 'react';
import Img from '../image1.jpg';
import {onSnapshot, doc, docRef} from 'firebase/firestore';
import {db} from '../firebase';

const User = ({user1, user, selectUser, chat }) => {
  const user2 = user?.uid;
  const [data, setData] = useState("");

  useEffect(() => {
    fetch('/api/messages')
      .then(response => response.json())
      .then(data => {
        console.log(data); // add this line to check if data is being fetched correctly
        setData(data[data.length - 1]);
      });
  }, []);
  
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