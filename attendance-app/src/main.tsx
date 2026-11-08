import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import ProtectedLayout from './layouts/ProtectedLayout'
import LoginPage from './components/login/LoginPage'
import AttendancePage from './components/attendance/AttendancePage'
import UnprotectedLayout from './layouts/UnprotectedLayout'
import RootLayout from './layouts/RootLayout'
import { AuthProvider } from './providers/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout/>}>
            <Route element={<ProtectedLayout />}>
              <Route path='' element={<AttendancePage />}/>
            </Route>
            <Route element={<UnprotectedLayout />}>
              <Route path='/login' element={<LoginPage />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
