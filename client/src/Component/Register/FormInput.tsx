import React from "react";

interface IInput {
  id: number;
  name: string;
  type: string;
  onChange: (e: any) => void;
  placeholder: string;
}

const FormInput: React.FC<IInput> = ({ id, onChange, ...other }) => {
  return (
    <div className="form bg-green-500 p-2 w-full">
      <input onChange={onChange} className="mb-2 w-full p-2" {...other} />
    </div>
  );
};

export default FormInput;
