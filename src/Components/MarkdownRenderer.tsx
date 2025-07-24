// src/components/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getImageSource } from '../utils/utils'
import type { CeramicDetails } from '../types'

interface MarkdownRendererProps {
  content: string
  principal: string | undefined | null
  isLast: boolean
  images: string[]
  confianza?:CeramicDetails['probabilidadPrincipal']
}

export default function MarkdownRenderer({ content, principal, isLast, images, confianza }: MarkdownRendererProps) {

  return (
    <div className='markdown'>
      <div className='markdown__title'>
        <img src="icon_v2.png" width={20} alt="icon_SmartCeramic_Advisor" />
        <p className='markdown__title__text'>SmartCeramic Advisor:</p>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      {isLast && principal &&
        <div className='container-main-images'>
          <h1>Confianza: {confianza}%</h1>
          <div className="ceramic-container-other__images">
            {images && images.map((imagen, index) => (
              <div key={index} className="ceramic-container-other__image">
                <img
                  className="ceramic-other__image"
                  width={200}
                  src={getImageSource(imagen)}
                  alt={`Cerámica ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      }

    </div>
  )
}
