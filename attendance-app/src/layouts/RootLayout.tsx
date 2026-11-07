import React from 'react'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className='h-screen m-3'>
        <Outlet />
    </div>
  )
}

export default RootLayout