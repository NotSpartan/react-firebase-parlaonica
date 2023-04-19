
//rsc kratica za početni skeleton funkcije
/*
This code defines the Home component which is responsible for rendering the chat application’s home page. 
The page consists of two main sections: a list of users and a chat section. 
The list of users is fetched from the Firestore database and displayed as a list of User components. 
When a user is selected, the chat section is updated to display the messages between the logged-in user and the selected user. 
The messages are also fetched from the Firestore database and displayed as a list of Message components. 
The user can send a new message using the MessageForm component.

The code imports the following functions and components from Firebase:

db: the Firestore database
auth: the Firebase authentication service
storage: the Firebase storage service
collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc: 
Firestore functions for querying and manipulating data
ref, getDownloadURL, uploadBytes: storage functions for uploading and downloading files
The code defines the following state variables:
users: an array of user objects fetched from the Firestore database
chat: the user object representing the selected user
text: the text content of the message being composed
img: the image file being uploaded
msgs: an array of message objects fetched from the Firestore database
The code defines the following functions:

useEffect: a hook that runs when the component mounts and fetches the list of users from the Firestore database
selectUser: a function that sets the chat state variable to the selected user and fetches the messages between the 
logged-in user and the selected user from the Firestore database
handleSubmit: a function that sends a new message to the Firestore database and updates the last message document

The code continues with the definition of the selectUser function, which sets the chat state variable to the selected user 
and fetches the messages between the logged-in user and the selected user from the Firestore database. 
The function also updates the unread field of the last message document if the last message was sent by the other user.

The handleSubmit function is defined next, which sends a new message to the Firestore database and updates the last message document. 
The function first checks if an image file is being uploaded and uploads it to the Firebase storage service if it exists. 
Then, it adds a new document to the messages collection with the text, sender, receiver, timestamp, and media fields. 
Finally, it updates the lastMsg document with the same fields and sets the unread field to true.

The return statement defines the JSX elements to be rendered on the home page. The page consists of two main sections: a list 
of users and a chat section. The list of users is rendered as a list of User components, and the chat section is 
rendered conditionally based on whether a user has been selected. If a user has been selected, the chat section displays 
the messages between the logged-in user and the selected user as a list of Message components. 
The user can send a new message using the MessageForm component.

Overall, the code implements a chat application using React and Firebase, allowing users to send text and image messages to each other.
The code uses Firestore to store user and message data and Firebase storage to store image files. 
The code also uses React hooks to manage state and update the UI.
*/
import React, {useEffect, useState} from 'react';
import {db, auth, storage} from "../firebase";
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, setDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import User from '../components/User';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';
import {ref, getDownloadURL, uploadBytes} from "firebase/storage";
import { async } from 'q';


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

    const selectUser = async (user) =>{
        setChat(user);

        const user2 = user.uid;
        const id = user1 > user2 ? `${user1 + user2} ` : `${user2 + user1} `;

        const msgRef = collection(db, "messages", id, "chat");
        const q = query(msgRef, orderBy("createdAt", "asc"));

        onSnapshot(q, querySnapshot => {
            let msgs = [];
            querySnapshot.forEach(doc => {
                msgs.push(doc.data());
            });
            setMsgs(msgs);//pass msgs array to setMsgs
        });

        //Get last message between logged in user and selected user
        const docSnap = await getDoc(doc(db, 'lastMsg', id));

        if (docSnap.data() && docSnap.data().from !== user1) {
          // update last message doc, set unread to false
          await updateDoc(doc(db, "lastMsg", id), { unread: false });
        }
    };

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
        });

        await setDoc (doc(db, 'lastMsg', id),{
          text,
          from: user1,
          to: user2,
          createdAt: Timestamp.fromDate(new Date()),
          media: url || "",
          unread: true,
        });
        setText("");
    };


    return (
        <div className='home_container'>
            <div className='users_container'>
                {users.map(user => (
                <User key={user.uid} user={user} selectUser={selectUser} user1={user1} chat={chat}/>
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