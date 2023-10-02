import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./ChatDisplay.module.css";
import { useDispatch } from "react-redux";
import { setName } from "../../Slices/nameSlice";
import { useNavigate } from "react-router-dom";

function ChatDisplay({ socket }) {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("messages", (messages) => {
      setMessages(messages);
    });

    socket.on("disconnect", () => {
      dispatch(setName(""));
      navigate("/react");
    });
  }, []);

  return (
    <div className={styles.chat_display_container}>
      <ul className={styles.messages_container}>
        {messages.map((message, index) => {
          return (
            <div>
              <span
                style={{
                  color: message.framework === "react" ? "#bff1fd" : "#fe8ba4",
                }}
                className={styles.message_sender}
              >
                {message.name}
              </span>
              <li
                style={{
                  backgroundColor:
                    message.framework === "react" ? "#60dcfb" : "#d70230",
                }}
                className={styles.message}
                key={message.name + index}
              >
                {message.message}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default ChatDisplay;
