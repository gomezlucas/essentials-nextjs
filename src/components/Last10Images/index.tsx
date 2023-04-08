import { ImageType } from '@essentials-nextjs/types'
import {  useRouter } from 'next/router'


type last10ImagesType =
    {
        images: ImageType[]
    }

const Last10Images = ({ images }: last10ImagesType) => {

    const router = useRouter()
    return (
        <div>
            <h2>Últimos 10 días</h2>
            {images?.map((image, index) => (
                <div key={`last-10-images-${image.title}-${index}`}>
                    <img src={image.url} alt={image.title} onClick={()=>router.push(`image/${image.date}`)} />
                </div>
                )
            )}
        </div>
    )
}


export default Last10Images 