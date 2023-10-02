import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./SideBar.module.css";

function SideBar({ socket, name }) {
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    socket.on("users", (data) => {
      setConnectedUsers(data);
    });
  }, []);

  return (
    <div className={styles.side_bar_container}>
      <h2>USERS</h2>
      <ul>
        {connectedUsers.map((user) => {
          return (
            <li
              style={{
                color: user.framework === "react" ? "#60dcfb" : "#d70230",
              }}
              key={user.name}
            >
              {user.name}
              {name === user.name ? <span>(Me)</span> : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideBar;
