"use client"
import { Box, Divider, FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { fetchPost } from "@/app/actions/post";
import { GetPostType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import PostEditor from "@/app/components/common/postEditor";
import PostViewer from "@/app/components/common/postViewer";


export default function PostItem({ postId = "new" }: { postId?: string }) {
    const { data: session } = useSession()
    const [post, setPost] = useState<GetPostType>(null)
    const [description, setDescription] = useState<string>("")

    const getPost = async (id: string) => {
        const data : GetPostType= await fetchPost({postId: id})
        setPost(data)
        if (data?.description) setDescription(data?.description) 
    }
    
    useEffect(() => {
        if (postId == "new") {
            setPost({id: "", title: "", description: "", owner: {email: session?.user?.email, name: session?.user?.name}, updatedAt: new Date()} as GetPostType)
        } else {
            getPost(postId as string)
        }
    },[postId, session])
    
    return (
        <Stack spacing={2} sx={{bgcolor: "#fff"}}>
            { post ? 
                <Stack key={post.id} alignItems="center" sx={{pt: "1.5rem"}} spacing={1}>
                    <Stack key={"post_title"} width="100%" sx={{p:1}}>
                        <Stack direction={"row"} spacing={2} width="100%" sx={{pr: 4, justifyContent: "end"}}>
                            <Typography level="body-md" alignSelf="flex-end">by {toUppercaseFirstChar(post?.owner?.name ?? "") ?? "Esgi"}</Typography>
                            <Divider orientation="vertical"/>
                            <Typography level="body-sm" alignSelf="flex-end">{toUppercaseFirstChar(convertDateToString(post.updatedAt ?? (new Date())))}</Typography>
                        </Stack>
                        <FormControl required>
                            <FormLabel>Titre</FormLabel>
                            <Input disabled={session == null || (session?.user?.email != post?.owner?.email)} onChange={(e) => { setPost({...post, title: e.target.value})} } color="neutral" defaultValue={toUppercaseFirstChar(post?.title ?? "")} placeholder="Type your title"
                                sx={{
                                    p: 2,
                                    '&::before': {
                                        display: 'none',
                                    },
                                    '&:focus-within': {
                                      borderColor: '#0D0D0D',
                                      outline: '2px solid #0D0D0D',
                                      outlineOffset: '2px',
                                    },
                                }}
                            />    
                        </FormControl>
                    </Stack>
                    {/* <Stack direction={"column"} spacing={1} width="100%"> */}
                    <Stack key={"post_descritption_editor_or_viewer"} width="100%"  spacing={2} sx={{bgcolor: "#fff", p: 1, m: 10}}>
                        <Box>
                            <Typography level="body-md"  sx={{mb:"-8px"}}>Description :</Typography>
                        </Box>
                        <Box sx={{p:0.5}}>
                            {/* Check logged user is owner */}
                            {(session && session?.user?.email == post?.owner?.email) ? 
                                <PostEditor data={post} isNew={postId == "new"}/>
                                : 
                                <PostViewer content={description} />
                            }
                        </Box>
                    </Stack>
                </Stack>
            : <></>
            }
        </Stack>
    )
}