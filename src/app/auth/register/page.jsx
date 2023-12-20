// import { useForm } from "react-hook-form";
"use client" 
import { useForm }  from "react-hook-form";
import {useRouter} from 'next/navigation'

const RegisterPAge = () => {
    const { register, handleSubmit, formState: {errors} } = useForm()

    const router = useRouter()
    const onSubmit = handleSubmit( async data => {
        if (data.password !== data.confirmpassword) {
            return alert('Password do not match')
        }
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
       // const resJson = await res.json()
        //console.log('resJson', resJson)
        if (res.ok) {
            router.push('/auth/login')
        }
        console.log('errors', errors)

    })
    

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
        
        <form onSubmit={onSubmit} className="w-1/4" noValidate>
            <h1 className="text-slate-200 font-bld text-4xl">Register</h1>
            <label htmlFor="username" className="text-slate-500 mb-2">Username</label>
            <input name="username" type="text"  {...register('username',{ required: {
                value: true,  message: 'Username is required'
            }})}
                className= "p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="your username"
            />
            {
                errors.username && (
                    <span className="text-red-500">{errors.username.message}</span>
                )
            }
            <label htmlFor="email" className="text-slate-500 mb-2">Email</label>
            <input type="email"  {...register('email',{ 
                required:
                {
                    value: true,  message: 'Email is required'
                }
            })} 
                className= "p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="creshe24@hotmail.gmail"
            />

            {
            errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )
            }

            <label htmlFor="password" className="text-slate-500 mb-2">Password</label>
            <input type="password"  {...register('password',{
                 required: {
                    value: true,  message: 'Password is required'
                }
                })}
                className= "p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="*******"
            />

            {
            errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )
            }

            <label htmlFor="password2" className="text-slate-500 mb-2">Confirm password</label>
            <input type="password"  {...register('confirmpassword',{ required:
             {
                value: true,  message: 'Confirm password is required'
            }})} 
                className= "p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="*******"
            />
                       {
            errors.confirmpassword && (
                    <span className="text-red-500">{errors.confirmpassword.message}</span>
                )
            }
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
                Register
            </button>
        </form>
    
    </div>
  )
}

export default RegisterPAge