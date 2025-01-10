'use client'
import React, {useState} from 'react'
import { useUser } from '@clerk/nextjs';
import { PacmanLoader } from 'react-spinners';
import { RainbowButton } from '@/components/rainbow-button';

const AI = () => {
    const [query, setQuery] = useState('')
    const [response, setResponse] = useState('')
    const { user, isLoaded } = useUser()

    if (!isLoaded) {
        return (
            <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
                <PacmanLoader className="justify-center items-center" color='#651DFF' />
            </div>
        );
    }

    const handleFormSubmit = (e: React.MouseEvent) => {
        e.preventDefault()
        setResponse("Thinking...")
        
        fetch('/api/ai', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user?.primaryEmailAddress?.emailAddress, query: query }),
        }).then((res) => res.json())
        .then((data) => {
            setResponse(data.message)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="flex flex-col items-center p-[8vw] min-h-[100vh] animate-fadeIn">
            <img className='mt-[8vh] mb-[3vh] w-[60vw]' src="/aiImage.png" alt="" />
            <div className="flex flex-col items-center justify-center w-[100%] gap-y-4">
                <div className="w-[96vw] relative">
                    <img className='w-[100%]' src="/inputBg.png" alt="" />
                    <input placeholder="Enter your query" className="absolute top-[4vh] left-[13vw] bg-transparent outline-none w-[70vw]" type='text' value={query} onChange={(e: React.FormEvent<HTMLInputElement>) => setQuery(e.currentTarget.value)} />
                </div>
                <RainbowButton classes="w-[100%] rounded-full h-[6vh] mt-[-2vh]" onClickEvent={(e) => handleFormSubmit(e)} >Submit</RainbowButton>
            </div>
            {response ? (
                response === "Thinking..." ? (
                    <div className='mt-12 flex gap-2 justify-center items-center dark:invert'>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-4 w-4 bg-[#202020] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-4 w-4 bg-[#202020] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-4 w-4 bg-[#202020] rounded-full animate-bounce'></div>
                    </div>
                ) : (
                    <p className='mt-12'>{response}</p>
                )
            ) : (
                <p className='mt-10'>Type your query to see the response 😄</p>
            )}
        </div>
    )
}

export default AI