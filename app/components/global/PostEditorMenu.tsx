import React from 'react'
import { Editor } from '@tiptap/react'
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, CornerUpLeft, CornerUpRight, Italic, List, PenTool, RotateCcw, RotateCw, Underline } from 'react-feather'
import { Divider, IconButton, Stack, ToggleButtonGroup } from '@mui/joy'

function PostEditorMenu({ editor } : {editor: Editor | null}) {
    if (!editor) return null
    return (
        <Stack key={"post_editor_menu_bar_container"} className="post-editor-menu-bar-container">
            <Stack key={"post_editor_menu_bar"} direction={{sx:"column", md:"row"}} sx={{justifyContent:"flex-start", p: 1, gap: 3}}>
                <ToggleButtonGroup spacing={0.5} aria-label="History">
                    <IconButton aria-label="undo"
                        color={editor.can().undo() ? "primary" : "neutral"}
                        variant={editor.can().undo() ? "solid" : "outlined"}
                        onClick={() => editor.chain().focus().undo().run()}
                    >
                        <RotateCcw />
                    </IconButton>
                        <IconButton aria-label="redo"
                            color={editor.can().redo() ? "primary" : "neutral"}
                            variant={editor.can().redo() ? "solid" : "outlined"}
                            onClick={() => editor.chain().focus().redo().run()}
                        >
                        <RotateCw />
                    </IconButton>
                </ToggleButtonGroup>
                <Divider orientation="vertical"/>
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
                    <IconButton aria-label="underline" 
                        color={editor.isActive('underline') ? "primary" : "neutral"}
                        variant={editor.isActive('underline') ? "solid" : "outlined"}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <Underline />
                    </IconButton>
                    <IconButton aria-label="heighlight" 
                        color={editor.isActive('heighlight') ? "primary" : "neutral"}
                        variant={editor.isActive('heighlight') ? "solid" : "outlined"}
                        onClick={() => editor.chain().focus().setHighlight().run()}
                    >
                        <PenTool />
                    </IconButton>
                    <IconButton aria-label="subscript" 
                        color={editor.isActive('subscript') ? "primary" : "neutral"}
                        variant={editor.isActive('subscript') ? "solid" : "outlined"}
                        onClick={() => editor.chain().focus().toggleSubscript().run()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={editor.isActive('subscript') ? "#fff" : "#000"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 5l8 8"></path> <path d="M12 5l-8 8"></path> <path d="M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 00-2.62-.44c-.42.24-.74.62-.9 1.07"></path> </g></svg>
                    </IconButton>
                    <IconButton aria-label="superscript" 
                        color={editor.isActive('superscript') ? "primary" : "neutral"}
                        variant={editor.isActive('superscript') ? "solid" : "outlined"}
                        onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" fill={editor.isActive("superscript") ? "#fff" : "#000"} clip-rule="evenodd" d="M17.3181 6.04842C17.6174 5.75945 18.1021 5.79767 18.3524 6.12997C18.5536 6.39707 18.5353 6.76978 18.3088 7.01579L15.2643 10.3227C14.9955 10.6147 14.9248 11.0382 15.0842 11.4017C15.2437 11.7652 15.6031 12 16 12H20C20.5523 12 21 11.5523 21 11C21 10.4477 20.5523 10 20 10H18.2799L19.7802 8.37041C20.6607 7.41399 20.7321 5.96504 19.95 4.92665C18.9769 3.63478 17.0925 3.48621 15.929 4.60962L15.3054 5.21165C14.9081 5.59526 14.897 6.22833 15.2806 6.62564C15.6642 7.02296 16.2973 7.03406 16.6946 6.65045L17.3181 6.04842ZM4.7433 8.33104C4.37384 7.92053 3.74155 7.88725 3.33104 8.25671C2.92053 8.62616 2.88726 9.25845 3.25671 9.66896L7.15465 14L3.25671 18.331C2.88726 18.7415 2.92053 19.3738 3.33104 19.7433C3.74155 20.1128 4.37384 20.0795 4.7433 19.669L8.50001 15.4948L12.2567 19.669C12.6262 20.0795 13.2585 20.1128 13.669 19.7433C14.0795 19.3738 14.1128 18.7415 13.7433 18.331L9.84537 14L13.7433 9.66896C14.1128 9.25845 14.0795 8.62616 13.669 8.25671C13.2585 7.88725 12.6262 7.92053 12.2567 8.33104L8.50001 12.5052L4.7433 8.33104Z"></path> </g></svg>
                    </IconButton>
                </ToggleButtonGroup>
                <Divider orientation="vertical"/>
                <ToggleButtonGroup spacing={0.5} aria-label="text size">
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
                </ToggleButtonGroup>
                <Divider orientation="vertical"/>
                <ToggleButtonGroup spacing={0.5} aria-label="text formatting">
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
                        <svg viewBox="0 0 26 24" xmlns="http://www.w3.org/2000/svg" fill={editor.isActive('orderedList') ? "#fff" : "#000"}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="24" height="24"></rect> <g> <path d="M8 19h13v-2H8v2zm0-6h13v-2H8v2zm0-8v2h13V5H8zm-4.425.252c.107-.096.197-.188.27-.275-.013.228-.02.48-.02.756V8h1.176V3.717H3.96L2.487 4.915l.6.738.487-.4zm.334 7.764c.474-.426.784-.715.93-.867.145-.153.26-.298.35-.436.087-.138.152-.278.194-.42.042-.143.063-.298.063-.466 0-.225-.06-.427-.18-.608s-.29-.32-.507-.417c-.218-.1-.465-.148-.742-.148-.22 0-.42.022-.596.067s-.34.11-.49.195c-.15.085-.337.226-.558.423l.636.744c.174-.15.33-.264.467-.34.138-.078.274-.117.41-.117.13 0 .232.032.304.097.073.064.11.152.11.264 0 .09-.02.176-.055.258-.036.082-.1.18-.192.294-.092.114-.287.328-.586.64L2.42 13.238V14h3.11v-.955H3.91v-.03zm.53 4.746v-.018c.306-.086.54-.225.702-.414.162-.19.243-.42.243-.685 0-.31-.126-.55-.378-.727-.252-.176-.6-.264-1.043-.264-.307 0-.58.033-.816.1s-.47.178-.696.334l.48.773c.293-.183.576-.274.85-.274.147 0 .263.027.35.082s.13.14.13.252c0 .3-.294.45-.882.45h-.27v.87h.264c.217 0 .393.017.527.05.136.03.233.08.294.143.06.064.09.154.09.27 0 .153-.057.265-.173.337-.115.07-.3.106-.554.106-.164 0-.343-.022-.538-.07-.194-.044-.385-.115-.573-.21v.96c.228.088.44.148.637.182.196.033.41.05.64.05.56 0 .998-.114 1.314-.343.315-.228.473-.542.473-.94.002-.585-.356-.923-1.07-1.013z"></path> </g> </g></svg>
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
                    <IconButton aria-label="codeBlock" 
                        color={editor.isActive('codeBlock') ? "primary" : "neutral"}
                        variant={editor.isActive('codeBlock') ? "solid" : "outlined"}
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    >
                        <Code />
                    </IconButton>
                    <IconButton aria-label="taskList" 
                        color={editor.isActive('taskList') ? "primary" : "neutral"}
                        variant={editor.isActive('taskList') ? "solid" : "outlined"}
                        onClick={() => editor.chain().focus().toggleTaskList().run()}
                    >
                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={editor.isActive('taskList') ? "#fff" :"#000"}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2,11 L4,11 C4.51283143,11 4.93550653,11.386027 4.9932722,11.8833761 L5,12 L5,14 C5,14.51285 4.61395571,14.9355092 4.11662025,14.9932725 L4,15 L2,15 C1.48716857,15 1.06449347,14.613973 1.0067278,14.1166239 L1,14 L1,12 C1,11.48715 1.38604429,11.0644908 1.88337975,11.0067275 L2,11 L4,11 L2,11 Z M14,12 C14.5523,12 15,12.4477 15,13 C15,13.5523 14.5523,14 14,14 L8,14 C7.44772,14 7,13.5523 7,13 C7,12.4477 7.44772,12 8,12 L14,12 Z M4,12 L2,12 L2,14 L4,14 L4,12 Z M4,6 C4.55228,6 5,6.44772 5,7 L5,9 C5,9.55228 4.55228,10 4,10 L2,10 C1.44772,10 1,9.55228 1,9 L1,7 C1,6.44772 1.44772,6 2,6 L4,6 Z M14,7 C14.5523,7 15,7.44772 15,8 C15,8.51283143 14.613973,8.93550653 14.1166239,8.9932722 L14,9 L8,9 C7.44772,9 7,8.55228 7,8 C7,7.48716857 7.38604429,7.06449347 7.88337975,7.0067278 L8,7 L14,7 Z M4,7 L2,7 L2,9 L4,9 L4,7 Z M4.77466,1.22614 C5.04092364,1.49240364 5.06512942,1.90907223 4.84727736,2.20268222 L4.77466,2.2868 L2.28033,4.78113 C2.13968,4.92179 1.94891,5.0008 1.75,5.0008 C1.590872,5.0008 1.4369536,4.9502336 1.30973856,4.85798912 L1.21967,4.78113 L0.21967,3.78113 C-0.0732233,3.48824 -0.0732233,3.01337 0.21967,2.72047 C0.485936364,2.45420636 0.902600248,2.43000058 1.19621162,2.64785264 L1.28033,2.72047 L1.75,3.19014 L3.714,1.22614 C4.00689,0.933247 4.48176,0.933246 4.77466,1.22614 Z M14,2 C14.5523,2 15,2.44772 15,3 C15,3.51283143 14.613973,3.93550653 14.1166239,3.9932722 L14,4 L8,4 C7.44772,4 7,3.55228 7,3 C7,2.48716857 7.38604429,2.06449347 7.88337975,2.0067278 L8,2 L14,2 Z"></path> </g></svg>
                    </IconButton>
                </ToggleButtonGroup>
            </Stack>
        </Stack>
    )
}

export default PostEditorMenu