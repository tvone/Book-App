import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
const Header = () => {
  const authData = useSelector((state: RootState) => state.userSlice);
  const { auth, isLogged } = authData;
  return (
    <header className="flex justify-center bg-green-500">
      <ul className="nav-login flex h-20 items-center justify-between  w-3/5 p-2">
        <h2 className="bg-sky-700 cursor-pointer p-3 text-white">
          <Link to="/">Book App</Link>
        </h2>
        {isLogged ? (
          <div className="flex items-center">
            <p>{auth.user.name}</p>
            <button className="bg-blue-500 p-2 w-full text-blue-700 ml-2">
              Logout
            </button>
          </div>
        ) : (
          <>
            <li className="p-2 bg-blue-500 mr-2 cursor-pointer">
              <Link to="/login">Login</Link>
            </li>
            <li className="p-2 bg-blue-500 cursor-pointer">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
