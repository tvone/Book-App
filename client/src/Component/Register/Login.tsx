import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getIsLogged } from "../../redux/features/userSlice";
const Login = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  console.log(data);

  const handleSubmit = async () => {
    try {
      await axios.post("/api/login", { ...data }).then((res) => {
        toast.success(res.data.msg);
        localStorage.setItem("isLogged", "true");
        dispatch(getIsLogged(true));
        window.location.href = "/";
      });
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="bg-green-500 w-1/5">
        <div className=" p-2">
          {" "}
          <h2 className="p-2 text-center">Login</h2>
          {inputs.map((item) => {
            return (
              <FormInput onChange={handleChange} key={item.id} {...item} />
            );
          })}
          <Link className="" to="/register">
            You do not account ?
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 p-2 w-full text-white"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
