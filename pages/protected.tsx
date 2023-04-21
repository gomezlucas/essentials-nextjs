import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import AccessDenied from "../components/access-denied"

export default function ProtectedPage() {
  const { data: session } = useSession()
  const [content, setContent] = useState()
  const [testData, setTestData] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    const fetchTest = async () => {
      if (session && session.accessToken){
        const headers = {
          'Authorization': 'Bearer ' + session.accessToken,
        };
        try {
        const res = await fetch ("http://localhost:8080/home", 
        {
          method: 'GET',
          headers: headers,
        })
        const json = await res.json()
        if (json.content) {
          setTestData(json.content)
        }
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the fetch request:', error);
      }
    }
    }
    fetchTest()
    fetchData()
  }, [session])
  console.log('La  session is: ', session)
   // If no session exists, display access denied message
  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    )
  }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      <p>
      <div>Access Token: {session.accessToken}</div>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Layout>
  )
}
