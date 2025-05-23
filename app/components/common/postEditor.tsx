// [ ] image, table, math.
'use client'
import "@/app/theme/style.scss"

import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from "@tiptap/extension-highlight";
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import {  EditorContent, useEditor } from '@tiptap/react'
import MenuBar from '@/app/components/global/PostEditorMenu'
import { useCallback, useEffect } from "react"

interface IPostEditor {
  description: string;
  setDescription: (description: string) => void;
}

export const EditorExtensions =  [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-inside ml-3',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-disc list-inside ml-3',
      },
    },
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  Highlight,
  Underline,
  Subscript,
  Superscript,
  TaskList,
  TaskItem.configure({
    nested: false,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false
        }

        // disallowed protocols
        const disallowedProtocols = ['ftp', 'file', 'mailto']
        const protocol = parsedUrl.protocol.replace(':', '')

        if (disallowedProtocols.includes(protocol)) {
          return false
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

        if (!allowedProtocols.includes(protocol)) {
          return false
        }

        // disallowed domains
        // const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
        // const domain = parsedUrl.hostname

        // if (disallowedDomains.includes(domain)) {
        //   return false
        // }

        // all checks have passed
        return true
      } catch {
        return false
      }
    },
    shouldAutoLink: url => {
      try {
        // construct URL
        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
        const domain = parsedUrl.hostname

        return !disallowedDomains.includes(domain)
      } catch {
        return false
      }
    },
  })
]

const PostEditor = ({ description, setDescription }: IPostEditor) => {

  const editor = useEditor({
    extensions: EditorExtensions,
    content: description,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {  setDescription(editor.getHTML()) },
  });

  // [ ] Use dialog instead of window prompt
  const setLink = useCallback(() => {
    if (!editor) {
      return
    }
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) { return }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch (e: any) {
      alert(e.message)
    }
  }, [editor])

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(description)
    }
  }, [editor, description])

  return (
    <>
      <MenuBar editor={editor} setLink={() => setLink()}/>
      <EditorContent editor={editor} className="editor-content-custom" />
    </>
  );
};

export default PostEditor