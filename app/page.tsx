'use client'
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'
import { PacmanLoader } from 'react-spinners';


export default function Home() {
  const router = useRouter()
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
      return (
          <div className="flex flex-col w-[100%] h-[100vh] items-center justify-center">
              <PacmanLoader className="justify-center items-center" color='#651DFF' />
          </div>
      );
  }

  if (isLoaded && user) {
    return router.push('/dashboard')
  }

}
