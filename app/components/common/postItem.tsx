// [ ] Check if postId different of "new" or an existing, otherwise retun notfound page (use zustand to keep all posts needed datas in memory)
"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Box, Divider, FormControl, FormLabel, Grid, Input, Option, Select, Stack, Switch, Typography } from "@mui/joy";
import PostEditor from "@/app/components/common/postEditor";
import PostViewer from "@/app/components/common/postViewer";

import { fetchPost } from "@/app/actions/post";
import { getAllCategories } from "@/app/actions/category";
import { GetCategoriesType } from "@/app/common/types/category";
import { GetPostType } from "@/app/common/types/posts";

import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import { notFound } from "next/navigation";


export default function PostItem({ postId = "new" }: { postId?: string }) {
    const { data: session } = useSession()
    const [post, setPost] = useState<GetPostType>(null)
    const [description, setDescription] = useState<string>("")
    const [categories, setCategories] = useState<GetCategoriesType>([])
    const [checked, setChecked] = useState<boolean>(false);

    const isOwner = (postEmail: string | null): boolean => {
        if (postEmail == null || session == null) return false
        return  session?.user?.email == postEmail
    }
    
    const getPost = async (id: string) => {
        const data : GetPostType = await fetchPost({postId: id})
        if (!data) notFound() 
        setPost(data)
        if (data?.description) setDescription(data?.description) 
    }
    const getCategories = async () => {
        const d = await getAllCategories()
        setCategories([...d])
    }
    const handleChange = (event: React.SyntheticEvent | null, newValue: string | null,) => {
        if (newValue == null) return
        setPost({...post, categoryId: newValue} as GetPostType)
    };
    
    useEffect(() => {
        if (postId == "new") {
            setPost({id: "", title: "", description: "", owner: {email: session?.user?.email, name: session?.user?.name}, updatedAt: new Date()} as GetPostType)
        } else {
            getPost(postId as string)
        }
    },[postId, session])

    useEffect(() => {
        getCategories()
        
    },[])

    if (postId != "new" && post == null) notFound()
    
    return (
        <Stack spacing={2} sx={{bgcolor: "background.body"}}>
            {post &&
                <Stack key={post.id} alignItems="center" sx={{pt: "1.5rem"}} spacing={1}>
                    <Grid key={"post_title"} width="100%" container spacing={3} direction={{xs: "column", lg: "row"}} sx={{ flexGrow: 1 }}>
                        <Grid xs={12}>
                            <Stack direction={"row"} spacing={2} width="100%" sx={{justifyContent: "end"}}>
                                {isOwner(post?.owner?.email) ?
                                    <>
                                        <Switch size="lg"
                                            checked={checked}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                setChecked(event.target.checked)
                                            }
                                            color={checked ? 'primary' : 'neutral'}
                                            variant={checked ? 'solid' : 'outlined'}
                                            endDecorator={checked ? 'Published' : 'Draft'}
                                            slotProps={{
                                                endDecorator: {
                                                    sx: {
                                                        minWidth: 35,
                                                    },
                                                },
                                            }}
                                        />
                                        
                                    </>
                                    : 
                                    <>
                                        <Divider orientation="vertical"/>
                                        <Typography level="body-md">by {toUppercaseFirstChar(post?.owner?.name ?? "") ?? "Esgi"}</Typography>
                                        <Divider orientation="vertical"/>
                                        <Typography level="body-sm" alignSelf="flex-end">{toUppercaseFirstChar(convertDateToString(post.updatedAt ?? (new Date())))}</Typography>
                                    </>
                                }
                            </Stack>
                        </Grid>
                        <Grid xs={12} >
                            <Stack direction={{xs: "column", md: "row"}} spacing={2} width="100%" sx={{justifyContent: "space-between", alignItems: "end"}}>
                                <FormControl required sx={{width: {xs: "100%", md: "80%"}}}>
                                    <FormLabel>Title</FormLabel>
                                    <Input required disabled={!isOwner(post?.owner?.email)} onChange={(e) => { setPost({...post, title: e.target.value})} } defaultValue={toUppercaseFirstChar(post?.title ?? "")} placeholder="Type your title" 
                                        sx={{   p: 2, 
                                            '&::before': {
                                            display: 'none',
                                        },
                                        '&:focus-within': {
                                        borderColor: 'primary.solid',
                                        outline: '2px solid #0D0D0D',
                                        outlineOffset: '2px',
                                        },
                                        }}
                                    />
                                </FormControl>
                                <FormControl required sx={{width: {xs: "100%", md: "20%"}}}>
                                    <Select required defaultValue={post.categoryId} onChange={handleChange} color="neutral" placeholder="Select your category" sx={{p: 2.2}}>
                                        <>
                                            {categories.map((c) => (
                                                <Option key={c.id} value={c.id}>
                                                    <Box sx={{ borderRadius: "50%", height: "40px", width: "40px", bgcolor: c.color, }}/>
                                                    <Typography>{c.name}</Typography>
                                                </Option>
                                            ))}
                                        </>
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Stack key={"post_descritption_editor_or_viewer"} width="100%">
                        <Grid key={"post_title"} container direction="column" spacing={2} sx={{ flexGrow: 1 , p: 2}}>
                            <Grid>
                                <Box>
                                    <Typography level="body-md"  sx={{mb:"-8px"}}>{postId != "new" ? "Edit" : ""} Description :</Typography>
                                </Box>
                            </Grid>
                            <Grid>
                                    {/* Check logged user is owner */}
                                    {isOwner(post?.owner?.email) ? 
                                        <PostEditor data={post} isNew={postId == "new"}/>
                                        : 
                                        <PostViewer content={description} />
                                    }
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            }
        </Stack>
    )
}