import React from "react";
import Input from "./Input";
import Label from "./Label";
import { Link } from 'react-router-dom'

const Form = ({ onSubmit, className, title, path, textLink, textSubmit, dataEmail, dataPassword }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      <h1 className="font-bold text-3xl ">{title}</h1>
      <div className="flex flex-col gap-2">
        <Label className={'font-bold'} htmlFor={"email"} label={"Email"} />
        <Input onChange={dataEmail} type={"email"} name={"email"} className={"w-56 h-8 rounded-xl shadow-sm shadow-black outline-none pl-2"} />
      </div>
      <div className="flex flex-col gap-2">
        <Label className={'font-bold'} htmlFor={"password"} label={"Password"} />
        <Input onChange={dataPassword} type={"password"} name={"password"} className={"w-56 h-8 rounded-xl shadow-sm shadow-black outline-none pl-2"}/>
      </div>
      <Input className={'p-3 font-bold rounded-2xl cursor-pointer bg-teal-900 text-white hover:bg-teal-600'} type={'submit'} value={textSubmit}/>
      <Link className="text-blue-900 hover:text-white font-bold text-sm" to={path}>{textLink}</Link>
    </form>
  );
};

export default Form;
