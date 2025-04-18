'use client'
import "@/app/testStyle/style.scss"

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'




const PostViewer = ({content= "Hello World! 🌎️"}: {content?: string}) => {
  
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,      
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ]

  const editor = new Editor({
    extensions,
    content: content,
    autofocus: true,
    editable: false,
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default PostViewer