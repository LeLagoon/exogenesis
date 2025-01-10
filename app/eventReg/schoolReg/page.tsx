// TODO: Add team members to the team array in the School schema
// TODO: Allow teams to choose members for events
// i would love syamlal to review this :heart:





'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const fakeData = {
    schoolName: 'DPS Sushant Lok',
    address: 'DPS Sushant Lok, Gurgaon, Haryana',
    StudentInchargeName: 'Samarth Saluja',
    teamName: 'Team 1234',
    TeacherInchargeName: 'Rajesh Kumar',
    TeacherInchargeEmail: 'rajesh.kumar@gmail.com',
    teamCode: '1234'
}

const Page = () => {
    const { isLoaded, user } = useUser();
    const [schoolName, setSchoolName] = useState('')
    const [address, setAddress] = useState('')
    const [teamName, setTeamName] = useState('')
    const [StudentInchargeName, setStudentInchargeName] = useState('')
    const [TeacherInchargeName, setTeacherInchargeName] = useState('')
    const [TeacherInchargeEmail, setTeacherInchargeEmail] = useState('')
    const [teamCode, setTeamCode] = useState('')
    const router = useRouter()
    

    const addFakeData = () => {
        setSchoolName(fakeData.schoolName)
        setAddress(fakeData.address)
        setStudentInchargeName(fakeData.StudentInchargeName)
        setTeacherInchargeName(fakeData.TeacherInchargeName)
        setTeamName(fakeData.teamName)
        setTeacherInchargeEmail(fakeData.TeacherInchargeEmail)
        setTeamCode(fakeData.teamCode)
    }

    useEffect(() => {
        if (!isLoaded) return;
        if (!user) return;
        fetch('/api/getSchool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress }),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.message === 'School found') {
                if (data.message === 'Team not registered.') {
                    return router.push('/eventReg/edit')
                }
                return router.push('/dashboard')
            }
        }).catch((err) => {
            console.log(err)
        })

    }, [isLoaded, user])

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault()

        const data = {
            schoolName,
            address,
            teamName,
            StudentInchargeName,
            TeacherInchargeName,
            TeacherInchargeEmail,
            teamCode,
            email: user?.primaryEmailAddress?.emailAddress,
        }
        console.log('im here');

        fetch('/api/eventRegister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data)
            router.push('/eventReg/edit')
        }).catch((err) => {
            console.log(err)
        })
    }
    
  return (
    <div className="flex flex-col items-center p-[10vw] min-h-[100vh] animate-fadeIn">
        <h1 className="self-start text-xl mt-[5vh] font-bold">Register for the Event 😋</h1>
        <p onClick={addFakeData} className="self-start mt-4">Add fake data</p>

        <Input classes="mt-[3vh]" name='Name of School' value={schoolName} callback={(e) => setSchoolName(e.target.value)} type="text" />
        <Input classes="mt-[3vh]" name='School Address' value={address} callback={(e) => setAddress(e.target.value)} type="text" />
        <Input classes="mt-[3vh]" name='Team/Club Name' value={teamName} callback={(e) => setTeamName(e.target.value)} type="text" />
        <Input classes="mt-[3vh]" name='Team Code' value={teamCode} callback={(e) => setTeamCode(e.target.value)} type="text" />
        <Input classes="mt-[3vh]" name='Teacher Incharge Name' value={TeacherInchargeName} callback={(e) => setTeacherInchargeName(e.target.value)} type="text" />
        <Input classes="mt-[3vh]" name='Teacher Incharge Email' value={TeacherInchargeEmail} callback={(e) => setTeacherInchargeEmail(e.target.value)} type="text" />
        <Input classes="mt-[3vh]" name='Student Incharge Name' value={StudentInchargeName} callback={(e) => setStudentInchargeName(e.target.value)} type="text" />

        <Button classes='mt-[3vh] mb-[20vh] w-[100%]' onClickEvent={(e) => handleSubmit(e)}>Submit</Button>
    </div>
  )
}

export default Page