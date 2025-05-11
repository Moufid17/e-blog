"use client"
import { getAllCategories } from '@/app/actions/category'
import { GetCategoriesType } from '@/app/common/types/category'
import { GetPostType } from '@/app/common/types/posts'
import { getCategoryBgColorAndColor, toUppercaseFirstChar } from '@/app/lib/utils'
import { Box, FormControl, FormLabel, Grid, Input, Option, Select, Stack, Switch, Typography } from '@mui/joy'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

type PostHeaderElement = "title" | "categoryId" | "isPublished"

type IEditHeaderProps = {
    data: GetPostType
    setPost: (key: PostHeaderElement, value:string | boolean) => void
    isTitleError: boolean
    isCategoryError: boolean
}

function PostEditHeader({data, setPost, isTitleError, isCategoryError}: IEditHeaderProps) {
    const { data: session } = useSession()
    const [localCategories, setLocalCategories] = useState<GetCategoriesType>([])
    const [isPublished, setIsPublished] = useState<boolean>(data.isPublished);

    const isOwner = (postEmail: string | null): boolean => {
        if (postEmail == null || session == null) return false
        return  session?.user?.email == postEmail
    }

    const handleCategoryChange = (event: React.SyntheticEvent | null, newValue: string | null,) => {
        if (newValue == null) return
        setPost("categoryId", newValue)
    };

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories()
            setLocalCategories([...categoryList])
        }
        getCategories()
    }, [])

    return (
    <Grid key={"post_header"} width="100%" container spacing={3} direction={{xs: "column", lg: "row"}} sx={{ flexGrow: 1 }}>
            <Grid xs={12}>
                <Stack key={"post_header_stack"} direction={"row"} spacing={2} width="100%" sx={{justifyContent: "end"}}>
                    <Switch size="lg"
                        checked={isPublished}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setPost("isPublished", event.target.checked)
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
                </Stack>
            </Grid>
            <Grid key={"post_title"} xs={12}>
                <Stack key={"post_title_stack"} direction={{xs: "column", md: "row"}} spacing={2} width="100%" sx={{justifyContent: "space-between", alignItems: "end"}}>
                    <FormControl required error={isTitleError} sx={{width: isOwner(data?.owner?.email) ? {xs: "100%", md: "80%"} : "100%"}}>
                        <FormLabel>Title</FormLabel>
                        <Input autoFocus required defaultValue={toUppercaseFirstChar(data?.title ?? "")} placeholder="Type your title" 
                            sx={{   p: 2, '&::before': { display: 'none', },
                            '&:focus-within': {
                                borderColor: 'primary.solid',
                                outline: isTitleError ? "2px solid red":'2px solid #0D0D0D',
                                outlineOffset: '2px',
                            },}}
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    // [ ] set error to false if title is not empty
                                    setPost("title", e.target.value)
                                }
                             } }
                        />
                    </FormControl>
                    <FormControl error={isCategoryError} required sx={{width: {xs: "100%", md: "20%"}}}>
                        <Select defaultValue={data.id != "new" ? data.categoryId : null} onChange={handleCategoryChange} placeholder="Select your category" sx={{p: 2.2, outlineColor: isCategoryError ? "danger" : "neutral" }}>
                            <>
                                {localCategories.map((c) => (
                                    <Option key={c.id} value={c.id}>
                                        <Box key={`category_color_${c.id}`} sx={{ borderRadius: "50%", height: "40px", width: "40px", bgcolor: getCategoryBgColorAndColor(c.color).bgcolor, }}/>
                                        <Typography key={`category_name_${c.id}`} >{c.name}</Typography>
                                    </Option>
                                ))}
                            </>
                        </Select>
                    </FormControl>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default PostEditHeader