'use client'
import "@/app/testStyle/style.scss"


import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useEffect, useState } from 'react'
import { Button, CircularProgress, IconButton, Stack } from "@mui/joy"
import { Save } from "react-feather"
import { z } from "zod";

import { RobotIcon } from "@/app/components/common/icons/RobotIcon"
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
    <>
      <Stack key={"post_editor_menu_bar"} direction={{sx:"column", md:"row"}}  sx={{bgcolor:"#000", justifyContent:"space-around", p: 1, borderRadius:5, gap: 1}}>
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
        <Button
          color={editor.isActive('heading', { level: 1 }) ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          H1
        </Button>
        <Button
          color={editor.isActive('heading', { level: 2 }) ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </Button>
        <Button
          color={editor.isActive('heading', { level: 3 }) ? "warning" : "neutral"}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
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
    </>
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

const PostEditorActions = ({post, newDescription, addPost, editPost, isNewPost, setter}: {post: GetPostType, newDescription: string, addPost: ({ description }: { description: string }) => Promise<void>, editPost: ({ descriptionUpdate }: { descriptionUpdate: string }) => Promise<void>, isNewPost: boolean, setter: (value: string) => void, }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [desc, setDesc] = useState<string>(newDescription)

  const handlePostCancelChangeButtonClick = async () => {
    if (post != null) {
      setter(post.description)
      alert("Modifications ignorés avec succès") 
    } else {
      alert("Erreur du serveur")
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
      setter(descriptionHTML) // Update the editor content
      setDesc(descriptionHTML) // Update the state
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
          Ignore changements
        </IconButton>
        <IconButton sx={{bgcolor: "#0D0D0D", p: 1, gap: 1}} variant="solid" onClick={() => {
          if (post) {
            generateDescription(post.title)
          }
        }}>
          { isLoading ? <CircularProgress sx={{color: "#fff"}}/> : <RobotIcon/> }  Suggest description
        </IconButton>
        <IconButton sx={{bgcolor: "#0D0D0D", p: 1, gap: 1}} variant="solid" onClick={() => isNewPost ? addPost({description: desc}) : editPost({descriptionUpdate: desc})}>
          <Save/> {isNewPost ? "Create" : "Save"}
        </IconButton>
      </Stack>
    </Stack>
  )
}


interface PostEditorProps {
  data: GetPostType;
  isNew: boolean;
  addPost: ({ description }: { description: string }) => Promise<void>;
  editPost: ({ descriptionUpdate }: { descriptionUpdate: string }) => Promise<void>;
}

const PostEditor = ({ data, isNew, addPost, editPost,  }: PostEditorProps) => {
  
  const [desc, setDesc] = useState<string>(data?.description ?? "");
  const [editorKey, setEditorKey] = useState<number>(0);

  const handleDescriptionChange = (value: string) => {
    setDesc(value);
    setEditorKey((prev: number) => prev + 1);
  };

  useEffect(() => {
    if (data && data.description.length > 0) {
      handleDescriptionChange(data.description);
    }
  }, [data]);

  return (
    <Stack key={"post_editor"}>
      <EditorProvider
        immediatelyRender={false}
        key={editorKey}
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={desc}
        children={
          <PostEditorActions
            post={data}
            editPost={editPost}
            addPost={addPost}
            newDescription={desc}
            isNewPost={isNew}
            setter={handleDescriptionChange}
          />
        }
        onUpdate={({ editor }) => {
          handleDescriptionChange(editor.getHTML());
        }}
      />
    </Stack>
  );
};

export default PostEditor