import "./messenger.css";
import { useEffect, useState, useRef, useContext } from "react";
import autosize from "autosize";
import axios from "axios";

import { io } from "socket.io-client";

// components imports
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";

// auth context imports
import { AuthContext } from "../../context/AuthContext";

export default function Messenger() {
  const messageTextArea = useRef();
  const scrollRef = useRef();
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const ting = new Audio("/assets/tune.mp3");

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  // clicking on conversations sets the current chat
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const receiverId = currentChat?.members.find((m) => m !== user._id);

  // fetch all messages of current chat

  // handling socket connection
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      const onlineUsersId = users.map((u) => u.userId);
      setOnlineUsers(onlineUsersId);
    });
  }, [user]);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // socket end

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        setConversations(res.data.conversations);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentChat) return;
      try {
        const res = await axios.get(`/messages/${currentChat._id}`);
        setMessages(res.data.messages);
      } catch (err) {
        console.log(err);
      }
    };

    getMessages();
  }, [currentChat]);

  useEffect(() => {
    autosize(messageTextArea.current);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageTextArea.current.value) return;
    try {
      const body = {
        conversation: currentChat._id,
        sender: user._id,
        text: messageTextArea.current.value,
      };

      // handling real-time logic
      socket.current.emit("sendMessage", {
        sender: user._id,
        receiver: receiverId,
        text: messageTextArea.current.value,
      });
      ting.play();

      const res = await axios.post("/messages", body);
      messageTextArea.current.value = "";
      setMessages((prev) => [...prev, res.data.message]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        user={user}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="Message"
                    className="chatMessageTextArea"
                    ref={messageTextArea}
                    rows={1}
                    onKeyPress={handleEnter}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noCurrentChatText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              userId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
