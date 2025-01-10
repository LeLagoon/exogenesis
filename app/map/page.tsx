"use client";
import React from "react";
import TopNav from "@/components/TopNav";
import { useUser } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RainbowButton } from "@/components/rainbow-button";
import FadedNav from "@/components/FadedNav";

interface MongoUser {
  email: string;
  clerkId: string;
  name: string;
}

const MapView = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [markerLoaded, setMarkerLoaded] = useState(false);
  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      return router.push("/sign-in");
    }
    fetch("/api/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.mongoUser) {
          setMongoUserLoading(false);
          setMongoUser(data.mongoUser);
        } else {
          setMongoUserLoading(false);
          return router.push("/sign-in");
        }
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <PacmanLoader className="justify-center items-center" color="#651DFF" />
      </div>
    );
  }
  function scrollToPosition() {
    document.getElementById("marker")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }
  function randomMarkerShit() {
    const markerPositions = [
      {
        x: 60,
        y: 158,
        desc: "Registration",
      },
      {
        x: 60,
        y: 132,
        desc: "Creative",
      },
      {
        x: 60,
        y: 85,
        desc: "Auditorium 1",
      },
      {
        x: 60,
        y: 60,
        desc: "Amphitheatre",
      },
      {
        x: 30,
        y: 158,
        desc: "RoboMission",
      },
      {
        x: 89,
        y: 158,
        desc: "GIT, SportsTech",
      },
      {
        x: 120,
        y: 42.5,
        desc: "Surprise",
      },
      {
        x: 110,
        y: 163,
        desc: "Waiting Area",
      },
    ];
    if (markerLoaded) return;
    const totalLen = markerPositions.length;
    const randomPos = Math.floor(Math.random() * totalLen);
    console.log(markerPositions[randomPos]);
    document.getElementById(
      "marker"
    )!.style!.left! = `${markerPositions[randomPos].x}vw`;
    document.getElementById(
      "marker"
    )!.style!.top! = `${markerPositions[randomPos].y}vw`;
    document.getElementById("currentlocation")!.innerHTML =
      markerPositions[randomPos].desc;
    scrollToPosition();
    setMarkerLoaded(true);
  }
  function scrollToLeft() {
    document.getElementById('mainContainer')!.scrollLeft = 0
  }
  return (
    <div className="relative w-[100vw] h-[100vh] overflow-x-hidden" id="mainContainer" onLoad={() => scrollToLeft()}>
      <TopNav />
      <div
        className="w-[100vw] overflow-auto rounded-[1.25vw] h-[50vh]"
        id="container"
        onLoad={() => randomMarkerShit()}
      >
        <div className="min-w-[140vw] relative">
          <div className="z-20 flex items-center gap-[1.5vw] top-[8vw] left-[8vw] w-[84vw] fixed bg-[#111111] px-[5vw] py-[3.5vw] text-[4vw] rounded-full">
            <svg
              className="w-[4.5vw] h-[4.5vw]"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M7.60932 20.7163L8.31584 21.6382L9.02236 20.7163C11.1762 17.9057 12.8115 15.4751 13.9122 13.4309C14.9987 11.413 15.6226 9.66775 15.6226 8.25816C15.6226 6.32028 14.8528 4.46177 13.4825 3.09148C12.1122 1.72119 10.2537 0.951367 8.31584 0.951367C6.37795 0.951367 4.51944 1.72119 3.14915 3.09148C1.77887 4.46177 1.00905 6.32028 1.00905 8.25816C1.00905 9.66775 1.63296 11.413 2.71949 13.4309C3.82021 15.4751 5.45545 17.9057 7.60932 20.7163ZM10.2791 10.2215C9.75845 10.7422 9.05222 11.0347 8.31584 11.0347C7.57945 11.0347 6.87323 10.7422 6.35252 10.2215C5.83182 9.70077 5.53929 8.99454 5.53929 8.25816C5.53929 7.52177 5.83182 6.81555 6.35252 6.29485C6.87323 5.77414 7.57945 5.48162 8.31584 5.48162C9.05222 5.48162 9.75845 5.77414 10.2791 6.29485C10.7999 6.81555 11.0924 7.52177 11.0924 8.25816C11.0924 8.99454 10.7999 9.70077 10.2791 10.2215Z"
                  stroke="white"
                  stroke-width="1.78025"
                />
              </g>
            </svg>

            <p>
              Current Location: <span id="currentlocation">Searching...</span>
            </p>
          </div>
          <img src="/map.png" className="w-[140vw]"></img>
          <img
            src="/marker.png"
            className="absolute top-[163vw] left-[110vw] w-[20vw] h-[20vw]"
            id="marker"
          ></img>
        </div>
      </div>
      <div className="flex flex-row items-center justify-evenly mt-[3vh]">
        <RainbowButton
          classes="w-[75vw] h-full"
          onClickEvent={() =>
            document.getElementById("marker")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            })
          }
        >
          Locate me!
        </RainbowButton>
        <img src="/ar.png" onClick={() => router.push('/ar')} className="w-12 aspect-square" alt="" />
      </div>
      <div className="w-[85vw] ml-[7.5vw] mt-[7.5vw]">
        <p className="text-[#777] text-[3vw]">Find some places to eat</p>
      </div>
      <img src='/food.png' className='ml-[7.5vw] mt-[2vw] w-[92.5vw]'></img>
      <div className="w-[85vw] ml-[7.5vw] mt-[7.5vw]">
        <p className="text-[#777] text-[3vw]">Fun places around you</p>
      </div>
      <img src='/places.png' className='ml-[7.5vw] mt-[2vw] w-[92.5vw] mb-[20vh]'></img>
      <FadedNav />
    </div>
  );
};

export default MapView;
