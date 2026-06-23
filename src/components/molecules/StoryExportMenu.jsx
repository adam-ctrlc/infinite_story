'use client'

import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal, FileText, FileDown, AlignLeft } from 'lucide-react'

export default function StoryExportMenu({ title, content, author }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const authorName = typeof author === 'string' ? author : author?.name || 'Unknown'

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    setOpen(false)
  }

  function exportText() {
    const text = [title && `${title}\n`, `By ${authorName}\n`, `\n${content}`]
      .filter(Boolean).join('')
    triggerDownload(new Blob([text], { type: 'text/plain' }), `${title || 'story'}.txt`)
  }

  function exportWord() {
    const html = `<html><head><meta charset="utf-8"><title>${title || 'Story'}</title></head><body style="font-family:Georgia,serif;max-width:600px;margin:40px auto;line-height:1.8">${title ? `<h1>${title}</h1>` : ''}<p style="color:#666;margin-bottom:2em">By ${authorName}</p><p style="font-size:1.1em">${content}</p></body></html>`
    triggerDownload(new Blob([html], { type: 'application/msword' }), `${title || 'story'}.doc`)
  }

  function exportPDF() {
    const win = window.open('', '_blank')
    win.document.write(`<!DOCTYPE html><html><head><title>${title || 'Story'}</title><style>body{font-family:Georgia,serif;max-width:620px;margin:48px auto;line-height:1.9;color:#242424;font-size:18px}h1{font-size:2em;margin-bottom:.3em;line-height:1.2}.meta{color:#6b6b6b;margin-bottom:2em;font-size:.85em}p{margin:0}</style></head><body>${title ? `<h1>${title}</h1>` : ''}<div class="meta">By ${authorName}</div><p>${content}</p></body></html>`)
    win.document.close()
    win.focus()
    win.print()
    setOpen(false)
  }

  const options = [
    { label: 'Export as PDF', icon: FileText, action: exportPDF },
    { label: 'Export as Word', icon: FileDown, action: exportWord },
    { label: 'Export as Text', icon: AlignLeft, action: exportText },
  ]

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full text-[#6b6b6b] hover:text-[#242424] hover:bg-[#f2f2f2] transition-colors"
        aria-label="Export options"
      >
        <MoreHorizontal size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-52 bg-white border border-[#e6e6e6] rounded-sm z-50 py-1">
          {options.map(({ label, icon: Icon, action }) => (
            <button
              key={label}
              onClick={action}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#242424] hover:bg-[#fafafa] transition-colors text-left"
            >
              <Icon size={14} className="text-[#6b6b6b] shrink-0" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
