import { log } from "console"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID as any,
      clientSecret: process.env.CLIENT_SECRET as any,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  secret: process.env.CLIENT_SECRET,
  callbacks: {
    async session({ session, user, token }) {
      // console.log("El token es: ", token.ok)
      if ((!token.ok) || (token.ok != 200)){
         session = {}
         return session
      }
      session.accessToken = token.accessToken
      return session
    },
    async jwt({ token, user, account, profile }) {
      console.log("Profile: ", JSON.stringify(profile))
       if (user) {
         const ok = await fetch (
          "http://localhost:8080/login", {
            method: 'POST',
            headers: {
              Accept: 'application.json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile),
            cache: 'default'
          })
        // consulta al back para que me de  ok  voy con el user
        token.ok = ok.status
        console.log("Status: ", token.ok)
        // console.log("Respuesta: ", ok.body)
        const res = await ok.json()
        console.log("Token: ", res.token)
        token.accessToken = res.token
       }
       return token
    }
  },
}

export default NextAuth(authOptions)


/*    async jwt({token, account, user}){
      console.log('------token------------------------------------------------')
      if (user) {
        token = { accessToken: user.accessToken }
      }
       return token
    },
    async session({session,token}){
      console.log('------sesion------------------------------------------------')
      session.accessToken = token.accessToken
      

      console.log(session)
      return session
    }*/