import Chatbox from "./components/Chatbox";
import ChatIcon from "./components/ChatIcon";
import React, { useState } from "react";


function App() {
  const [dataFirstPatient, setDataFirstPatient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isOnChatbox, setIsOnChatbox] = useState(false);
  return (
    <div className="min-h-screen">
      <img className="min-h-screen" src="/bg2.png"/>
      <div className="flex flex-col bottom-16 right-10 z-40 fixed items-end">
        <Chatbox
          dataFirstPatient={dataFirstPatient}
          messages={messages}
          setMessages={setMessages}
          isOnChatbox={isOnChatbox}
        />
        <ChatIcon
          dataFirstPatient={dataFirstPatient}
          setDataFirstPatient={setDataFirstPatient}
          messages={messages}
          setMessages={setMessages}
          isOnChatbox={isOnChatbox}
          setIsOnChatbox={setIsOnChatbox}
        />
      </div>
    </div>

  );
}

export default App;
