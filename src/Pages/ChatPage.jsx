import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ChatDisplay from "../Components/ChatDisplay/ChatDisplay";
import SideBar from "../Components/SideBar/SideBar";
import TextField from "../Components/TextField/TextField";
import { setName } from "../Slices/nameSlice";

function ChatPape({ socket }) {
  const [connected, setConnected] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector((state) => {
    return state.name.name;
  });

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      dispatch(setName(""));
    };
  }, [name]);

  useEffect(() => {
    if (!connected && name) {
      socket.io.opts.query = {
        name: name,
        framework: "react",
      };
      socket.connect();

      setConnected(true);
    }
  }, [connected]);

  return (
    <>
      <SideBar socket={socket} name={name} />
      <ChatDisplay socket={socket} />
      <TextField socket={socket} />
    </>
  );
}

export default ChatPape;
