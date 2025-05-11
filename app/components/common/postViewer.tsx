'use client'
import "@/app/theme/style.scss"

import { Editor, EditorContent } from '@tiptap/react'
import { EditorExtensions } from "./postEditor"


const PostViewer = ({content}: {content?: string}) => {

  const editor = new Editor({
    extensions: EditorExtensions,
    content: content,
    editable: false,
  })

  return (<EditorContent editor={editor} />)
}

export default PostViewer