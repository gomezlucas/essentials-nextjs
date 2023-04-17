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
  callbacks: {
    async session({ session, user, token }) {
      if (!token.username){
         session = {}
      }

      return session
    },
    async jwt({ token, user, account, profile }) {
        
      console.log(token,"this is the token")
       if (user) {
        // consulta al back para que me de  ok  voy con el user
         const name = 'Pepe Pompin'
         token.username = name
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