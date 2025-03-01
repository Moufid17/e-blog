// [ ] Check if postId different of "new" or an existing, otherwise retun notfound page (use zustand to keep all posts needed datas in memory)
"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";

import { Box, Divider, FormControl, FormLabel, Grid, Input, Option, Select, Stack, Switch, Typography } from "@mui/joy";
import PostEditor from "@/app/components/common/postEditor";
import PostViewer from "@/app/components/common/postViewer";
import CustomSnackbar from "../global/Snackbar";
import CategoryTag from "../category/categoryTag";

import { addPost, fetchPost, updatePost } from "@/app/actions/post";
import { getAllCategories } from "@/app/actions/category";
import { GetCategoriesType } from "@/app/common/types/category";
import { GetPostType } from "@/app/common/types/posts";

import { convertDateToString, getCategoryBgColorAndColor, toUppercaseFirstChar } from "@/app/lib/utils";


export default function PostItem({ postId = "new" }: { postId?: string }) {
    const { data: session } = useSession()
    const router = useRouter()

    const [post, setPost] = useState<GetPostType>(null)
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
            setIsError({...isError, description: true})
            setOpenNotification({message: "La description ne peut pas être vide.", isOpen: true, isDanger: true})
        }
        if (post != null) {
            if (post.userId === undefined || post.title.length <= 0 || post.categoryId == undefined) {
                const newIsError = {...isError}
                
                if (post.title.length <= 0) newIsError.title = true
                if (post.categoryId == undefined) newIsError.category = true
                setIsError(newIsError)
            } else {
                await addPost({post: {...post, description, userId: session?.user?.id}}).then((res) => {
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

            setOpenNotification({message: "La description ne peut pas être vide.", isOpen: true, isDanger: true})
        }
        if (post != null) {
          
            if (post.userId === undefined || post.title.length <= 0 || post.categoryId == undefined) {
                const newIsError = {...isError}
                
                if (post.title.length <= 0) newIsError.title = true
                if (post.categoryId == undefined) newIsError.category = true
                setIsError(newIsError)
            } else {
                await updatePost({post: {...post, userId: post.userId, description: descriptionUpdate}})
                setOpenNotification({message: "Mise à jour avec succès.", isOpen: true})
                router.refresh()
            }
        } else {
            setOpenNotification({message: "Erreur lors de la modification du post.", isOpen: true, isDanger: true})
        }
    }
    
    useEffect(() => {
        if (postId == "new") {
            setPost({id: "", title: "", description: "<p>Hello World! 🌎️</p>", isPublished: isPublished, userId: session?.user.id, owner: {email: session?.user?.email, name: session?.user?.name}} as GetPostType)
        } else {
            getPost(postId as string)
        }
    },[postId, session])

    useEffect(() => {
        getCategories()
    },[])
    
    return (
        <Stack key={"post_item_main"} spacing={2} sx={{bgcolor: "background.body"}}>
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
                                                    setPost(prev => ({...prev, isPublished: event.target.checked}) as GetPostType)
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
                                        <CategoryTag name={allCategories.find((c) => c.id == post.categoryId)?.name} color={allCategories.find((c) => c.id == post.categoryId)?.color}/>
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
                                <FormControl required error={isError.title} sx={{width: isOwner(post?.owner?.email) ? {xs: "100%", md: "80%"} : "100%"}}>
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
                                {isOwner(post?.owner?.email) && <FormControl required sx={{width: {xs: "100%", md: "20%"}}}>
                                    <Select defaultValue={postId != "new" ? post.categoryId : undefined} onChange={handleCategoryChange} color={isError.category ? "danger" : "neutral"} placeholder="Select your category" sx={{p: 2.2}}>
                                        <>
                                            {allCategories.map((c) => (
                                                <Option key={c.id} value={c.id}>
                                                    <Box sx={{ borderRadius: "50%", height: "40px", width: "40px", bgcolor: getCategoryBgColorAndColor(c.color).bgcolor, }}/>
                                                    <Typography>{c.name}</Typography>
                                                </Option>
                                            ))}
                                        </>
                                    </Select>
                                </FormControl>
                                }
                            </Stack>
                        </Grid>
                    </Grid>
                    <Stack key={"post_descritption_editor_or_viewer"} width="100%">
                        <Grid key={"post_title"} container direction="column" spacing={2} sx={{ flexGrow: 1, m: {xs: 0, md: 2}}}>
                            <Grid>
                                <Typography>Description :</Typography>
                            </Grid>
                            <Grid>
                                    {/* Check logged user is owner */}
                                    {isOwner(post?.owner?.email) ? 
                                        <PostEditor data={post} setDescription={(desc: string) => setPost((prev) => {
                                            return {...prev, description: desc} as GetPostType
                                        })} isNew={postId == "new"} addPost={handlePostCreateButtonClick} editPost={handlePostSaveButtonClick}/>
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