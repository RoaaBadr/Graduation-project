import React from 'react'
import "../design/App.css"
const Banner = () => {
  return (
    <div className='px-4 py-32 bg-black mx-auto'>
        <div className='text-white text-center'>
            <h1 className='text-5x1 lg:text-7x1 leading-snug font-bold mb-5'>Welcome to our Blogs</h1>
            <p className='text-gray-100 lg:w-3/5 mx-auto mb-5'>
                Write a Description Here
            </p>
        </div>

    </div>
  )
}

export default Banner