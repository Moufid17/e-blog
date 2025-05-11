// [ ] image, table, code, math, Link.
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
import {  EditorContent, useEditor } from '@tiptap/react'
import MenuBar from '@/app/components/global/PostEditorMenu'

interface PostEditorProps {
  description: string;
  setDescription: (description: string) => void;
}

const PostEditor = ({ description, setDescription }: PostEditorProps) => {

  const editor = useEditor({
    extensions: [
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
    ],
    content: description,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        // class: "min-height: 156px; border-width: 1px; background-color: rgb(248 250 252); border-radius: 6px; py:8px; px: 12px"
      },
    },
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editor-content-custom" />
    </>
  );
};

export default PostEditor