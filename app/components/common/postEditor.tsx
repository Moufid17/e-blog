'use client'
import "@/app/testStyle/style.scss"


import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Button, CircularProgress, IconButton, Stack } from "@mui/joy"
import { Save } from "react-feather"
import { z } from "zod";

import { RobotIcon } from "@/app/components/common/icons/RobotIcon"
import { addPost, updatePost } from "@/app/actions/post"
import { GetPostType } from "@/app/common/types/posts"

const schema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
  })
});

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <Stack spacing={1} sx={{mb:3}}>
      <Stack direction="row"  sx={{bgcolor:"#000", justifyContent:"space-around", p: 1, borderRadius:5}}>
        <Button
          color={editor.isActive('bold') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          bold
        </Button>
        <Button
          color={editor.isActive('italic') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          italic
        </Button>
        <Button
          color={editor.isActive('strike') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
        >
          strike
        </Button>
        <Button
          color={editor.isActive('code') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
        >
          code
        </Button>
        <Button color={editor.isActive('unsetAllMarks') ? "warning" : "neutral"} onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </Button>
        <Button color={editor.isActive('clearNodes') ? "warning" : "neutral"} onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </Button>
        <Button
          color={editor.isActive('paragraph') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          paragraph
        </Button>
        <Button
          color={editor.isActive('heading', { level: 1 }) ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          Title 1
        </Button>
        <Button
          color={editor.isActive('heading', { level: 2 }) ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          Title 2
        </Button>
        <Button
          color={editor.isActive('heading', { level: 3 }) ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          Title 3
        </Button>
        
        <Button
          color={editor.isActive('bulletList') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          bullet list
        </Button>
        <Button
          color={editor.isActive('orderedList') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          ordered list
        </Button>
        <Button
          color={editor.isActive('codeBlock') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          code block
        </Button>
        <Button
          color={editor.isActive('blockquote') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          blockquote
        </Button>
        <Button color={editor.isActive('bold') ? "warning" : "neutral"} onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </Button>
        <Button color={editor.isActive('bold') ? "warning" : "neutral"} onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </Button>
        <Button
          color={editor.isActive('undo') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          undo
        </Button>
        <Button
          color={editor.isActive('redo') ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          redo
        </Button>
      </Stack>
      <hr/>
    </Stack>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  // TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs
    },
  }),
]

const PostEditorActions = ({post, newDescription, isNewPost, setter}: {post: GetPostType, newDescription: string, isNewPost: boolean, setter: (value: string) => void}) => {
  const router = useRouter()

  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handlePostAddButtonClick = async () => {
    if (post != null) {
      const { id, owner, ...data } = post 
      await addPost({post: {...data, description: newDescription, userId: session?.user?.id}}).then((res) => {
        alert("Créer avec succès")
        router.push(`/`)
        router.refresh()
      })
      
    } else {
      alert("Erreur lors de la création du post")
    }
  }

  const handlePostCancelChangeButtonClick = async () => {
    if (post != null) {
      setter(post.description)
      alert("Modifications ignorés avec succès") 
    } else {
      alert("Erreur du serveur")
    }
  }

  const handlePostSaveButtonClick = async () => {
    if (post != null) {
      const { owner, description, userId, ...data } = post
      if (userId === undefined) {
        alert("User ID is missing")
        return
      }
      await updatePost({post: {...data, userId, description: newDescription}})
      // router.push(`/posts/${post?.id}`)
      alert("Mise à jour avec succès")
      router.refresh()
    } else {
      alert("Error")
    }
  }

  const generateDescription = async (title: string) => {
    if (!post || !title) {
      alert("Error : Impossible de générer la description")
      return
    }
    setIsLoading(true)
    fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      return schema.parse(json);
    })
    .then((d) => {
      const descriptionHTML = d.message.content.replaceAll("<body>", "").replaceAll("</body>", "");
      setter(descriptionHTML)
    })
    .catch((error) => {
      console.error(error);
    }).finally
    (() => {
      setIsLoading(false)
    });
  }

  return (
    <Stack spacing={2} sx={{mt:3}}>
      <hr/>
      <Stack direction="row" spacing={2} justifyContent="center">
        <IconButton sx={{gap: 1, p: 1}} variant="outlined"  onClick={handlePostCancelChangeButtonClick}>
          Ignorer les modifications
        </IconButton>
        <IconButton sx={{bgcolor: "#0D0D0D", p: 1, gap: 1}} variant="solid" onClick={() => {
          if (post) {
            generateDescription(post.title)
          }
        }}>
          { isLoading ? <CircularProgress sx={{color: "#fff"}}/> : <RobotIcon/> }  Générer la description
        </IconButton>
        <IconButton sx={{bgcolor: "#0D0D0D", p: 1, gap: 1}} variant="solid" onClick={() => isNewPost ? handlePostAddButtonClick() : handlePostSaveButtonClick()}>
          <Save/> {isNewPost ? "Créer" : "Enregistrer"}
        </IconButton>
      </Stack>
    </Stack>
  )
}


const PostEditor = ({data, isNew}: {data: GetPostType, isNew: boolean}) => {
  const defaultContent = "<p>Hello World! 🌎️</p>"
  const [desc, setDesc] = useState<string>(defaultContent)
  const [editorKey, setEditorKey] = useState<number>(0)

  const handleDescriptionChange = (value: string) => {
    setDesc(value)
    setEditorKey((prev:number) => { return prev + 1 })
  }

  useEffect(() => {
    if (data && data.description.length > 0) {
      handleDescriptionChange(data.description) 
    }
  },[data])

  return (
    <Stack sx={{p:1, }}>
      <EditorProvider immediatelyRender={false} key={editorKey} slotBefore={<MenuBar />} extensions={extensions} content={desc} children={<PostEditorActions post={data} newDescription={desc} isNewPost={isNew} setter={handleDescriptionChange}/>} onUpdate={({editor})=>{
        handleDescriptionChange(editor.getHTML())
      }}
      />
    </Stack>
  )
}

export default PostEditor