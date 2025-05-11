"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, Box, Card, CardContent, CardOverflow, Dropdown, IconButton, List, ListDivider, ListItem, ListItemContent, Menu, MenuButton, MenuItem, Stack, Tooltip, Typography } from "@mui/joy";
import { Circle, Delete, Edit2, Eye, Heart, MessageSquare, MoreVertical, Trash2, } from "react-feather";

import { deletePost, draftPost } from "@/app/actions/post";
import { dateTimeToLastTimeAgo, toUppercaseFirstChar } from "@/app/lib/utils";
import { DEFAULT_AVATAR_IMAGE, DEFAULT_JOB_NAME, DEFAULT_PSEUDO } from "@/app/help/constants";


export default function AccountArticleCard({data, isOwner = false, isCreateDateTime =false}: {data: any, isOwner?: boolean, isCreateDateTime?: boolean}) {
    const router = useRouter()
    const { id ="0", title="Title", slug, createdAt= new Date(), updatedAt = new Date(), _count: {likes = 20}, comments = 50, views = 100,
            owner: {
                name = DEFAULT_PSEUDO, image = DEFAULT_AVATAR_IMAGE, jobName = DEFAULT_JOB_NAME
            } = {}
    } = data

    const unPublished = async () => await draftPost({postId: id}).then(() => router.refresh())
    const deleteArticle = async () => await deletePost({postId: id}).then(() => router.refresh())
    
    return (
        <Card key={`account_article_card_${id}`} sx={{height: "100%", gap: 2,}}>
            <Box key={`account_article_card_title_${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between", wordWrap: "break-word"}}>
                <Link href={`/posts/${ slug }`}>
                    <Typography level="title-lg" >{toUppercaseFirstChar(title.slice(0, 21).trim()) + (title.length > 21 ? "...": "")}</Typography>
                </Link>
                {isOwner && <Dropdown>
                    <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                    >
                        <MoreVertical key={`account_article_card_more_menu_${id}`} size={"12px"}/>
                    </MenuButton>
                    <Menu 
                        placement="bottom-end"
                        slotProps={{ root: { variant: 'plain', color: 'neutral' } }} 
                    >
                        <MenuItem sx={{p:0,}}>
                            <Link href={`/posts/${slug}`}><Tooltip title={"Edit Post"}><IconButton><Edit2 size={"12px"}/></IconButton></Tooltip></Link> 
                        </MenuItem>
                        <ListDivider />
                        <MenuItem  sx={{p:0}}>
                            <Tooltip title={"Draft Post"}><IconButton onClick={unPublished}><Delete size={"12px"}/></IconButton></Tooltip>
                        </MenuItem>
                        <ListDivider />
                        <MenuItem sx={{p:0}}>
                            <Tooltip title={"Delete Post"}><IconButton onClick={deleteArticle}><Trash2 size={"12px"}/></IconButton></Tooltip>
                        </MenuItem>
                    </Menu>
                </Dropdown>}
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
                    <Stack key={`account_article_card_${id}_time`} direction={"row"} gap={0.5} sx={{alignItems: "center"}}>
                        <Circle size={"6px"}/><Typography level="body-xs">{dateTimeToLastTimeAgo(isCreateDateTime ? createdAt : updatedAt)}</Typography>
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