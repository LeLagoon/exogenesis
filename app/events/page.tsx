"use client";
import React from "react";
import LiveEvent from "@/components/LiveEvent";
import TopNav from "@/components/TopNav";
import Event from "@/components/Event";
import FadedNav from "@/components/FadedNav";
import { useUser } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "notyf/notyf.min.css";
import { Notyf } from "notyf";

interface MongoUser {
  email: string;
  clerkId: string;
  name: string;
}

const EventsPage = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const notyf = new Notyf();
  function handleClick() {
    notyf.success({
      message: "Successfully added reminder!",
      background: "#611df2",
    });
  }
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

  return (
    <div className="mb-[15vh] animate-fadeIn">
      <TopNav />
      <div className="mx-[12vw]">
        <div className="flex flex-row items-center justify-between w-[100%]">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Live Events</h1>
            <p className="text-sm">Click to watch</p>
          </div>
            <img onClick={() => router.push('/map/scan')} className="w-12" src="/ar.png" alt="marr gaya" />
        </div>
        
        <div>
          <LiveEvent image="/pitching.png" timeStamp="0:37">
            Creative Event: Pitching
          </LiveEvent>
          <Event
            timeStamp="17 minutes"
            heading="Live Concert"
            clickEvent={handleClick}
          >
            Exogenesis welcomes you to the live concert telecast
          </Event>
          <Event
            timeStamp="36 minutes"
            heading="Live Drone Show"
            clickEvent={handleClick}
          >
            Exogenesis welcomes you to the live drone show
          </Event>
          <Event
            timeStamp="49 minutes"
            heading="Live Gaming Stream"
            clickEvent={handleClick}
          >
            Exogenesis welcomes you to the live game stream
          </Event>
        </div>
      </div>
      <FadedNav />
    </div>
  );
};

export default EventsPage;
