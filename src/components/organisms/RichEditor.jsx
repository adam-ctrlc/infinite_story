'use client'

import { useRef, useState, useCallback } from 'react'
import { useEditor, EditorContent, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ImageExt from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import LinkExt from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import {
  Bold, Italic, Underline as UnderlineIcon,
  Heading2, Heading3, Quote, Link, ImageIcon,
  Minus, List, ListOrdered, Strikethrough,
} from 'lucide-react'

function Sep() {
  return <div className="w-px h-5 bg-[#e6e6e6] mx-1 shrink-0" />
}

function ToolBtn({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`p-1.5 rounded transition-colors ${
        active
          ? 'bg-[#242424] text-white'
          : 'text-[#6b6b6b] hover:text-[#242424] hover:bg-[#f2f2f2]'
      }`}
    >
      {children}
    </button>
  )
}

function Toolbar({ editor, showLink, setShowLink, linkUrl, setLinkUrl, applyLink, onImageClick }) {
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      bold: ctx.editor.isActive('bold'),
      italic: ctx.editor.isActive('italic'),
      underline: ctx.editor.isActive('underline'),
      strike: ctx.editor.isActive('strike'),
      h2: ctx.editor.isActive('heading', { level: 2 }),
      h3: ctx.editor.isActive('heading', { level: 3 }),
      blockquote: ctx.editor.isActive('blockquote'),
      bulletList: ctx.editor.isActive('bulletList'),
      orderedList: ctx.editor.isActive('orderedList'),
      link: ctx.editor.isActive('link'),
    }),
  })

  if (showLink) {
    return (
      <div className="flex items-center gap-2 w-full">
        <label htmlFor="editor-link-url" className="sr-only">Link URL</label>
        <input
          id="editor-link-url"
          name="link-url"
          autoFocus
          type="url"
          autoComplete="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && applyLink()}
          placeholder="https://"
          className="flex-1 text-sm text-[#242424] border border-[#e6e6e6] rounded px-3 py-1 outline-none focus:border-[#242424]"
        />
        <button type="button" onMouseDown={(e) => { e.preventDefault(); applyLink() }}
          className="text-sm px-3 py-1 bg-[#242424] text-white rounded hover:bg-[#3d3d3d] transition-colors">
          Apply
        </button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); setShowLink(false) }}
          className="text-sm px-3 py-1 border border-[#e6e6e6] rounded text-[#6b6b6b] hover:text-[#242424] transition-colors">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <>
      <ToolBtn active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold (Ctrl+B)">
        <Bold size={15} />
      </ToolBtn>
      <ToolBtn active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic (Ctrl+I)">
        <Italic size={15} />
      </ToolBtn>
      <ToolBtn active={state.underline} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline (Ctrl+U)">
        <UnderlineIcon size={15} />
      </ToolBtn>
      <ToolBtn active={state.strike} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
        <Strikethrough size={15} />
      </ToolBtn>

      <Sep />

      <ToolBtn active={state.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
        <Heading2 size={15} />
      </ToolBtn>
      <ToolBtn active={state.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
        <Heading3 size={15} />
      </ToolBtn>

      <Sep />

      <ToolBtn active={state.blockquote} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
        <Quote size={15} />
      </ToolBtn>
      <ToolBtn active={state.bulletList} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
        <List size={15} />
      </ToolBtn>
      <ToolBtn active={state.orderedList} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">
        <ListOrdered size={15} />
      </ToolBtn>

      <Sep />

      <ToolBtn active={state.link} onClick={() => setShowLink(true)} title="Link">
        <Link size={15} />
      </ToolBtn>
      <ToolBtn active={false} onClick={onImageClick} title="Insert image">
        <ImageIcon size={15} />
      </ToolBtn>
      <ToolBtn active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider line">
        <Minus size={15} />
      </ToolBtn>
    </>
  )
}

export default function RichEditor({ onChange, placeholder = 'Tell your story...' }) {
  const fileRef = useRef(null)
  const [linkUrl, setLinkUrl] = useState('')
  const [showLink, setShowLink] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ImageExt.configure({ inline: false, allowBase64: true }),
      Placeholder.configure({ placeholder }),
      LinkExt.configure({ openOnClick: false }),
    ],
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: { class: 'focus:outline-none min-h-[320px]' },
    },
  })

  const handleImageFile = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      editor.chain().focus().setImage({ src: ev.target.result }).run()
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [editor])

  const applyLink = useCallback(() => {
    if (!editor) return
    if (linkUrl) editor.chain().focus().setLink({ href: linkUrl }).run()
    else editor.chain().focus().unsetLink().run()
    setLinkUrl('')
    setShowLink(false)
  }, [editor, linkUrl])

  if (!editor) return null

  return (
    <div className="tiptap-editor">
      <div className="sticky top-14 z-30 bg-white border-b border-[#e6e6e6] mb-6 -mx-6 px-6 py-2 flex flex-wrap items-center gap-0.5">
        <Toolbar
          editor={editor}
          showLink={showLink}
          setShowLink={setShowLink}
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          applyLink={applyLink}
          onImageClick={() => fileRef.current?.click()}
        />
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />

      <EditorContent editor={editor} />
    </div>
  )
}
