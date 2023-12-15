import  { NextResponse } from 'next/server'
import db from '../../../../libs/prisma'
import bcrypt from 'bcrypt'

export async function POST(request) {
    try {
        const data = await request.json()
        // console.log('data', data)
        const userFound =  await db.user.findUnique({
            where: {
            email: data.email 
            }
        })
        if (userFound) {
            return NextResponse.json({
                message: 'Email already exist'
            }, {
                status: 400
            })
        }

        const hashPassword = await bcrypt.hash(data.password, 10)
        //console.log('hashPassword:', hashPassword)
        const newUser = await db.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashPassword
            }
        })

        const {password: _,...user} = newUser
        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json({
            message: error.message
        }, {
            status:500
        })
    }
    
}