import React from "react";
import { useState } from "react";
import styles from "./TextField.module.css";

function TextField({ socket }) {
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (message.trim()) {
      socket.emit("sendmessage", message);
      setMessage("");
    }
  }

  return (
    <form>
      <div className={styles.textarea_container}>
        <textarea
          className={styles.text_area}
          type="text"
          value={message}
          placeholder="write a messge"
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          cols="50"
        ></textarea>
        <img
          className={styles.textarea_container_btn}
          alt="send icon"
          src="send.png"
          onClick={sendMessage}
        />
      </div>
    </form>
  );
}

export default TextField;
