import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className='h-screen p-3 flex justify-center items-center bg-[#F5F5F5]'>
        <Outlet />
    </div>
  )
}

export default RootLayout