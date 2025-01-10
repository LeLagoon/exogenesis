import React from "react";

interface LiveEventProps {
  children: string;
  timeStamp: string;
  image: string;
}

const LiveEvent = ({ children, timeStamp, image }: LiveEventProps) => {
  return (
    <div className="border-solid border-[0.5vw] border-[#535353] rounded-[2.75vw] bg-[#1D1B20] mt-[3vh]">
      <div className="relative">
        <img src={image} alt={children} className="w-[76vw]" />
        <div className="absolute bottom-[2vw] left-[4vw] flex items-center gap-[1vw]">
          <svg
            className="w-[4vw]"
            viewBox="0 0 13 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 4L6 0.535898L6 7.4641L0 4Z" fill="white" />
            <path d="M5 4L11 0.535898V7.4641L5 4Z" fill="white" />
          </svg>
          <p className="text-[4vw]">{timeStamp}</p>
        </div>
        <div className="absolute w-[72vw] bottom-[0.05vh] left-[2vw] bg-[#ee2a70] h-[0.25vh]"></div>
      </div>
      <div className="mx-[5vw] mt-[3.5vw] mb-[5vw]">
        <h1 className="text-[4.5vw] font-medium">{children}</h1>
        <div className="flex gap-[3.25vw] items-center">
          <div className="flex gap-[1vw] items-center">
            <p className="text-[3vw] leading-3">Live</p>
            <img src="/live.png" className="h-[5vw]" />
          </div>
          <p className="text-[3vw]">127 viewing</p>
        </div>
      </div>
    </div>
  );
};

export default LiveEvent;
