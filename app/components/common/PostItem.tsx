"use client"
import { z } from "zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";

import { Box, CircularProgress, Divider, FormControl, FormLabel, Grid, IconButton, Input, Option, Select, Stack, Switch, Typography } from "@mui/joy";
import PostViewer from "@/app/components/common/postViewer";
import PostEditor from "@/app/components/common/postEditor";
import CustomSnackbar from "../global/Snackbar";
import CategoryTag from "../category/categoryTag";

import { addPost, fetchPost, updatePost } from "@/app/actions/post";
import { getAllCategories } from "@/app/actions/category";
import { GetCategoriesType } from "@/app/common/types/category";
import { GetPostType } from "@/app/common/types/posts";

import { convertDateToString, getCategoryBgColorAndColor, toUppercaseFirstChar } from "@/app/lib/utils";
import { RobotIcon } from "./icons/RobotIcon";
import { Save } from "react-feather";

const schema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
  })
});

export default function PostItem({ postId = "new" }: { postId?: string }) {
    const { data: session } = useSession()
    const router = useRouter()

    const [post, setPost] = useState<GetPostType>(null)
    const [oldDesc, setOlDesc] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [allCategories, setAllCategories] = useState<GetCategoriesType>([])
    const [isPublished, setIsPublished] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [isError, setIsError] = useState<{ title: boolean, description: boolean, category: boolean}>({
        title: false,
        description: false,
        category: false
    });
    
    const [openNotification, setOpenNotification] = useState<{ message: string, isOpen: boolean, isDanger?: boolean }>({
        message: "",
        isOpen: false,
        isDanger: false
    });

    const isOwner = (postEmail: string | null): boolean => {
        if (postEmail == null || session == null) return false
        return  session?.user?.email == postEmail
    }
    
    const getPost = async (id: string) => {
        const data : GetPostType | null = await fetchPost({postId: id})
        if (data == null) notFound()
        setPost(data)
        setOlDesc(data?.description)
        setDescription(data?.description)
        setIsPublished(data?.isPublished)
    }

    const getCategories = async () => {
        const d = await getAllCategories()
        setAllCategories([...d])
    }

    const generateDescription = async (title: string) => {
        if (!title) {
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
            setDescription(descriptionHTML)
            setPost((prev) => { return {...prev, description: descriptionHTML} as GetPostType})
        })
          .catch((error) => {
            console.error(error);
        }).finally
          (() => {
            setIsLoading(false)
        });
    }

    const handleCancelDescriptionChange = () => {
        if (!post) return
        if (description === oldDesc) return
        setDescription(oldDesc)
        setPost((prev) => { return {...prev, description: oldDesc} as GetPostType})
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
          
            if (post.userId === null || post.title.length <= 0 || post.categoryId == undefined) {
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
        const fetchPost = async () => {
            if (postId == "new") {
                if (session == null) return
                setPost({id: "", title: "", description: "<p>Hello World! 🌎️</p>", isPublished: false, userId: session?.user.id, 
                    owner: {email: session?.user?.email ?? null, socialBio: null,name: session?.user?.name ?? null} , createdAt: null, updatedAt: null, categoryId: null,})
            } else {
                getPost(postId)
            }
        }
        
        fetchPost()
    },[postId, session])

    useEffect(() => {
        if (description) {
            setPost((prev) => { return {...prev, description: description} as GetPostType})
        }
    },[description])

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
                                        <Typography level="body-md">by {post?.owner?.socialBio ? toUppercaseFirstChar(post?.owner?.socialBio) : "@_author"}</Typography>
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
                                    <>
                                        <PostEditor description={description ?? "<p>Hello World! 🌎️</p>"}
                                            setDescription={(desc: string) => setDescription(desc)}
                                        />
                                        <Stack spacing={2} sx={{ mt: 3 }}>
                                            <hr />
                                            <Stack key={"post_actions_btn"} direction="row" spacing={2} justifyContent="center">
                                                <IconButton sx={{ gap: 1, p: 1 }} variant="outlined" onClick={handleCancelDescriptionChange}>
                                                    Ignore changements
                                                </IconButton>
                                                <IconButton sx={{ bgcolor: "#0D0D0D", p: 1, gap: 1 }} variant="solid" onClick={() => {
                                                    if (post) generateDescription(post.title)
                                                }}>
                                                {isLoading ? <CircularProgress sx={{ color: "#fff" }} /> : <RobotIcon />}  Suggest description
                                                </IconButton>
                                                <IconButton sx={{ bgcolor: "#0D0D0D", p: 1, gap: 1 }} variant="solid" onClick={() => {
                                                    if (postId == "new") {
                                                        handlePostCreateButtonClick({ description : description ?? "" })
                                                    } else {
                                                        handlePostSaveButtonClick({ descriptionUpdate: description ?? "" })
                                                    }
                                                    }}
                                                >
                                                <Save /> {postId == "new" ? "Create" : "Save"}
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    </>
                                    : 
                                    <PostViewer content={post.description ?? "<p>Hello World! 🌎️</p>"} />
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