'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs'

const ClientComponent = () => {
    const router = useRouter();
    const { user, isLoaded } = useUser()

    useEffect(() => {
        if (isLoaded && user) {
            return;
        } 
        if (isLoaded && !user) {
            return router.push('/sign-in')
        }
    }, [isLoaded, user, router])
    return null;
};

export default ClientComponent;