import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({token,account}){
      if (account){
          token.access_Token = 'pepe pepito '
      }

      return {...token, ...account}
    },  
    async session({session,token ,user}){
      console.log('------sesion------------------------------------------------')
      session.user = token 

      console.log(session.user)  

      return session
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