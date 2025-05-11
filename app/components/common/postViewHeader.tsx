import { useEffect, useState } from 'react'
import CategoryTag from '@/app/components/category/categoryTag'
import { Divider, Grid, Stack, Typography } from '@mui/joy'
import { convertDateToString, toUppercaseFirstChar } from '@/app/lib/utils'
import { GetPostType } from '@/app/common/types/posts'
import { GetCategoriesType } from '@/app/common/types/category'
import { getAllCategories } from '@/app/actions/category'

type PostViewHeaderProps = {
    data: GetPostType
}

export const PostViewHeader = ({data}: PostViewHeaderProps) => {
    const [localCategories, setLocalCategories] = useState<GetCategoriesType>([])

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories()
            setLocalCategories([...categoryList])
        }
        getCategories()
    }, [])

    return(
        <Grid key={"post_header"} width="100%" container spacing={3} direction={{xs: "column", lg: "row"}} sx={{ flexGrow: 1 }}>
            <Grid xs={12}>
            <Stack key={"post_header_stack"} direction={"row"} spacing={2} width="100%" sx={{justifyContent: "end"}}>
            <CategoryTag name={localCategories.find((c) => c.id == data.categoryId)?.name} color={localCategories.find((c) => c.id == data.categoryId)?.color}/>
            <Divider orientation="vertical"/>
            <Typography level="body-md">by {data?.owner?.socialBio ? toUppercaseFirstChar(data?.owner?.socialBio) : "@_author"}</Typography>
            <Divider orientation="vertical"/>
            <Typography level="body-sm" alignSelf="flex-end">{toUppercaseFirstChar(convertDateToString(data.updatedAt ?? (new Date())))}</Typography>
        </Stack>
            </Grid>
            <Grid key={"post_title"} xs={12}>
                <h1>{toUppercaseFirstChar(data?.title ?? "")}</h1>
            </Grid>
        </Grid>
    )
}