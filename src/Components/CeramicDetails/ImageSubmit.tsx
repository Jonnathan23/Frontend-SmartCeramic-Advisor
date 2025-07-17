import React, { useState, useRef, useCallback, useEffect } from 'react'
import ReactCrop from 'react-image-crop'
import type { PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import type { UseFormReset, UseFormSetValue } from 'react-hook-form'
import type { CeramicForm } from '../../types'


type ImageSubmitProps = {
    setValue: UseFormSetValue<CeramicForm>
    reset: UseFormReset<CeramicForm>
}

export default function ImageSubmit({ setValue, reset }: ImageSubmitProps) {
    const initialImageSrc = 'selectImage.jpg'
    const [imageSrc, setImageSrc] = useState<string>(initialImageSrc)
    //const [croppedFile, setCroppedFile] = useState<File | null>(null)
    const [isCroppingMode, setIsCroppingMode] = useState<boolean>(false)
    const [percentCrop, setPercentCrop] = useState<PercentCrop>({ unit: '%', x: 0, y: 0, width: 100, height: 100 })
    const [pixelCrop, setPixelCrop] = useState<PixelCrop | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        console.log('reset')
        setImageSrc(initialImageSrc)
    }, [reset])


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            const previewUrl = reader.result as string
            setImageSrc(previewUrl)
            setPercentCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 })
            setPixelCrop(null)
            setIsCroppingMode(false)
            // setCroppedFile(file)
            setValue('imagen', file)
        }
        reader.readAsDataURL(file)
    }

    async function getCroppedBlob(image: HTMLImageElement, crop: PixelCrop): Promise<Blob> {
        const { naturalWidth, naturalHeight, width: displayedWidth, height: displayedHeight } = image
        const scaleX = naturalWidth / displayedWidth
        const scaleY = naturalHeight / displayedHeight
        const actualCrop = {
            x: crop.x * scaleX,
            y: crop.y * scaleY,
            width: crop.width * scaleX,
            height: crop.height * scaleY
        }

        const canvas = document.createElement('canvas')
        canvas.width = Math.round(actualCrop.width)
        canvas.height = Math.round(actualCrop.height)

        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('No canvas context')

        ctx.drawImage(
            image,
            actualCrop.x,
            actualCrop.y,
            actualCrop.width,
            actualCrop.height,
            0,
            0,
            actualCrop.width,
            actualCrop.height
        )

        return new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(blob => {
                if (blob) resolve(blob)
                else reject(new Error('Canvas is empty'))
            }, 'image/jpeg')
        })
    }

    const handleImageCrop = useCallback(async () => {
        if (!pixelCrop || !imageRef.current) return

        try {
            const blob = await getCroppedBlob(imageRef.current, pixelCrop)
            const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' })

            // Revoca URL previa si era blob
            if (imageSrc.startsWith('blob:')) {
                URL.revokeObjectURL(imageSrc)
            }

            const objectUrl = URL.createObjectURL(blob)
            // setCroppedFile(file)
            setImageSrc(objectUrl)
            setValue('imagen', file)
        } catch (error) {
            console.error('Crop failed:', error)
        } finally {
            setIsCroppingMode(false)
        }
    }, [pixelCrop, imageSrc, setValue])

    return (
        <section className="image-submit">
            {!isCroppingMode ? (
                <>
                    <h3 className="image-submit__title">Imagen seleccionada</h3>
                    <div className="image-preview-container">
                        <img className="image-preview" src={imageSrc} width={200} alt="preview" />
                    </div>
                    <div className='image-content-submit__input'>
                        <label className='image-input-label' htmlFor="image">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffffff"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >   
                                <path d="M15 8h.01" />
                                <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
                                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5" />
                                <path d="M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526" />
                                <path d="M19 22v-6" />
                                <path d="M22 19l-3 -3l-3 3" />
                            </svg>

                        </label>
                        <input className='image-input-file' type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    </div>
                    {imageSrc !== initialImageSrc && (
                        <button onClick={() => setIsCroppingMode(true)} className="btn btn-primary">
                            Recortar imagen
                        </button>
                    )}
                </>
            ) : (
                <>
                    <h3 className="image-submit__title">Recorte de imagen</h3>
                    <ReactCrop
                        crop={percentCrop}
                        onChange={(_, newPercentCrop) => setPercentCrop(newPercentCrop)}
                        onComplete={newPixelCrop => setPixelCrop(newPixelCrop)}
                        keepSelection
                    >
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="to be cropped"
                            style={{ maxWidth: '100%', maxHeight: '60vh' }}
                        />
                    </ReactCrop>
                    <button onClick={handleImageCrop} className="btn btn-success">
                        Guardar recorte
                    </button>
                    <button onClick={() => setIsCroppingMode(false)} className="btn btn-danger">
                        Cancelar recorte
                    </button>
                </>
            )}
        </section>
    )
}
