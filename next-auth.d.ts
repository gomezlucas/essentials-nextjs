import "next-auth/jwt"
import { User, Session, Token } from "next-auth"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation


 
declare module "next-auth" {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessToken: string;
    username?: string;
  }
  interface User {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessToken: string;
    username: string;
  }

}


declare module "next-auth/jwt" { 
  interface JWT {
    /** The user's role. */
    userRole?: "admin"
  }
 
}
