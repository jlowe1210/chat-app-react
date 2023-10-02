import { useState } from "react";
import axios from "axios";

import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setName } from "./Slices/nameSlice";
import { useNavigate } from "react-router-dom";

function App() {
  const [chatName, setChatName] = useState("");
  const [isNameAvailable, setIsNameAvailable] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uiNameAvailability = () => {
    if (isNameAvailable !== null) {
      if (isNameAvailable === true) {
        return (
          <h2
            style={{
              textAlign: "center",
              color: "rgb(96, 220, 251)",
            }}
          >
            {chatName} is available
          </h2>
        );
      }
      if (isNameAvailable === false) {
        return (
          <h2
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            {chatName} is not available
          </h2>
        );
      }
    }

    return null;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsNameAvailable(null);
    if (chatName.trim() === "") {
      return;
    }
    try {
      const res = await axios.post("/adduser", {
        name: chatName,
        framework: "react",
      });

      dispatch(setName(chatName));
      navigate("/react/chat");
      setChatName("");
    } catch (error) {
      setIsNameAvailable(false);
    }
  }

  useEffect(() => {
    let time = null;
    setIsNameAvailable(null);
    if (chatName.trim() === "") {
      return;
    }

    if (chatName) {
      const checkNameAvailability = async () => {
        try {
          const res = await axios.post("/checkname", {
            name: chatName,
          });
          setIsNameAvailable(true);
        } catch (error) {
          setIsNameAvailable(false);
        }
      };

      time = setTimeout(() => {
        checkNameAvailability();
      }, 500);
    }

    return () => {
      clearTimeout(time);
    };
  }, [chatName]);

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        {uiNameAvailability()}
        <h1 className="form_title">
          Welcome to <span style={{ color: "#60DCFB" }}>Re</span>Chat
        </h1>
        <input
          className="nameInput"
          type="text"
          name="chatname"
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
        <button
          disabled={!chatName || !isNameAvailable}
          className="form_btn"
          type="submit"
        >
          Set Name!
        </button>
      </form>
    </div>
  );
}

export default App;
