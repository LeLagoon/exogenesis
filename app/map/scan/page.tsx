"use client"
import React from 'react'
import QrReader from '@/components/QrReader'

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-0 py-[10vw] min-h-[100vh] animate-fadeIn">
      <h1 className='mb-5 font-bold text-2xl'>Scan a QR Code</h1>
      <div className="relative w-[90vw] aspect-square">
        <img src="/qrFrame.png" alt="" />
        <QrReader classes="absolute h-[80vw] top-5 left-5 w-[80vw]" />
      </div>
    </div>
  )
}

export default page