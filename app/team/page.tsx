"use client";
import { useUser, useClerk  } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

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

export default function Page() {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const [mongoUser, setMongoUser] = useState({} as MongoUser);
  const [mongoUserLoading, setMongoUserLoading] = useState(true);
  const [mongoSchoolLoading, setMongoSchoolLoading] = useState(true);
  const notyf = new Notyf();
  const [school, setSchool] = useState({} as School);
  const [team, setTeam] = useState([] as string[]);
  const [teamLoaded, setTeamLoaded] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    fetch("/api/getTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          setSchool(data.school);
          setMongoUser(data.user);
          setTeam(data.users);
          setTeamLoaded(false);
          setMongoUserLoading(false);
          setMongoSchoolLoading(false);
        } else {
          notyf.error("An error occured while fetching user.");
          setMongoUserLoading(false);
        }
      });
  }, [isLoaded, user]);

  if (!isLoaded || mongoUserLoading || mongoSchoolLoading || teamLoaded) {
    return (
      <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
        <PacmanLoader className="justify-center items-center" color="#651DFF" />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-0 p-[10vw] min-h-[100vh] animate-fadeIn">
        <h1 className="self-start text-xl mt-[5vh] font-bold">Your Team Members</h1>
        <div className="flex flex-col gap-4 mt-[3vh]">
        {team.map((member, key) => (
            <div>
                <p>{key+1}&#41; <b>{member}</b> &#40; student &#41;</p>
            </div>
        ))}
        </div>
    </div>
  );
}
