'use client'

import * as React from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Input from '@/components/Input'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs';
import { RainbowButton } from '@/components/rainbow-button'

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [fName, setFName] = React.useState('')
  const [lName, setLName] = React.useState('')
  const [error, setError] = React.useState<string | null>(null);
  const [verifying, setVerifying] = React.useState(false)
  const [code, setCode] = React.useState('')
  const router = useRouter()
  const { user } = useUser();

  if (user) {
    return router.push('/dashboard')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null);

    if (!isLoaded) return

    try {
      await signUp.create({
        emailAddress,
        password,
        username: fName.trim() + lName.trim(),
      })

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      })

      setVerifying(true)
    } catch (err: any) {
      setError(err.errors[0].message);
      console.log("me gira hua banda", JSON.stringify(err, null, 2))
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        console.log('Bhai yeh kya hai')
        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailAddress.trim(),
                clerkId: signUpAttempt.createdUserId,
                name: fName.trim() + ' ' + lName.trim(),
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            router.push('/dashboard')
        })
        .catch(error => {
            console.error('Error:', error);
        });
                
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  if (verifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100vh]">
            <h1 className="text-3xl font-bold mb-9 text-[#fff]">Verify your email</h1>
            <form onSubmit={handleVerify} className="flex flex-col space-y-4">
          <Input name="Enter verification code" value={code} callback={(e) => setCode(e.target.value)} />
          <button type="submit" className="bg-[#651DFF] text-white p-2 rounded-full text-xl h-[7vh]">Verify</button>
          </form>
      </div>
    )
  }

  return (
    <>

      <img src="./login_blob.png" className="w-[41%] aspect-auto absolute top-[-1vh] left-[-3vh] z-[-10] animate-fadeIn" alt="" />
      <img src="./login_blob_2.png" className="w-[44%] aspect-auto absolute bottom-[2vh] right-[-2vh] z-[-10] animate-fadeIn" alt="" />
      <div className="flex flex-col items-center justify-center min-h-[100vh] animate-fadeIn">
            <h1 className="text-3xl font-medium mb-10 text-[#fff]">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Input type="text" name="First Name" value={fName} callback={(e) => setFName(e.target.value)} />
                <Input type="text" name="Last Name" value={lName} callback={(e) => setLName(e.target.value)} />
                <Input type="email" name="Your email" value={emailAddress} callback={(e) => setEmailAddress(e.target.value)} />
                <Input type="password" name="Your password" value={password} callback={(e) => setPassword(e.target.value)} />
                <RainbowButton height='7vh' classes='rounded-full' type="submit">Register</RainbowButton>                {error && <p className="text-red-500 w-[80vw]">{error}</p>}
                <p>Already have an account? <Link className="font-bold text-[#651DFF]" href={"/sign-in"}>Login</Link></p>
            </form>
        </div>
    </>
  )
}