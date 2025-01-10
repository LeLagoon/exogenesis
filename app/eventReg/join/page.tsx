'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Page = () => {
    const { isLoaded, user } = useUser();
    const [ teamCode, setTeamCode ] = useState('');
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        fetch('/api/eventRegister/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, teamCode }),
        }).then((res) => res.json())
        .then((data) => {
            console.log(data.message)
            if (data.message === 'User added successfully to the team.') {
                return router.push('/eventReg/edit')
            }
        }).catch((err) => {
            console.log(err)
        })
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
                return router.push('/eventReg/edit')
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [isLoaded, user])
    
  return (
      <div className="flex flex-col items-center p-[10vw] min-h-[100vh] animate-fadeIn">
        <div className="m-[auto] flex flex-col items-center justify-center w-[100%]">
        <h1 className="text-xl font-bold">Join a team 😋</h1>
            <Input callback={(e) => setTeamCode(e.target.value)} classes='mt-[3vh] w-[100%]' name='Enter team code' />
            <Button classes='mt-[3vh] w-[100%]' onClickEvent={(e) => handleSubmit(e)}>Join team</Button>
        </div>
    </div>
  )
}

export default Page