
/*
This code defines a functional component called MessageForm that renders a form for sending messages. 
The component takes in four props: handleSubmit, text, setText, and setImg. handleSubmit is a function that is 
called when the form is submitted, text is a string that represents the message text, setText is a function that 
updates the message text, and setImg is a function that updates the image attached to the message.
The form contains an input field for attaching an image, a text input field for entering the message text, and a 
button for submitting the form.
The Attachment component is imported from the “./svg/Attachment” file and is used to display an attachment icon next to 
the input field for attaching an image.
The onChange event listener is added to the input field for attaching an image, which calls the setImg function 
to update the image file when a new file is selected.
The onChange event listener is also added to the text input field, which calls the setText function to update 
the message text as the user types.
The form is submitted when the user clicks the Send button, which calls the handleSubmit function.
*/

import React, {useRef} from "react";
import Attachment from "./svg/Attachment";

const MessageForm = ({ handleSubmit, text, setText, setImg}) => {
  const fileInputRef = useRef(null);

  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        <Attachment />
      </label>
      <input
        ref={fileInputRef}
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
      />
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  );
};

export default MessageForm;