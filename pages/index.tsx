import Layout from "../components/layout"
import { useSession, signIn, signOut } from "next-auth/react"

export default function IndexPage() {
  const { data } = useSession()
  console.log(data)
 
   return (
    <Layout>
      <h1>NextAuth.js Example</h1>
      <div>Access Token: </div>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
 
      </p>
    </Layout>
  )
}
