import React, { useState, useRef, useCallback } from 'react'
import ReactCrop from 'react-image-crop'
import type { PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import type { UseFormSetValue } from 'react-hook-form'
import type { CeramicForm } from '../../types'



type ImageSubmitProps = {
    setValue: UseFormSetValue<CeramicForm>
}

export default function ImageSubmit({ setValue }: ImageSubmitProps) {
    const initialImageSrc = 'selectImage.jpg'
    const [imageSrc, setImageSrc] = useState<string>(initialImageSrc);
    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [isCropping, setIsCropping] = useState<boolean>(false);
    const [crop, setCrop] = useState<PercentCrop>({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onloadend = () => {
            // Vista previa
            setImageSrc(reader.result as string);
            // Reiniciar crop
            setCrop({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
            setCompletedCrop(null);
            setIsCropping(false);
            // Guardar el archivo original para enviar si no recortan
            setCroppedFile(file);            
            setValue('imagen', file);
        };

        reader.readAsDataURL(file);
    };

    const handleImageCrop = useCallback(() => {
        if (!completedCrop || !imgRef.current) return;
        const image = imgRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const pixelCrop = {
            x: completedCrop.x * scaleX,
            y: completedCrop.y * scaleY,
            width: completedCrop.width * scaleX,
            height: completedCrop.height * scaleY,
        };
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );
        canvas.toBlob(blob => {
            if (!blob) return;
            // crear File desde Blob
            const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' });
            setCroppedFile(file);
            
            // actualizar preview
            const dataUrl = URL.createObjectURL(blob);
            setImageSrc(dataUrl);
            setIsCropping(false);
            
        }, 'image/jpeg');
        
    }, [completedCrop]);



    return (
        <section className="image-submit">
            {!isCropping ? (<>
                <h3 className='image-submit__title'>Imagen seleccionada</h3>
                <div className='image-preview-container'>
                    <img className='image-preview' src={imageSrc} width={200} alt="preview" />
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imageSrc !== initialImageSrc && (
                    <button onClick={() => setIsCropping(true)} className="btn btn-primary">
                        Recortar imagen
                    </button>
                )}

            </>) : (<>
                <h3 className='image-submit__title'>Recorte de imagen</h3>
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={pixelCrop => setCompletedCrop(pixelCrop)}
                    keepSelection
                >
                    <img ref={imgRef} src={imageSrc} alt="to be cropped" style={{ maxWidth: '100%', maxHeight: '60vh' }} />
                </ReactCrop>

                <button onClick={handleImageCrop} className="btn btn-success">
                    Guardar recorte
                </button>
                <button onClick={() => setIsCropping(false)} className="btn btn-danger">
                    Cancelar recorte
                </button>
            </>)}
        </section>
    );
}
