
import {  useRouter } from 'next/router'
import { ImageType } from '@essentials-nextjs/types'


const ImageOfTheDay = ({ title, url, date }: ImageType) => {
    const router = useRouter()
    return (
        <div>
            <img src={url} alt={title}  onClick={()=>router.push(`image/${date}`)}/>
            <h2> {title} </h2>
        </div>
    )
}


export default ImageOfTheDay 