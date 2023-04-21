/* 
This code is a React component that renders a single message in a chat conversation. 
It takes in two props: msg, which is the message object to be rendered, and user1, which is the username of the current user.

The component uses the useRef and useEffect hooks to scroll to the bottom of the message component when a new message is received. 
The scrollRef is a reference to the div element that wraps the message component, and the useEffect hook is triggered
 whenever the msg prop changes.

The component then renders the message text and media (if any) using conditional rendering. 
If msg.media exists, it renders an img element with the src attribute set to msg.media and the alt attribute set to msg.text. Otherwise, it renders only the msg.text.

Finally, the component renders the message timestamp using the Moment library, 
which formats the timestamp as a relative time (e.g. “2 hours ago”).

Overall, this code is well-organized and follows best practices for React development.  */

import React, {useRef, useEffect} from 'react';
import Moment from 'react-moment';

const Message = ({msg, user1}) => { // A reference to the div element that wraps the message component.
    const scrollRef = useRef();

    // Scroll to the bottom of the message component when a new message is received.
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [msg]);

    // Render the message component.
    return (
        <div 
        className={`message_wrapper ${msg.from === user1 ? "own" : ""}` }
        ref={scrollRef}
        >
            <p className={msg.from === user1 ? "me" : "firend"}>
                {msg.media ? <img src={msg.media} alt={msg.text}/> : null}
                {msg.text}
                <br />
                {/* Render the message timestamp using the Moment library. */}

                <small>
                    <Moment fromNow>{msg.createdAt.toDate()}</Moment>
                </small>
            </p>
        </div>
    );

};

export default Message;