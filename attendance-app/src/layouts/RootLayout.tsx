import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className='h-screen m-3 flex justify-center items-center'>
        <Outlet />
    </div>
  )
}

export default RootLayout