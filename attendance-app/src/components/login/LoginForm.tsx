import { useState } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import useSWRMutation from 'swr/mutation'
import { login } from '../../api'
import { useNavigate } from 'react-router'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import Button from '../Button'
import { useAuth } from '../../hooks/useAuth'

type LoginFormValues = {
  email: string
  password: string
}

function LoginForm() {
  const navigate = useNavigate();
  const {setAccessToken} = useAuth()
  const [toggleVisiblePassword, setToggleVisiblePassword] = useState(false)
  const {register, handleSubmit, formState: { errors }} = useForm<LoginFormValues>()
  const { trigger, isMutating, error } = useSWRMutation("/auth/login", login, {
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken)
      navigate("/", {replace: true})
    },
    throwOnError: false
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await trigger(data)
  }

  return (
    <div className='flex flex-col gap-4 m-4'>
      <div>
        <h1 className='font-bold text-3xl'>Login</h1>
        <p className='text-sm mt-1 text-[#5A6172]'>Login to submit your attendance</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-sm font-semibold'>Email</label>
            <input type='email' id='email' placeholder='email@company.com' className='border rounded-lg p-2 text-sm' {...register("email", {required: "Email is required"})}/>
            {errors.email && <small className='text-xs text-red-600'>{errors.email.message}</small>}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password' className='text-sm font-semibold'>Password</label>
            <div className='relative'>
              <input type={toggleVisiblePassword ? 'text' : 'password'} id='password' placeholder='Enter your password' className='w-full border rounded-lg p-2 text-sm' 
                {...register("password", {required: "Password is required"})}
              />
              <div className='absolute inset-y-0 pr-3 flex right-0 items-center cursor-pointer' onClick={() => setToggleVisiblePassword(p => !p)}>
                {toggleVisiblePassword ? <IoMdEyeOff className="text-base md:text-lg"/> : <IoMdEye className="text-base md:text-lg"/>}
              </div>
            </div>
            {errors.password && <small className='text-xs text-red-600'>{errors.password.message}</small>}
          </div>

          {error && <p className='text-center text-sm text-red-600'>{error.message}</p>}

          <Button type='submit' className='mt-3' loading={isMutating}>Login</Button>
      </form>
    </div>
  )
}

export default LoginForm