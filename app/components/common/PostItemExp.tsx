"use client"
import { z } from "zod";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { CircularProgress, Grid, IconButton, Stack } from "@mui/joy";
import PostViewer from "@/app/components/common/postViewer";
import PostEditor from "@/app/components/common/postEditor";
import CustomSnackbar from "../global/Snackbar";

import { addPost, updatePost } from "@/app/actions/post";
import { GetPostType } from "@/app/common/types/posts";

import {slugify } from "@/app/lib/utils";
import { RobotIcon } from "./icons/RobotIcon";
import { Save } from "react-feather";
import PostEditHeader from "./PostEditHeader";
import { PostViewHeader } from "./postViewHeader";

const schema = z.object({
  message: z.object({
    role: z.string(),
    content: z.string(),
  })
});

export default function PostItemExp({ data }: { data: GetPostType }) {
    const { data: session } = useSession()
    const router = useRouter()

    const [post, setPost] = useState<GetPostType | null>(null)
    const [oldData, setOldData] = useState<{title: string | null,  category: string | null, isPublish: boolean}> ({
        title: null,
        category: null,
        isPublish: false
    });
    const [oldDesc, setOlDesc] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
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
    
    const getPost = (data: GetPostType) => {
        setPost(data)
        setOldData({
            title: data.title,
            category: data.categoryId,
            isPublish: data.isPublished
        })
        setOlDesc(data.description)
        setDescription(data?.description)
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
        if (oldDesc === description) {
            setOpenNotification({message: "Aucun changement détecté.", isOpen: true})
            return
        }
        setDescription(oldDesc)
        setPost((prev) => { return {...prev, description: oldDesc} as GetPostType})
    }

    const handlePostCreateButtonClick = async ({description} :{description: string}) => {
        if (post?.title == null || post?.title.length <= 0) {
            setIsError({...isError, title: true})
            setOpenNotification({message: "Le titre ne peut pas être vide.", isOpen: true, isDanger: true})
        }

        if (post?.categoryId == null) {
            setIsError({...isError, category: true})
            setOpenNotification({message: "La catégorie ne peut pas être vide.", isOpen: true, isDanger: true})
        }

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
                const postSlug = slugify(post.title)
                await addPost({post: {...post, slug: postSlug, description, userId: session?.user?.id}}).then((res) => {
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
        if (oldDesc === descriptionUpdate && oldData.title === post?.title && oldData.category === post?.categoryId && oldData.isPublish === post?.isPublished) {
            setOpenNotification({message: "Aucun changement détecté.", isOpen: true})
            return
        }

        if (post?.categoryId == null) {
            setIsError({...isError, category: true})
            setOpenNotification({message: "La catégorie ne peut pas être vide.", isOpen: true, isDanger: true})
        }

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
                await updatePost({post: {...post, slug: post.slug, userId: post.userId, description: descriptionUpdate}})
                setOpenNotification({message: "Mise à jour avec succès.", isOpen: true})
                router.replace(`/posts/${post.slug}`)
                router.prefetch(`/`)
            }
        } else {
            setOpenNotification({message: "Erreur lors de la modification du post.", isOpen: true, isDanger: true})
        }
    }
    
    useEffect(() => {
        getPost(data)
    },[data])

    useEffect(() => {
        if (description) {
            setPost((prev) => { return {...prev, description: description} as GetPostType})
        }
    },[description])

    const HandleSetPost = (key: string, value: string | boolean) => {
        switch (key) {
            case "title":
                setPost((prev) => { return {...prev, title: value} as GetPostType})
                break;
            case "categoryId":
                setPost((prev) => { return {...prev, categoryId: value} as GetPostType})
                break;
            case "isPublished":
                setPost((prev) => { return {...prev, isPublished: value} as GetPostType})
                break;
            default:
                break;
        }
    }

    return (
        <Stack key={"post_item_main"} spacing={2} sx={{bgcolor: "background.body"}}>
            {post &&
                <Stack key={post.id} alignItems="center" sx={{pt: "1.5rem"}} spacing={1}>
                    {isOwner(post?.owner?.email) ?
                        <PostEditHeader data={post} setPost={HandleSetPost} isTitleError={isError.title} isCategoryError={isError.category}/>
                    :
                        <PostViewHeader data={post}/>
                    }
                    <Stack key={"post_descritption_editor_or_viewer"} width="100%">
                        <Grid key={"post_title"} container direction="column" spacing={2} sx={{ flexGrow: 1, m: {xs: 0, md: 2}}}>
                            <Grid>
                                {/* Check logged user is owner */}
                                {isOwner(post?.owner?.email) ? 
                                    <>
                                        <PostEditor description={description ?? ""} setDescription={(desc: string) => setDescription(desc) } />
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
                                                    if (post.id == "new") {
                                                        handlePostCreateButtonClick({ description : description ?? "" })
                                                    } else {
                                                        handlePostSaveButtonClick({ descriptionUpdate: description ?? "" })
                                                    }
                                                    }}
                                                >
                                                <Save /> {post.id == "new" ? "Create" : "Save"}
                                                </IconButton>
                                            </Stack>
                                        </Stack>
                                    </>
                                    : 
                                    <PostViewer content={post.description ?? ""} />
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