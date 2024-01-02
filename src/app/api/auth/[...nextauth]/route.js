import db  from "../../../../libs/prisma";
import NextAuth from "next-auth/next";
import CredentialsProviders from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions = {
    secret:'palabrasecreta',
    providers:[
        CredentialsProviders({
            name:"Credentials",
            credentials: {
                email: {label: "Email", type: "text", placeholder:"jsmith"},
                password: {label: "Password", type: "password", placeholder:"******"},
            },
            async authorize(credentials, req) {
                console.log('credentials', credentials)
                //return null 
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound) throw new Error('User not found')
                console.log('userFound', userFound)
                const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
                if (!matchPassword) {
                    throw new Error('Password incorrect!!')
                }
                return {
                    id: userFound.id,
                    name: userFound.username,
                    email:userFound.email
                }
            }
        })
    ] ,
    
    pages: {
        signIn: "/auth/login"
    }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
