import { type Dispatch, type SetStateAction } from "react"
//import ReactCrop from 'react-image-crop'
//import type { PixelCrop, PercentCrop } from 'react-image-crop'
import type { CeramicDetails, CeramicForm } from "../types"
import type { UseFormSetValue } from "react-hook-form"
import { cleanCeramicDetailsStorage } from "../utils/utils"

type UseCeramicChatProps = {
    setImageSrc: Dispatch<SetStateAction<string>>
    setValue: UseFormSetValue<CeramicForm>
    setTextChat: Dispatch<SetStateAction<string[]>>
    setCeramic: React.Dispatch<React.SetStateAction<CeramicDetails | null>>
}


export const useCeramicChat = ({ setImageSrc, setValue }: Pick<UseCeramicChatProps, "setImageSrc" | "setValue">) => {

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

export const useNewMessage = ({ setImageSrc, setTextChat, setCeramic }: Pick<UseCeramicChatProps, "setImageSrc" | "setTextChat" | "setCeramic">) => {

    const newConversation = () => {
        cleanCeramicDetailsStorage()
        setImageSrc('')
        setTextChat([])
        setCeramic(null)
    }
    return { newConversation }
}