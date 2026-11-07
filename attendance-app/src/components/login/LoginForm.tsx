import { useState } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import useSWRMutation from 'swr/mutation'
import { login } from '../../api'
import { setToken } from '../../utils'
import { useNavigate } from 'react-router'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import Button from '../Button'

type LoginFormValues = {
  email: string
  password: string
}

function LoginForm() {
  const navigate = useNavigate();
  const [toggleVisiblePassword, setToggleVisiblePassword] = useState(false)
  const {register, handleSubmit, formState: { errors }} = useForm<LoginFormValues>()
  const { trigger, isMutating, error } = useSWRMutation("/auth/login", login, {
    onSuccess: ({ accessToken }) => {
      setToken(accessToken);
      navigate("/", {replace: true})
    },
    throwOnError: false
  })

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    
    trigger(data)
  }

  return (
    <div className='flex flex-col gap-4 mx-[10%]'>
      <h1 className='text-center font-bold text-xl'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' className='border rounded-lg p-2' {...register("email", {required: "Email is required"})}/>
            {errors.email && <small className='text-xs text-red-600'>{errors.email.message}</small>}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='password'>Password</label>
            <div className='relative'>
              <input type={toggleVisiblePassword ? 'text' : 'password'} id='password' className='w-full border rounded-lg p-2' 
                {...register("password", {required: "Password is required", minLength: {value: 7, message: "Password must be at least 7 characters"}})}
              />
              <div className='absolute inset-y-0 pr-3 flex right-0 items-center cursor-pointer' onClick={() => setToggleVisiblePassword(p => !p)}>
                {toggleVisiblePassword ? <IoMdEyeOff className="text-base md:text-lg"/> : <IoMdEye className="text-base md:text-lg"/>}
              </div>
            </div>
            {errors.password && <small className='text-xs text-red-600'>{errors.password.message}</small>}
          </div>

          {error && <p className='text-center text-sm text-red-600'>{error.message}</p>}

          <Button type='submit' loading={isMutating}>Login</Button>
      </form>
    </div>
  )
}

export default LoginForm