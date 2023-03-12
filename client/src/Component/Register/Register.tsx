import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./FormInput";

import axios from "axios";
import { toast } from "react-toastify";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "User Name",
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Email",
    },
    {
      id: 3,
      name: "age",
      type: "number",
      placeholder: "Age",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
    },
    {
      id: 5,
      name: "cf_password",
      type: "password",
      placeholder: "Comfirm password",
    },
  ];

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/register", { ...data }).then((res) => {
        toast.success(res.data.msg);
      });
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="bg-green-500 w-1/5">
        <div className="p-2">
          {" "}
          <h2 className="p-2">Register</h2>
          {inputs.map((item) => {
            return (
              <FormInput onChange={handleChange} key={item.id} {...item} />
            );
          })}
          <Link className="" to="/login">
            You have account ?
          </Link>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 p-2 w-full text-white"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
