function simpleBlockToText(block) {
  if (!block) return ''
  if (typeof block === 'string') return block
  if (Array.isArray(block.children)) return block.children.map(c => c.text || '').join('')
  return ''
}

export default function RichText({ value }) {
  if (!value) return null
  if (typeof value === 'string') return <div className="space-y-4">{value.split(/\n+/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
  if (Array.isArray(value)) {
    return <div className="space-y-4">{value.map((block, i) => <p key={i}>{simpleBlockToText(block)}</p>)}</div>
  }
  return null
}