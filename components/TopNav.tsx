"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useUser, useClerk  } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Notyf } from "notyf";

interface School {
  schoolName: string;
  address: string;
  team: string[];
  StudentInchargeName: string;
  TeacherInchargeName: string;
  TeacherInchargeEmail: string;
  teamName: string;
  teamCode: string;
}

interface MongoUser {
  email: string;
  clerkId: string;
  name: string;
  schoolId: string;
}

const TopNav = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [mongoSchoolLoading, setMongoSchoolLoading] = useState(true);
  const notyf = new Notyf();
  const [school, setSchool] = useState({} as School);
  

  useEffect(() => {
    if (!isLoaded) return;

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

    fetch("/api/getSchool", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.school) {
          setSchool(data.school);
          console.log("this is school", school);
          setMongoSchoolLoading(false);
        } else {
          setMongoUserLoading(false);
          setMongoSchoolLoading(false);
        }
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading || mongoSchoolLoading) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <PacmanLoader className="justify-center items-center" color="#651DFF" />
      </div>
    );
  }


  const pathname = usePathname();
  const nonNavPaths = ["/map"];
  if (nonNavPaths.includes(pathname)) return;
  return (
    <div className="flex w-[85vw] justify-between items-center mt-[7.5vw] mb-[8vw] mx-[7.5vw]">
      <div className="flex items-center">
        <img
          src="/samarth.png"
          className="w-[12.5vw] border-solid border-[#611df2] border-x-[4px] border-y-[4px] rounded-[100vw]"
        />
        <div className="ml-[2vw]">
          <p className="text-[3.75vw] leading-4">Hello {mongoUser.name.split(' ')[0]}!</p>
          <p className="text-[2.8vw] leading-4 text-[#ee2a70]">{school?.teamName}</p>
        </div>
      </div>
      <svg
        className="w-[14vw] h-[14vw]"
        viewBox="0 0 48 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="23.8412" cy="25.3322" r="23.3322" fill="#191919" />
        <path
          d="M27.8285 26.9121L27.3326 26.4683V22.607C27.3326 21.8171 27.0188 21.0596 26.4603 20.501C25.9018 19.9425 25.1442 19.6287 24.3543 19.6287C23.5644 19.6287 22.8069 19.9425 22.2484 20.501C21.6898 21.0596 21.3761 21.8171 21.3761 22.607V26.4683L20.8802 26.9121C20.1606 27.5543 19.6337 28.3838 19.3583 29.3081H29.3504C29.075 28.3838 28.5481 27.5543 27.8285 26.9121ZM26.588 30.7973C26.588 31.3897 26.3527 31.9578 25.9338 32.3767C25.5149 32.7956 24.9467 33.031 24.3543 33.031C23.7619 33.031 23.1938 32.7956 22.7749 32.3767C22.356 31.9578 22.1206 31.3897 22.1206 30.7973H17.6532C17.6522 29.8543 17.8507 28.9218 18.2357 28.061C18.6206 27.2002 19.1834 26.4306 19.8869 25.8027V22.607C19.8869 21.4222 20.3576 20.2859 21.1954 19.4481C22.0332 18.6103 23.1695 18.1396 24.3543 18.1396C25.5392 18.1396 26.6755 18.6103 27.5133 19.4481C28.3511 20.2859 28.8217 21.4222 28.8217 22.607V25.8027C29.5253 26.4306 30.088 27.2002 30.473 28.061C30.858 28.9218 31.0565 29.8543 31.0555 30.7973H26.588ZM24.3543 31.5418C24.5518 31.5418 24.7412 31.4634 24.8808 31.3238C25.0205 31.1841 25.0989 30.9947 25.0989 30.7973H23.6098C23.6098 30.9947 23.6882 31.1841 23.8278 31.3238C23.9675 31.4634 24.1569 31.5418 24.3543 31.5418Z"
          fill="white"
        />
        <path
          d="M47 6C47 9.31371 44.3137 12 41 12C37.6863 12 35 9.31371 35 6C35 2.68629 37.6863 0 41 0C44.3137 0 47 2.68629 47 6Z"
          fill="#611DF2"
        />
      </svg>
    </div>
  );
};

export default TopNav;
