'use client'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="mb-4 text-xl font-bold">Sign In</h1>
        <button
          onClick={() => signIn('google')}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
