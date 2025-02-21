// [ ] MoreVertical to menu with edit and delete
import Link from "next/link";

import { Avatar, Box, Card, CardContent, CardOverflow, IconButton, List, ListItem, ListItemContent, Stack, Typography } from "@mui/joy";
import { Circle, Eye, Heart, MessageSquare, MoreVertical } from "react-feather";

import { toUppercaseFirstChar } from "@/app/lib/utils";


export default function AccountArticleCard({data, isOwner = false}: {data: any, isOwner?: boolean}) {
    const { id ="0", title="Title", createAt = "5 minutes", likes = 20, comments = 50, views = 100,
            owner: {
                name = "John Doe", image = "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_1.png", job = "<Not mention />"
            } = {}
    } = data
    
    return (
        <Card key={`account_article_card_${id}`} sx={{height: "100%", gap: 2,}}>
            <Box key={`account_article_card_title${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between", wordWrap: "break-word"}}>
                <Link href={`/posts/${ id }`}>
                    <Typography level="title-lg" >{toUppercaseFirstChar(title.slice(0, 31)) + (title.length > 31 ? "...": "")}</Typography>
                </Link>
                {isOwner && <IconButton>
                    <MoreVertical size={"12px"}/>
                </IconButton>}
            </Box>
            <CardContent>
                <Box sx={{display: 'flex', flexDirection:"row", justifyContent: {xs: 'flex-start', md: "space-evenly"}, alignItems: "center", gap: 1.5}}>
                    <Stack direction={"row"} gap={0.5}><Heart size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>{likes} like(s)</span></Stack>
                    <Stack direction={"row"} gap={0.5}><MessageSquare  size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>{comments} comment(s)</span></Stack>
                    <Stack direction={"row"} gap={0.5}><Eye size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>{views} view(s)</span></Stack>
                </Box>
            </CardContent>
            <CardOverflow>
                <Box sx={{display: 'flex', flexDirection:"row", justifyContent: 'space-between', alignItems: "center", gap: 1.5}}>
                    <Stack direction={"row"} gap={0.5} sx={{alignItems: "center"}}>
                        <Circle size={"6px"}/><Typography level="body-xs">{createAt} ago</Typography>
                    </Stack>
                    {!isOwner && <Box key="account_article_card_profil">
                        <List key="profil_list" sx={{flexDirection: "row",}}>
                            <ListItem sx={{p: 0}}>
                                <ListItemContent>
                                    <Avatar src={image} size="sm"/>
                                </ListItemContent>
                            </ListItem>
                            <ListItem sx={{alignItems: 'center',  justifyContent: "center", direction: "column"}}>
                                <ListItemContent>
                                    <Typography level="body-xs" fontWeight='bold' textTransform="uppercase" >{name}</Typography>
                                    <Typography level="body-xs" noWrap>{job}</Typography>
                                </ListItemContent>
                            </ListItem>
                        </List>
                    </Box>}
                </Box>
            </CardOverflow>
        </Card>
    );
}