
'use client'

import { useState } from 'react'
import AuthForm from '@/components/AuthForm'

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)

  return (
    <div>
      <h1 className='main-title'>ULTRADIAN CALENDAR </h1>

      {/* {!showAuth ? (
        <button className='login-home-button' onClick={() => setShowAuth(true)}>Sign Up / Login</button>
      ) : (
        <div>
          <AuthForm />
          <button onClick={() => setShowAuth(false)}>Close</button>
        </div>
      )} */}
      <AuthForm />
    </div>
  )
}
