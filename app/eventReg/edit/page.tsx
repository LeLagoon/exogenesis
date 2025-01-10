'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { PacmanLoader } from 'react-spinners';
import { Notyf } from 'notyf';
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


const Page = () => {
    const { isLoaded, user } = useUser();
    const [schoolName, setSchoolName] = useState('')
    const [address, setAddress] = useState('')
    const [teamName, setTeamName] = useState('')
    const [StudentInchargeName, setStudentInchargeName] = useState('')
    const [TeacherInchargeName, setTeacherInchargeName] = useState('')
    const [TeacherInchargeEmail, setTeacherInchargeEmail] = useState('')
    const [owner, setOwner] = useState(false)
    const [schoolLoaded, setSchoolLoaded] = useState(false)
    const router = useRouter();
    const notyf = new Notyf();
    let school = {} as School;

    useEffect(() => {
        if (!isLoaded) return;
        fetch('/api/getSchool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
        }).then((res) => res.json())
        .then((data) => {
            if (data.message === 'School found') {
                console.log(data)
                school = data.school
                console.log(school)
                if (school?.team[0] == user?.primaryEmailAddress?.emailAddress) {
                    setOwner(true)
                }
                setSchoolName(school.schoolName)
                setAddress(school.address)
                setTeamName(school.teamName)
                setStudentInchargeName(school.StudentInchargeName)
                setTeacherInchargeName(school.TeacherInchargeName)
                setTeacherInchargeEmail(school.TeacherInchargeEmail)
                setSchoolLoaded(true)
                console.log(school.teamCode)
            } else {
                router.push('/eventReg/schoolReg')
            }
        }).catch((err) => {
            console.log(err)
            return router.push('/dashboard')
        })
    }, [isLoaded, user])

    if (!isLoaded || !schoolLoaded) {
        return (
            <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
                <PacmanLoader className="justify-center items-center" color='#651DFF' />
            </div>
        );
    }

    const handleLeaveTeam = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('danger')
        fetch('/api/eventRegister/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data.message)
            if (data.message === 'User left successfully from the team.') {
                return router.push('/eventReg/join')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()

        const data = {
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
            email: user?.primaryEmailAddress?.emailAddress,
        }
        console.log('im here');

        fetch('/api/eventRegister/edit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data)
            notyf.success(data.message)
        }).catch((err) => {
            console.log(err)
            notyf.error("An error occured while updating details.")
        })
    }
    
  return (
    <>
        <div className="flex flex-col items-center p-[10vw] min-h-[100vh] animate-fadeIn">
            <h1 className="self-start text-xl mt-[5vh] font-bold">Edit your team</h1>
            <a href='/dashboard' className="self-stretch">Go back</a>

            <Input classes="mt-[3vh]" name='Name of School' value={schoolName} callback={(e) => setSchoolName(e.target.value)} type="text" />
            <Input classes="mt-[3vh]" name='School Address' value={address} callback={(e) => setAddress(e.target.value)} type="text" />
            <Input classes="mt-[3vh]" name='Team/Club Name' value={teamName} callback={(e) => setTeamName(e.target.value)} type="text" />
            <Input classes="mt-[3vh]" name='Teacher Incharge Name' value={TeacherInchargeName} callback={(e) => setTeacherInchargeName(e.target.value)} type="text" />
            <Input classes="mt-[3vh]" name='Teacher Incharge Email' value={TeacherInchargeEmail} callback={(e) => setTeacherInchargeEmail(e.target.value)} type="text" />
            <Input classes="mt-[3vh]" name='Student Incharge Name' value={StudentInchargeName} callback={(e) => setStudentInchargeName(e.target.value)} type="text" />
            {owner ? (
                <Button classes='mt-[3vh] w-[100%]' onClickEvent={(e) => handleSubmit(e)}>Confirm</Button>
            ) : 
            (
                <div className="">
                    <p className='mt-[2vh]'>You're not the owner of the school so you cannnot edit the details</p>
                    <Button classes='mt-[2vh] mb-[20vh] w-[100%]' onClickEvent={(e) => handleLeaveTeam(e)}>Leave Team</Button>
                </div>
            )}
        </div>
    </>
  )
}

export default Page