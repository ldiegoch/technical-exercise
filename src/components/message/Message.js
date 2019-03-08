import React from "react";
import "./Message.css";

const Message = (props) => {
  return (
    <div className='message'>
      <div className='message__inner'>{props.message}</div>
    </div>
  );
};

export default Message;
