// src/components/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
  principal: string | undefined | null
  isLast: boolean
}

export default function MarkdownRenderer({ content, principal, isLast }: MarkdownRendererProps) {

  return (
    <div className='markdown'>
      <div className='markdown__title'>
        <img src="icon_v2.png" width={20} alt="icon_SmartCeramic_Advisor" />
        <p className='markdown__title__text'>SmartCeramic Advisor:</p>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      {isLast && principal &&
        <section>
          <div>
            <img width={100} src="selectImage.jpg" alt="" />
          </div>
        </section>
      }

    </div>
  )
}
