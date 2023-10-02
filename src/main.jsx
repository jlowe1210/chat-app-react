import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import ChatPape from "./Pages/ChatPage.jsx";

const socket = io({ autoConnect: false });

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/react">
        <Route index element={<App />} path="/react" />,
        <Route element={<ChatPape socket={socket} />} path="/react/chat" />
        <Route path="*" element={<Navigate to={"/react"} />} />
      </Route>
      <Route path="/" element={<Navigate to={"/react"} />}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
);
