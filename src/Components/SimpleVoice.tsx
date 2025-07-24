import { useEffect, useRef, useState } from 'react';

export default function SimpleVoice() {
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef<any>(null); // usar "any" porque SpeechRecognition no está bien tipado en todos los navegadores

    useEffect(() => {
        const SpeechRecognition =
            (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

        if (!SpeechRecognition) {
            alert('Tu navegador no soporta reconocimiento de voz');
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const result = event.results[event.results.length - 1][0].transcript;
            setText((prev) => prev + ' ' + result);
        };

        recognition.onend = () => {
            if (listening) {
                recognition.start(); // reiniciar si se esperaba continuar escuchando
            } else {
                setListening(false);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event);
            if (event.error === 'network') {
                alert('Error de red: el reconocimiento de voz necesita conexión a internet.');
                setListening(false);
            }
        };


        recognitionRef.current = recognition;
    }, [listening]);

    const start = () => {
        if (recognitionRef.current && !listening) {
            recognitionRef.current.start();
            setListening(true);
        }
    };

    const stop = () => {
        if (recognitionRef.current && listening) {
            recognitionRef.current.stop();
            setListening(false);
        }
    };

    return (
        <div style={{ padding: '1rem', border: '1px solid #aaa', borderRadius: '8px' }}>
            <h3>Reconocimiento de Voz (Simple)</h3>
            <p><strong>Escuchando:</strong> {listening ? 'Sí' : 'No'}</p>
            <p><strong>Texto detectado:</strong> {text}</p>
            <button onClick={start} disabled={listening}>Iniciar</button>
            <button onClick={stop} disabled={!listening}>Detener</button>
        </div>
    );
}
