import React from "react";
import Label from "./Label";
import Input from "./Input";

const ReservationForm = ({ className, onSubmit, title, dataRoom, textSubmit, dataStart, dataEnd }) => {


  return (
    <form className={className} onSubmit={onSubmit}>
    <h3 className="font-bold text-2xl ">{title}</h3>
      <div className="flex flex-col gap-2 mt-4">
        <Label className={"font-bold"} htmlFor={"room"} label={"Room"} />
        <Input
          onChange={dataRoom}
          type={"number"}
          name={"room"}
          className={
            "w-56 h-8 rounded-xl shadow-sm shadow-black outline-none pl-2"
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className={'font-bold'} htmlFor={"start"} label={"Start at"} />
        <Input onChange={dataStart} type={"datetime-local"} name={"start"} className={"w-56 h-8 rounded-xl shadow-sm shadow-black outline-none pl-2"} />
      </div>
      <div className="flex flex-col gap-2">
        <Label className={'font-bold'} htmlFor={"end"} label={"End at"} />
        <Input onChange={dataEnd} type={"datetime-local"} name={"end"} className={"w-56 h-8 rounded-xl shadow-sm shadow-black outline-none pl-2"} />
      </div>
      <Input className={'mt-4 p-3 font-bold rounded-2xl cursor-pointer bg-teal-900 text-white hover:bg-teal-600'} type={'submit'} value={textSubmit}/>
    </form>
  );
};

export default ReservationForm;
