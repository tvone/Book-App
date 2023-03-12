import React from "react";

import "./App.scss";
import Board from "./Component/Board/Board";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./Component/List/List";
import Login from "./Component/Register/Login";
import Register from "./Component/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getIsLogged, getUser } from "./redux/features/userSlice";
import Header from "./Component/Header/Header";
import jwt_decode from "jwt-decode";
import { RootState } from "./redux/store";
import { getAuthors } from "./redux/features/authorSlice";
import { getApi } from "./Utils/fetchData";
import SocketClient from "./SocketClient";
import { socket, SocketContext } from "./Utils/Context";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userSlice);
  const { auth } = userData;

  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged) {
      const test = async () => {
        try {
          const res = await getApi("refreshtoken", auth.token);
          dispatch(getUser(res?.data));
          dispatch(getIsLogged(true));
        } catch (error: any) {
          if (error) {
            localStorage.removeItem("isLogged");
            dispatch(getIsLogged(false));
          }
        }
      };
      test();
    }
  }, []);

  // useEffect(() => {
  //   const socket = io();
  //   // dispatch(createSocket(socket));
  //   // console.log(socket);
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <ToastContainer />
        <SocketClient />
        <Header />
        <Routes>
          <Route path="/" element={<Board />}></Route>
          <Route path="/book/:bookId" element={<List />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
};

export default App;
