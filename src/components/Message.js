
/*
This code defines a functional component called Message that takes in two props: msg and user1. 
It renders a message bubble with the message text, an optional image, and the time the message was created. 
The component also has a scrollRef that is used to scroll to the bottom of the message list when a new message is added.
The component uses the Moment library to format the time the message was created.
The useEffect hook is used to scroll to the bottom of the message list when a new message is added.
The component returns a div with a class of “message_wrapper” and a class of “own” if the message is from the user1, and an 
empty string otherwise. The ref attribute is set to the scrollRef.
The message text and image are rendered inside a p tag with a class of “me” if the message is from the user1, and a class 
of “friend” otherwise. The time the message was created is rendered inside a small tag using the Moment library.
*/

import React, {useRef, useEffect} from 'react';
import Moment from 'react-moment';

const Message = ({msg, user1}) => {
    const scrollRef = useRef();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [msg]);
    return (
        <div 
        className={`message_wrapper ${msg.from === user1 ? "own" : ""}` }
        ref={scrollRef}
        >
            <p className={msg.from === user1 ? "me" : "firend"}>
                {msg.media ? <img src={msg.media} alt={msg.text}/> : null}
                {msg.text}
                <br />
                <small>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
            </p>
        </div>
    );

};

export default Message;