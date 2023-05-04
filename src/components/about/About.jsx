import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='w-full flex flex-col items-center pt-24'>
      <span className='font-bold text-3xl'>Page not available yet sorry...</span>
      <Link to='/' className=' mt-5 cursor-pointer hover:underline text-blue-500'>Go back to home</Link>
    </div>
  )
}

export default About