'use client'
import { Meteors } from '@/components/ui/meteors'
import React, { useState, ChangeEvent, FormEvent } from 'react'

const Page: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Message:', message)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto p-8 pt-36">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-2">Enter your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-2">Enter your email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-lg font-semibold mb-2">Enter your message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
              required
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-200 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            {/* Meaty part - Meteor effect */}
          <Meteors number={20} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page
