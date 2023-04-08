import fetcher from '@essentials-nextjs/utils/fetcher'
import { ImageType } from "@essentials-nextjs/types"

type ImageDateType = {
    image: ImageType
}

type StaticPropsType = {
    params: any
}

const ImageDate = ({ image }: ImageDateType) => {
     return (
        <div>
            <h2>{image.title}</h2>
            <img src={image.url} alt={image.title} />
            <h3>{image.date}</h3>
            <p>{image.explanation}</p>
        </div>
    )
}


export async function getServerSideProps({ params }: StaticPropsType) {
    const { date } = params
    try {
        const image = await fetcher(`&date=${date}`)
        console.log(image)
        return {
            props: {
                image
            }
        }
    } catch (error) {
        console.log(error)
        return {}
    }
}



export default ImageDate