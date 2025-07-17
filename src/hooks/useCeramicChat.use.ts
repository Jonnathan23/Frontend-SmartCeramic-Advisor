import { type Dispatch, type SetStateAction } from "react"
//import ReactCrop from 'react-image-crop'
//import type { PixelCrop, PercentCrop } from 'react-image-crop'
import type { CeramicForm } from "../types"
import type { UseFormSetValue } from "react-hook-form"

type UseCeramicChatProps = {
    setImageSrc: Dispatch<SetStateAction<string>>
    setValue: UseFormSetValue<CeramicForm>
}


export const useCeramicChat = ({ setImageSrc, setValue }: UseCeramicChatProps) => {

    //const [croppedFile, setCroppedFile] = useState<File | null>(null)
    //const [isCroppingMode, setIsCroppingMode] = useState<boolean>(false)
    //const [percentCrop, setPercentCrop] = useState<PercentCrop>({ unit: '%', x: 0, y: 0, width: 100, height: 100 })
    //const [pixelCrop, setPixelCrop] = useState<PixelCrop | null>(null)
    //const imageRef = useRef<HTMLImageElement | null>(null)
    //* Envents

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const previewUrl = reader.result as string
            setImageSrc(previewUrl)
            //setPercentCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 })
            //setPixelCrop(null)
            //setIsCroppingMode(false)
            //// setCroppedFile(file) 
            setValue('imagen', file)
        }
        reader.readAsDataURL(file)
    }
    return {
        handleImageChange
    }
}