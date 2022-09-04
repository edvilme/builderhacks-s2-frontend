import React, { createRef, useEffect, useState } from "react"
import { useChannelMessage } from '@onehop/react';
import { hopServer } from "./hop-server";
import MessageBubble from "./MessageBubble";

import './Chat.css';
import MessageComposer from "./MessageComposer";
import SystemBubble from "./SystemBubble";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import ChatNav from "./ChatNav";

export default function Chat({
  roomId
}){
  console.log(roomId, roomId, roomId)
  const [chatMessages, setChatMessages] = useState([]);
  const [isExploding, setIsExploding] = React.useState(false);
  const mainViewRef = createRef();

  const userId = localStorage.getItem("username");
  const messageInputRef = createRef(null);

  try{
    // Set listener
    useChannelMessage(roomId, 'USER_MESSAGE', message => {
      setChatMessages( m => [...m, message]);
    })
  } catch(e){
    console.log(e)
  }
  if(!roomId){
    return <div>Error</div>
  }

  async function send(){
    await hopServer.channels.publishMessage(roomId, 'USER_MESSAGE', {
      ...messageInputRef.current.value,
      author: userId,
    })
  }

	return (
    <div className="container">
      <ChatNav roomId={roomId}></ChatNav>
      <main ref={mainViewRef}>
        {chatMessages.map((m, i) => ( m.type == "join" ? <SystemBubble user={m.user}></SystemBubble> :
          <MessageBubble 
            type={m.type}
            answer={m.answer}
            author={m.author} 
            content={m.content}
            fromCurrentUser={m.author == userId}
            originalQuestion={m.originalQuestion}
            isCorrectAnswer={m.isCorrectAnswer}
            onAnswer={(data) => {
              hopServer.channels.publishMessage(roomId, 'USER_MESSAGE', {
                author: userId, 
                ...data
              })
            }}
          ></MessageBubble>
        ))}
      </main>
      <MessageComposer className="toolbar" ref={messageInputRef} onSubmit={send}></MessageComposer> 
    </div>
	)
}