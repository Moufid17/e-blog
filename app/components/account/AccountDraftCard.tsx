"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Box, Card, CardOverflow, IconButton, Stack, Tooltip, Typography } from "@mui/joy";
import { Circle, Trash2, } from "react-feather";
import CategoryTag from "../category/categoryTag";

import { dateTimeToLastTimeAgo, toUppercaseFirstChar } from "@/app/lib/utils";
import { AccountPostOwnType } from "@/app/common/types/account";
import { deletePost } from "@/app/actions/post";


export default function AccountDraftCard({data}: {data: AccountPostOwnType}) {
    const router = useRouter()
    const { id, title, slug, updatedAt = new Date(),  category: {name, color} = {name: "UI/UX", color: "primary.solidDisabledBg"} } = data
    const deleteArticle = async () => await deletePost({postId: id}).then(() => router.refresh())
    
    return (
        <Card key={`account_article_card_${id}`} sx={{ p: 0, height: "100%", gap: 2, border: "none", boxShadow: "none",}}>
            <Box key={`account_article_card_title_${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
                <div style={{display: "flex", justifyContent: "space-between", gap: 10}}>
                    <CategoryTag name={name} color={color}/>
                    <Link href={`/posts/${slug}`}>
                        <Typography level="title-md" >{toUppercaseFirstChar(title.slice(0, 100)) + (title.length > 45 ? "...": "")}</Typography>
                    </Link>
                </div>
                <Tooltip title={"Delete Post"} color="primary" variant="solid"><IconButton sx={{m: 1}} onClick={deleteArticle}><Trash2 size={"12px"}/></IconButton></Tooltip>
            </Box>
            <CardOverflow>
                <Stack key={`account_article_card_${id}_time`} direction={"row"} gap={0.5} sx={{alignItems: "center"}}>
                    <Circle size={"6px"}/><Typography level="body-xs">Last update: {dateTimeToLastTimeAgo(new Date(updatedAt))}</Typography>
                </Stack>
            </CardOverflow>
        </Card>
    );
}