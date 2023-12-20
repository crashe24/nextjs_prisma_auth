"use client" 
import { useForm }  from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn}  from 'next-auth/react'
import { useState } from 'react'

const LoginPage = () => {
  const { register, handleSubmit, formState: {errors} } = useForm()
  const [ error,setError ] = useState(null)

  const router = useRouter()
  const onSubmit =  handleSubmit(async (data) => {
    console.log('data', data)
    const respuesta = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect:false
    })

    if (respuesta.error) {
      //alert(respuesta.error)
      setError(respuesta.error)
    } else {
      console.log('enviando a mi dashboard')
      router.push('/dashboard')
    }

    console.log('respuesta', respuesta)
  })

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form  className="w-1/4" noValidate onSubmit={onSubmit}>
        {
          error && (<p className="bg-red-500 text-lg p-3 text-white">{error}</p>)
        }
       <h1 className="text-slate-200 font-bld text-4xl">Login</h1>
        {/* email*/}
        <label  className="text-slate-500 mb-2">Email</label>
              <input name="email" type="text"  {...register('email',{ required: {
                  value: true,  message: 'email is required'
              }})}
                  className= "p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                  placeholder="your email"
              />
              {
                  errors.email && (
                      <span className="text-red-500">{errors.email.message}</span>
                  )
              }

        {/* password*/}
        <label  className="text-slate-500 mb-2">password</label>
              <input name="password" type="password"  {...register('password',{ required: {
                  value: true,  message: 'password is required'
              }})}
                  className= "p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                  placeholder="******"
              />
              {
                  errors.password && (
                      <span className="text-red-500">{errors.password.message}</span>
                  )
              }
          {/** boton */}
          <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                Login
            </button>
      </form>
    </div>
  )
}

export default LoginPage