// 'use client'

// import { useState } from 'react'
// import { supabase } from '@/utils/supabase'
// import { useAuth } from '@/context/AuthProvider'
// import Calendar from './Calendar'

// export default function AuthForm() {
//   const { user, loading } = useAuth()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleSignIn = async () => {
//     setError('')
//     const { error } = await supabase.auth.signInWithPassword({ email, password })
//     if (error) setError(error.message)
//   }

//   const handleSignUp = async () => {
//     setError('')
//     const { error } = await supabase.auth.signUp({ email, password })
//     if (error) setError(error.message)
//   }

//   const handleSignOut = async () => {
//     await supabase.auth.signOut()
//   }

//   const handleGoogleSignIn = async () => {
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/auth/callback`
//         }
//       })
//       if (error) setError(error.message)
//     } catch (err) {
//       setError('An error occurred during Google sign-in')
//     }
//   }

//   if (loading) return <p>Loading...</p>

//   return (
//     <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//       {user ? (
//         <div className="space-y-4">
//           <p className="text-lg">Welcome, {user.email}</p>
//           <Calendar/>
//           <button 
//             onClick={handleSignOut}
//             className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//           >
//             Sign Out
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <input 
//             type="email" 
//             placeholder="Email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button 
//             onClick={handleSignIn}
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//           >
//             Sign In
//           </button>
//           <button 
//             onClick={handleSignUp}
//             className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//           >
//             Sign Up
//           </button>
//           <div className="relative my-6">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-gray-300"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-2 bg-white text-gray-500">Or continue with</span>
//             </div>
//           </div>
//           <button 
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 border rounded hover:bg-gray-50 transition"
//           >
//             <svg className="w-5 h-5" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             Sign in with Google
//           </button>
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//         </div>
//       )}
//     </div>
//   )
// }
'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase'
import { useAuth } from '@/context/AuthProvider'
import Calendar from './Calendar'
import './AuthForm.css' // Import the CSS file

export default function AuthForm() {
  const { user, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = async () => {
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
  }

  // const handleSignUp = async () => {
  //   setError('')
  //   const { error } = await supabase.auth.signUp({ email, password })
  //   if (error) setError(error.message)
  // }
  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
  
    setError('');
    const { error} = await supabase.auth.signUp({ email, password });
  
    if (error) {
      setError(error.message);
    }
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) setError(error.message)
    } catch (err) {
      setError('An error occurred during Google sign-in')
    }
  }

  if (loading) return <p className="auth-form-loading">Loading...</p>

  return (
    <div className="auth-form-container">
      {user ? (
        <div className="auth-form-welcome">
          <p className="auth-form-welcome-text">Welcome, {user.email}</p>
          <Calendar />
          <button 
            onClick={handleSignOut}
            className="auth-form-sign-out-button"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="auth-form-content">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="auth-form-input"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="auth-form-input"
            required
          />
          <button 
            onClick={handleSignIn}
            className="auth-form-button auth-form-sign-in-button"
          >
            Sign In
          </button>
          <button 
            onClick={handleSignUp}
            className="auth-form-button auth-form-sign-up-button"
          >
            Sign Up
          </button>
          <div className="auth-form-divider">
            <div className="auth-form-divider-line"></div>
            <span className="auth-form-divider-text">Or continue with</span>
          </div>
          <button 
            onClick={handleGoogleSignIn}
            className="auth-form-button auth-form-google-button"
          >
            <svg className="auth-form-google-icon" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>
          {error && <p className="auth-form-error">{error}</p>}
        </div>
      )}
    </div>
  )
}