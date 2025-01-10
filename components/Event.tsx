"use client";
import React from "react";
interface EventProps {
  children: string;
  timeStamp: string;
  heading: string;
  clickEvent: () => void;
}

const Event = ({ children, timeStamp, heading, clickEvent }: EventProps) => {
  return (
    <div className="border-solid border-[0.5vw] border-[#535353] rounded-[2.75vw] mt-[3vh] relative">
      <img src="/event.png" className="w-[100%]" />
      <div className="absolute top-0 left-0 bg-[#611df2] w-[100%] text-[4.2vw] px-[4vw] py-[2vw] font-semibold rounded-t-[2.75vw]">
        <p>{heading}</p>
        <p className="text-[2.75vw] font-light leading-3">In {timeStamp}</p>
      </div>
      <img
        src="/mic.png"
        className="absolute bottom-[-3.25vw] right-[8.5vw] w-[22.5vw]"
      />
      <p className="absolute left-[4vw] top-[17.5vw] text-[2.9vw] w-[35vw]">
        {children}
      </p>
      <button
        className="text-[3.2vw] bottom-[3.2vw] left-[4vw] font-bold underline absolute"
        onClick={() => {
          clickEvent();
        }}
      >
        Set up reminder
      </button>
    </div>
  );
};

export default Event;
