'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Page = () => {
    const { isLoaded, user } = useUser();
    const router = useRouter()

    const handleJoin = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push('/eventReg/join')
    }
    const handleCreate = (e: React.MouseEvent) => {
        e.preventDefault()
        router.push('/eventReg/schoolReg')
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
        <h1 className="text-xl font-bold">Register for the Event 😋</h1>
        <p>Either create a team or join one</p>
            <Button classes='mt-[3vh] w-[100%]' onClickEvent={(e) => handleJoin(e)}>Join a team</Button>
            <Button classes='mt-[3vh] w-[100%] bg-[transparent] border-2 border-[#651DFF]' onClickEvent={(e) => handleCreate(e)}>Create a team</Button>
        </div>
    </div>
  )
}

export default Page