// [ ] Check if postId different of "new" or an existing, otherwise retun notfound page (use zustand to keep all posts needed datas in memory)
"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Box, Divider, FormControl, FormLabel, Grid, Input, Option, Select, Stack, Switch, Typography } from "@mui/joy";
import PostEditor from "@/app/components/common/postEditor";
import PostViewer from "@/app/components/common/postViewer";

import { addPost, fetchPost, updatePost } from "@/app/actions/post";
import { getAllCategories } from "@/app/actions/category";
import { GetCategoriesType } from "@/app/common/types/category";
import { GetPostType } from "@/app/common/types/posts";

import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import { notFound, useRouter } from "next/navigation";
import CustomSnackbar from "../global/Snackbar";


export default function PostItem({ postId = "new" }: { postId?: string }) {
    const { data: session } = useSession()
    const router = useRouter()

    const [post, setPost] = useState<GetPostType>(null)
    // const [postDescription, setPostDescription] = useState<string>("")
    const [allCategories, setAllCategories] = useState<GetCategoriesType>([])
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [isError, setIsError] = useState<{
        title: boolean,
        description: boolean,
        category: boolean
    }>({
        title: false,
        description: false,
        category: false
    });
    
    const [openNotification, setOpenNotification] = useState<{
        message: string,
        isOpen: boolean, 
        isDanger?: boolean
    }>({
        message: "",
        isOpen: false,
        isDanger: false
    });


    const isOwner = (postEmail: string | null): boolean => {
        if (postEmail == null || session == null) return false
        return  session?.user?.email == postEmail
    }
    
    const getPost = async (id: string) => {
        const data : GetPostType = await fetchPost({postId: id})
        if (!data) notFound() 
        setPost(data)
        // if (data?.description) setPostDescription(data?.description)
        setIsPublished(data?.isPublished)
    }

    const getCategories = async () => {
        const d = await getAllCategories()
        setAllCategories([...d])
    }

    const handleCategoryChange = (event: React.SyntheticEvent | null, newValue: string | null,) => {
        if (newValue == null) return
        setPost({...post, categoryId: newValue} as GetPostType)
    };

    const handlePostCreateButtonClick = async ({description} :{description: string}) => {
        if (description.length <= 0 || description === "<p></p>") {
            console.log("description => ", description);
            
            setIsError({...isError, description: true})
            setOpenNotification({message: "La description ne peut pas être vide.", isOpen: true, isDanger: true})
        }
        if (post != null) {
            
          const { id, owner, ...data } = post 
            if (data.userId === undefined || post.title.length <= 0 || post.categoryId == undefined) {
                const newIsError = {...isError}
                
                if (post.title.length <= 0) newIsError.title = true
                if (post.categoryId == undefined) newIsError.category = true
                setIsError(newIsError)
                // const message = post.title.length <= 0 ? "Le titre ne peut pas être vide." : "La catégorie ne peut pas être vide."
                // setOpenNotification({message: message, isOpen: true, isDanger: true})
            } else {
                await addPost({post: {...data, description, userId: session?.user?.id}}).then((res) => {
                    setOpenNotification({message: "Post créé avec succès", isOpen: true})
                    router.push(`/`)
                    router.refresh()
                })
            }
        } else {
            setOpenNotification({message: "Impossible to create this post. checking error and retr", isOpen: true, isDanger: true})
        }
    }
    
    const handlePostSaveButtonClick = async ({descriptionUpdate} :{descriptionUpdate: string}) => {
        if (descriptionUpdate.length <= 0 || descriptionUpdate === "<p></p>") {
            setIsError({...isError, description: true})
            console.log("description => ", descriptionUpdate);

            setOpenNotification({message: "La description ne peut pas être vide.", isOpen: true, isDanger: true})
        }
        if (post != null) {
            const { owner, description, userId, ...data } = post
          
            if (userId === undefined || post.title.length <= 0 || post.categoryId == undefined) {
                const newIsError = {...isError}
                
                if (post.title.length <= 0) newIsError.title = true
                if (post.categoryId == undefined) newIsError.category = true
                // if (description.length <= 0 || description === "<p></p>") newIsError.description = true
                setIsError(newIsError)
                // const message = post.title.length <= 0 ? "Le titre ne peut pas être vide." : "La catégorie ne peut pas être vide."
                // setOpenNotification({message: message, isOpen: true, isDanger: true})
            } else {
                await updatePost({post: {...data, userId, description: descriptionUpdate}})
                setOpenNotification({message: "Mise à jour avec succès.", isOpen: true})
                router.refresh()
            }
        } else {
            setOpenNotification({message: "Erreur lors de la modification du post.", isOpen: true, isDanger: true})
        }
    }
    
    useEffect(() => {
        if (postId == "new") {
            // setPostDescription("<p>Hello World! 🌎️</p>")
            setPost({id: "", title: "", description: "<p>Hello World! 🌎️</p>", isPublished: isPublished, userId: session?.user.id, owner: {email: session?.user?.email, name: session?.user?.name}} as GetPostType)
        } else {
            getPost(postId as string)
        }
    },[postId, session])

    useEffect(() => {
        getCategories()
    },[])

    
    return (
        <Stack spacing={2} sx={{bgcolor: "background.body"}}>
            {post &&
                <Stack key={post.id} alignItems="center" sx={{pt: "1.5rem"}} spacing={1}>
                    <Grid key={"post_header"} width="100%" container spacing={3} direction={{xs: "column", lg: "row"}} sx={{ flexGrow: 1 }}>
                        <Grid xs={12}>
                            <Stack key={"post_header_stack"} direction={"row"} spacing={2} width="100%" sx={{justifyContent: "end"}}>
                                {isOwner(post?.owner?.email) ?
                                    <>
                                        <Switch size="lg"
                                            checked={isPublished}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                    setPost({...post, isPublished: event.target.checked})
                                                    setIsPublished(event.target.checked)
                                                }
                                            }
                                            color={isPublished ? 'primary' : 'neutral'}
                                            variant={isPublished ? 'solid' : 'outlined'}
                                            endDecorator={isPublished ? 'Published' : 'Draft'}
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
                        <Grid key={"post_title"} xs={12}>
                            <Stack key={"post_title_stack"} direction={{xs: "column", md: "row"}} spacing={2} width="100%" sx={{justifyContent: "space-between", alignItems: "end"}}>
                                <FormControl required error={isError.title} sx={{width: {xs: "100%", md: "80%"}}}>
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
                                    <Select defaultValue={postId != "new" ? post.categoryId : undefined} onChange={handleCategoryChange} color={isError.category ? "danger" : "neutral"} placeholder="Select your category" sx={{p: 2.2}}>
                                        <>
                                            {allCategories.map((c) => (
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
                        <Grid key={"post_title"} container direction="column" spacing={2} sx={{ flexGrow: 1, m: {xs: 0, md: 2}}}>
                            <Grid>
                                <Typography>{postId != "new" ? "Edit" : ""} Description :</Typography>
                            </Grid>
                            <Grid>
                                    {/* Check logged user is owner */}
                                    {isOwner(post?.owner?.email) ? 
                                        <PostEditor data={post} isNew={postId == "new"} addPost={handlePostCreateButtonClick} editPost={handlePostSaveButtonClick}/>
                                        : 
                                        <PostViewer content={post.description} />
                                    }
                            </Grid>
                        </Grid>
                    </Stack>
                   
                </Stack>
            }
            <CustomSnackbar isOpen={openNotification.isOpen} message={openNotification.message} isDanger={openNotification.isDanger} onClose={() => setOpenNotification({...openNotification, isOpen: false})}/>
        </Stack>
    )
}