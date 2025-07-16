// src/components/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className='markdown'>
      <div className='markdown__title'>
        <img src="icon.png" width={20} alt="icon_SmartCeramic_Advisor" />
        <p className='markdown__title__text'>SmartCeramic Advisor:</p>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}
