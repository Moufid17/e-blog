// [ ] MoreVertical to menu with edit and delete
import Link from "next/link";

import { Avatar, Box, Card, CardContent, CardOverflow, IconButton, List, ListItem, ListItemContent, Stack, Typography } from "@mui/joy";
import { Circle, Eye, Heart, MessageSquare, MoreVertical } from "react-feather";

import { dateTimeToLastTimeAgo, toUppercaseFirstChar } from "@/app/lib/utils";
import { DEFAULT_AVATAR_IMAGE, DEFAULT_JOB_NAME, DEFAULT_PSEUDO } from "@/app/help/constants";


export default function AccountArticleCard({data, isOwner = false}: {data: any, isOwner?: boolean}) {
    const { id ="0", title="Title", createdAt= new Date(), updatedAt = new Date(), _count: {likes = 20}, comments = 50, views = 100,
            owner: {
                name = DEFAULT_PSEUDO, image = DEFAULT_AVATAR_IMAGE, jobName = DEFAULT_JOB_NAME
            } = {}
    } = data
    
    return (
        <Card key={`account_article_card_${id}`} sx={{height: "100%", gap: 2,}}>
            <Box key={`account_article_card_title_${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between", wordWrap: "break-word"}}>
                <Link href={`/posts/${ id }`}>
                    <Typography level="title-lg" >{toUppercaseFirstChar(title.slice(0, 21).trim()) + (title.length > 21 ? "...": "")}</Typography>
                </Link>
                {isOwner && <IconButton>
                    <MoreVertical key={`account_article_card_more_menu_${id}`} size={"12px"}/>
                </IconButton>}
            </Box>
            <CardContent>
                <Box sx={{display: 'flex', flexDirection:"row", justifyContent: {xs: 'flex-start', md: "space-evenly"}, alignItems: "center", gap: 1.5}}>
                    <Stack key={"0"} direction={"row"} gap={0.5}><Heart size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>{likes} like(s)</span></Stack>
                    <Stack key={"1"} direction={"row"} gap={0.5}><MessageSquare  size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>{comments} comment(s)</span></Stack>
                    <Stack key={"2"} direction={"row"} gap={0.5}><Eye size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>{views} view(s)</span></Stack>
                </Box>
            </CardContent>
            <CardOverflow>
                <Box key={`account_article_card_${id}`} sx={{display: 'flex', flexDirection:"row", justifyContent: 'space-between', alignItems: "center", gap: 1.5}}>
                    <Stack direction={"row"} gap={0.5} sx={{alignItems: "center"}}>
                        <Circle size={"6px"}/><Typography level="body-xs">{dateTimeToLastTimeAgo(isOwner ? updatedAt : createdAt)}</Typography>
                    </Stack>
                    {!isOwner && <Box key={`account_article_card_author_${id}`}>
                        <List key={`account_article_card_author_list_${id}`} sx={{flexDirection: "row",}}>
                            <ListItem key={`account_article_card_author_list_item0_${id}`} sx={{p: 0}}>
                                <ListItemContent>
                                    <Avatar src={image} size="sm"/>
                                </ListItemContent>
                            </ListItem>
                            <ListItem key={`account_article_card_author_list_item1_${id}`} sx={{alignItems: 'center',  justifyContent: "center", direction: "column"}}>
                                <ListItemContent>
                                    <Typography level="body-xs" fontWeight='bold' textTransform="uppercase" >{name}</Typography>
                                    <Typography level="body-xs" noWrap>{jobName}</Typography>
                                </ListItemContent>
                            </ListItem>
                        </List>
                    </Box>}
                </Box>
            </CardOverflow>
        </Card>
    );
}