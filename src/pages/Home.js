
//rsc kratica za početni skeleton funkcije
import React, {useEffect, useState} from 'react';
import {db, auth, storage} from "../firebase";
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy } from 'firebase/firestore';
import User from '../components/User';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";


const Home = () => {
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState("");
    const [text, setText] = useState("");
    const [img, setImage] = useState("");
    const [msgs, setMsgs] = useState([]);
    const user1 = auth.currentUser ? auth.currentUser.uid : null;

    useEffect(() => {
        const usersRef = collection(db, 'users');
        //create query object
        const q = query(usersRef, where('uid', 'not-in', [user1]));
        //execute query
        const unsub = onSnapshot(q, querySnapshot => {
            let users = []
            querySnapshot.forEach(doc => {
                users.push(doc.data());
            });
            setUsers(users);
        });
        return () => unsub();
    }, [user1]);

    const selectUser = (user) =>{
        setChat(user);
        console.log(user);

        const user2 = user.uid;
        const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;

        const msgRef = collection(db, 'messages', id, 'chat');
        const q = query(msgRef, orderBy('createdAt', 'asc'));

        onSnapshot(q, querySnapshot => {
            let msgs = [];
            querySnapshot.forEach(doc => {
                msgs.push(doc.data());
            });
            setMsgs(msgs);//pass msgs array to setMsgs
        })
        
    };
    console.log(msgs);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user2 = chat.uid;
        //messages => id => chat => addDoc
        const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;

        let url;
        if (img) {
            const imgRef = ref(
                storage,
                `images/${new Date().getTime()} - ${img.name}`
            );

            const snap = await uploadBytes(imgRef, img);
            const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
            url = dlUrl;
        }
        

        await addDoc(collection(db,'messages', id, 'chat'),{
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || "",
        })
        setText('');
    }


    return (
        <div className='home_container'>
            <div className='users_container'>
                {users.map(user => (
                <User key={user.uid} user={user} selectUser={selectUser} />
                ))}
            </div>
            <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user">
              <h3>{chat.name}</h3>
            </div>
            {             
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>}
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              setImg={setImage}
            />
          </>
        ) : (
          <h3 className="no_conv">Select a user to start conversation</h3>
        )}
      </div>
    </div>            

    );
};

export default Home;