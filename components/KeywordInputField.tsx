import { Input, TextField } from '@mui/material'
import React from 'react'

export default function KeywordInputField() {
  return (
    <div>
        <input className='px-2 py-5 border ring-gray-200 rounded-lg hover:border-red-500 focus:outline-red-600  cursor-pointer' placeholder='Enter keyword here'/>
  </div>
  )
}
