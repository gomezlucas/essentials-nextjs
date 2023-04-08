const BASE_URL_NASA = 'https://api.nasa.gov/planetary/apod'
const API_KEY_NASA =process.env.NEXT_PUBLIC_API_KEY_NASA 


const fetcher = async(queryParams?:String)=>{
    try {
        const response = await fetch(`${BASE_URL_NASA}?api_key=${API_KEY_NASA}${queryParams?.length ? queryParams : ''}`)
        const data =  await response.json()

     return   Promise.resolve(data)

    } catch (error) {
        return Promise.reject(error)
    }
}

export default fetcher