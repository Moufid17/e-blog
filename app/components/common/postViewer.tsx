'use client'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import "@/app/testStyle/style.scss"
import { useEffect, useState } from 'react'



const PostViewer = ({content= "Hello World! 🌎️"}: {content?: string}) => {
  const [data, setData] = useState<string>(content)
  const [editord, setEDitord] = useState<Editor | null>(null)
  
  
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    // TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]
  const editor = new Editor({
    extensions,
    content: content,
    autofocus: true,
    editable: false,
  })

  // useEffect(() => {
  //   editor.setOptions({
  //     extensions,
  //     content: data,
  //     autofocus: true,
  //     editable: false,
  //   })
  // },[data])

  // useEffect(() => {
  //   setData(content)
  //   const editor = new Editor({
  //     extensions,
  //     content: content,
  //     autofocus: true,
  //     editable: false,
  //   })
  //   setEDitord(editor)
  // },[])


  return (
      <EditorContent editor={editor} />
  )
}

export default PostViewer