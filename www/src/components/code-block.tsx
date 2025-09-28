import { useState } from 'react'

interface CodeBlockProps {
    code: string
    language?: string
    title?: string
}

export const CodeBlock = ({ code, language = 'javascript', title }: CodeBlockProps) => {
    const [copied, setCopied] = useState(false)

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    return (
        <div className='code-block'>
            {(title || language) && (
                <div className='code-block-header'>
                    <div className='code-block-title'>{title || language}</div>
                    <button className='copy-button' onClick={copyToClipboard}>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            )}
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    )
}
