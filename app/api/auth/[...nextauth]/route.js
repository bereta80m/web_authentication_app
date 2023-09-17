import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'
import User from "@/models/User";
import { signJwtToken } from "@/lib/jwt";
import bycript from 'bcryptjs'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/connectDB";


const handler = NextAuth({
    providers: [
          GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
          }),
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text', placeholder: 'John Doe'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req){
                const {email, password} = credentials

                await db.connect()       
                const user = await User.findOne({ email })

                if(!user){
                    throw new Error("Invalid input")
                }
                const comparePass = await bycript.compare(password, user.password)

                if(!comparePass){
                    throw new Error("Invalid input")
                } else {
                    const {password, ...currentUser} = user._doc
                    const accessToken = signJwtToken(currentUser, {expiresIn: '6d'})

                    return {
                        ...currentUser,
                        accessToken
                    }
                }
            }
        })
    ],
    pages: {
        signIn: '/Login'
    },
    callbacks: {
        async signIn({user, account, profile}) {
            if (account.provider === 'github' || account.provider === 'google') {  
              try {
               await db.connect()
                // Check if the user already exists in your MongoDB
                const existingUser = await User.findOne({ email: user.email })
                if (!existingUser) {
                  // User doesn't exist, save their credentials
                  const pass = '123456-hash'+'temp'
                  const hashedPassword = await bycript.hash(pass, 10)
                  const newUser = await User.create({username:user.name, name:user.name, email:user.email, password: hashedPassword,bio:"No data",image:user.image,phoneNumber:"No number"})
    
                }
              } catch (error) {
                console.error('Error saving user in MongoDB:', error)
              }
            }
            return true // Continue the sign-in process
          },
        async jwt({token, user}){
            if(user){
                token.accessToken = user.accessToken
                token._id = user._id
            }
            return token
        },
        async session({session, token}){
            if(token){

                session.user._id = token._id
                session.user.accessToken = token.accessToken
            }

            return session
        }
    }
})

export {handler as GET, handler as POST}