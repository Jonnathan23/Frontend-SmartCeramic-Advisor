import React, { useState, useRef, useCallback, type Dispatch } from 'react'
import ReactCrop from 'react-image-crop'
import type { PixelCrop, PercentCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useMutation } from '@tanstack/react-query'

import { toast } from 'react-toastify'
import type { CeramicDetails } from '../../types'


type ImageSubmitProps = {
    setCeramic: Dispatch<React.SetStateAction<CeramicDetails | null>>
}

export default function ImageSubmit({ setCeramic }: ImageSubmitProps) {
    const [imageSrc, setImageSrc] = useState<string>('');
    const [croppedFile, setCroppedFile] = useState<File | null>(null);
    const [isCropping, setIsCropping] = useState<boolean>(false);
    const [crop, setCrop] = useState<PercentCrop>({ unit: '%', x: 0, y: 0, width: 100, height: 100 });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const { mutate: submitMutation, isPending, isError } = useMutation({
        //TODO: mutationFn: submitImage,
        mutationFn: async () => toast.info('Simulando envío de imagen'),
        //TODO:
        /*
        onSuccess: (data) => {
            setCeramic(data as CeramicDetails)
            toast.success('Imagen enviada correctamente');
        },*/
        //onSuccess: () => toast.success('Image uploaded successfully'),
        onError: () => {
            toast.error('Upload failed')
            setCeramic(null);
        }
    });

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

    const handleSubmitImage = () => {
        if (!croppedFile) {
            console.warn('No hay imagen recortada para enviar');
            return;
        }
        //TODO: submitMutation({ file: croppedFile });
        submitMutation();
        console.log('Imagen enviada:', croppedFile);
    };

    if (isError) return <p>Error al subir la imagen.</p>;

    return (
        <section>
            {!isCropping ? (<>
                <h3>Imagen seleccionada</h3>
                {imageSrc && <img src={imageSrc} width={200} alt="preview" />}
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {imageSrc && (
                    <button onClick={() => setIsCropping(true)} className="btn btn-primary">
                        Recortar imagen
                    </button>
                )}
                {croppedFile && (
                    <button onClick={handleSubmitImage} className="btn btn-success" disabled={isPending}>
                        {isPending ? 'Enviando...' : 'Enviar imagen al backend'}
                    </button>
                )}
                {isError && <p className="text-danger">Error al subir la imagen.</p>}

            </>) : (<>
                <h3>Recorte de imagen</h3>
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
