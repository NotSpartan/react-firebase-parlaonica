
/*
This code defines a functional component called Loading that returns a simple loading message. 
The component is written using React library.
The component returns a div element with a fixed position and a child h2 element that displays the text “Loading…”. 
The h2 element is centered on the screen using CSS styles.
The component is exported as a default export, which means it can be imported and used in other parts of the application.
*/
import React from "react";

const Loading = () => {
  return (
    <div style={{ position: "relative" }}>
      <h2
        style={{
          position: "fixed", // sets the position of the h2 element to fixed
          top: "50%", // sets the top position of the h2 element to 50% of the screen
          left: "50%", // sets the left position of the h2 element to 50% of the screen
          transform: "translate(-50%, -50%)",  // centers the h2 element on the screen
        }}
      >
        Loading...
      </h2>
    </div>
  );
};

export default Loading;