'use client'
import "@/app/testStyle/style.scss"

import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'

import { useEffect, useRef, useState } from 'react'
import { CircularProgress, Divider, IconButton, Stack, ToggleButtonGroup } from "@mui/joy"
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Italic, List, Save } from "react-feather"
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
  if (!editor) return null
  

  return (
    <Stack >
      <Stack key={"post_editor_menu_bar"} direction={{sx:"column", md:"row"}} sx={{bgcolor:"#fff", justifyContent:"flex-start", p: 1, borderRadius:0, border: "1px solid #ccc", borderBottom: "none", gap: 3}}>
        <ToggleButtonGroup spacing={0.5} aria-label="text formatting">
          <IconButton aria-label="bold" 
            color={editor.isActive('bold') ? "primary" : "neutral"}
            variant={editor.isActive('bold') ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold />
          </IconButton>
          <IconButton aria-label="italic" 
            color={editor.isActive('italic') ? "primary" : "neutral"}
            variant={editor.isActive('italic') ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic />
          </IconButton>
        </ToggleButtonGroup>
        <Divider orientation="vertical"/>
        <ToggleButtonGroup spacing={0.5} aria-label="text formatting">
          <IconButton aria-label="title 1" 
            color={editor.isActive('heading', { level: 1 }) ? "primary" : "neutral"}
            variant={editor.isActive('heading', { level: 1 }) ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            disabled={editor.isActive('heading', { level: 2 }) || editor.isActive('heading', { level: 3 })}
          >
            H<sub>1</sub>
          </IconButton>
          <IconButton aria-label="title 2" 
            color={editor.isActive('heading', { level: 2 }) ? "primary" : "neutral"}
            variant={editor.isActive('heading', { level: 2 }) ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            disabled={editor.isActive('heading', { level: 1 }) || editor.isActive('heading', { level: 3 })}
          >
            H<sub>2</sub>
          </IconButton>
          <IconButton aria-label="title 3" 
            color={editor.isActive('heading', { level: 3 }) ? "primary" : "neutral"}
            variant={editor.isActive('heading', { level: 3 }) ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            disabled={editor.isActive('heading', { level: 1 }) || editor.isActive('heading', { level: 2 })}
          >
            H<sub>3</sub>
          </IconButton>
          <IconButton aria-label="left" 
            color={editor.isActive({ textAlign: 'left' }) ? "primary" : "neutral"}
            variant={editor.isActive({ textAlign: 'left' }) ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            disabled={editor.isActive({ textAlign: 'center' }) || editor.isActive({ textAlign: 'right' }) || editor.isActive({ textAlign: 'justify' })}
          >
            <AlignLeft />
          </IconButton>
          <IconButton aria-label="center" 
            color={editor.isActive({ textAlign: 'center' }) ? "primary" : "neutral"}
            variant={editor.isActive({ textAlign: 'center' }) ? "solid" : "outlined"}
            onClick={() => {editor.chain().focus().setTextAlign('center').run()}}
            disabled={editor.isActive({ textAlign: 'left' }) || editor.isActive({ textAlign: 'right' }) || editor.isActive({ textAlign: 'justify' })}
          >
            <AlignCenter />
          </IconButton>
          <IconButton aria-label="right" 
            color={editor.isActive({ textAlign: 'right' }) ? "primary" : "neutral"}
            variant={editor.isActive({ textAlign: 'right' }) ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            disabled={editor.isActive({ textAlign: 'center' }) || editor.isActive({ textAlign: 'left' }) || editor.isActive({ textAlign: 'justify' })}
          >
            <AlignRight/>
          </IconButton>
          <IconButton aria-label="justify" 
            color={editor.isActive({ textAlign: 'justify' }) ? "primary" : "neutral"}
            variant={editor.isActive({ textAlign: 'justify' }) ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            disabled={editor.isActive({ textAlign: 'center' }) || editor.isActive({ textAlign: 'right' }) || editor.isActive({ textAlign: 'left' })}
          >
            <AlignJustify/>
          </IconButton>
        </ToggleButtonGroup>
        <Divider orientation="vertical"/>
        <ToggleButtonGroup spacing={0.5} aria-label="text formatting" >
          <IconButton aria-label="bulletList" 
            color={editor.isActive('bulletList') ? "primary" : "neutral"}
            variant={editor.isActive('bulletList') ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={editor.isActive('orderedList')}
          >
           <List/>
          </IconButton>
          <IconButton aria-label="orderedList" 
            color={editor.isActive('orderedList') ? "primary" : "neutral"}
            variant={editor.isActive('orderedList') ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={editor.isActive('bulletList')}
          >
           <List/>
          </IconButton>
          <IconButton aria-label="blockquote" 
            color={editor.isActive('blockquote') ? "primary" : "neutral"}
            variant={editor.isActive('blockquote') ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={editor.isActive('code')}
          >
           <svg
              className="mb-4 h-8 w-8 text-gray-400 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </IconButton>
          <IconButton aria-label="code" 
            color={editor.isActive('code') ? "primary" : "neutral"}
            variant={editor.isActive('code') ? "solid" : "outlined"}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code />
          </IconButton>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  )
}

const extensions = [
  // Document, Paragraph, Text, Bold, Italic, Code,
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
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
]

const PostEditorActions = ({post, description, addPost, editPost, isNewPost, setter, discardChanges}: {post: GetPostType, description: string, addPost: ({ description }: { description: string }) => Promise<void>, editPost: ({ descriptionUpdate }: { descriptionUpdate: string }) => Promise<void>, isNewPost: boolean, setter: (value: string) => void, discardChanges: () => void}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [desc, setDesc] = useState<string>(description)

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
      <Stack key={"post_actions_btn"} direction="row" spacing={2} justifyContent="center">
        <IconButton sx={{gap: 1, p: 1}} variant="outlined"  onClick={discardChanges}>
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
  setDescription: (description: string) => void;
  isNew: boolean;
  addPost: ({ description }: { description: string }) => Promise<void>;
  editPost: ({ descriptionUpdate }: { descriptionUpdate: string }) => Promise<void>;
}

const PostEditor = ({ data, setDescription, isNew, addPost, editPost,  }: PostEditorProps) => {
  
  const [desc, setDesc] = useState<string>(data?.description ?? "");
  const [oldDesc, _] = useState<string>(data?.description ?? "old description");

  const handleCancelChange = () => {
    if (desc === oldDesc) return
    setDesc(oldDesc);
    setDescription(oldDesc);
  }

  const handleDescriptionChange = (value: string) => {
    if (value === desc) return
    setDesc(value);
    setDescription(value);
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
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={desc}
        children={
          <PostEditorActions
            post={data}
            editPost={editPost}
            addPost={addPost}
            description={desc}
            isNewPost={isNew}
            setter={handleDescriptionChange}
            discardChanges={handleCancelChange}
          />
        }
        onUpdate={({ editor }) => {
          handleDescriptionChange(editor.getHTML());
        }}
        editorContainerProps={{
          style: { border: "1px solid #ccc", borderRadius: 5, padding: 10, minHeight: 200, height: "50vh", overflowY: "auto", },
        }}
      />
    </Stack>
  );
};

export default PostEditor