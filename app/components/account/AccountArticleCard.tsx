import Link from "next/link";

import { Avatar, Box, Card, CardContent, CardOverflow, IconButton, List, ListItem, ListItemContent, Stack, Typography } from "@mui/joy";
import { Circle, Eye, Heart, MessageSquare, MoreVertical } from "react-feather";

import { toUppercaseFirstChar } from "@/app/lib/utils";


export default function AccountArticleCard({data}: {data: any}) {
    const { id, title, owner: {name, image} = {name: "John Doe", image: "P"} } = data
    return (
        <Card key={`account_article_card_${id}`} sx={{height: "100%", gap: 2,}}>
            <Box key={`account_article_card_title${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between", wordWrap: "break-word"}}>
                <Link href={`/posts/${ id }`}>
                    <Typography level="title-lg" >{toUppercaseFirstChar(title.slice(0, 31)) + (title.length > 31 ? "...": "")}</Typography>
                </Link>
                <IconButton>
                    <MoreVertical size={"12px"}/>
                </IconButton>
            </Box>
            <CardContent>
                <Box sx={{display: 'flex', flexDirection:"row", justifyContent: 'flex-start', alignItems: "center", gap: 1.5}}>
                    <Stack direction={"row"} gap={0.5}><Heart size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>20 likes</span></Stack>
                    <Stack direction={"row"} gap={0.5}><MessageSquare  size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>50 comments</span></Stack>
                    <Stack direction={"row"} gap={0.5}><Eye size={"12px"}/><span style={{ fontSize: "12px", lineHeight:"0.75rem"}}>100 views</span></Stack>
                </Box>
            </CardContent>
            <CardOverflow>
                <Box sx={{display: 'flex', flexDirection:"row", justifyContent: 'space-between', alignItems: "center", gap: 1.5}}>
                    <Stack direction={"row"} gap={0.5}>
                        <Circle size={"6px"}/><span style={{ fontSize: "12px", lineHeight:"0.4rem"}}>5 minutes</span>
                    </Stack>
                    <Box key="account_article_card_profil">
                        <List key="profil_list" sx={{flexDirection: "row",}}>
                            <ListItem sx={{p: 0}}>
                                <ListItemContent>
                                    <Avatar src={image} size="sm"/>
                                </ListItemContent>
                            </ListItem>
                            <ListItem sx={{alignItems: 'center',  justifyContent: "center", direction: "column"}}>
                                <ListItemContent>
                                    <Typography level="body-xs" fontWeight='bold' textTransform="uppercase" >{name}</Typography>
                                    <Typography level="body-xs" noWrap>Javascript Developer</Typography>
                                </ListItemContent>
                            </ListItem>
                        </List>
                    </Box>
                </Box>
            </CardOverflow>
        </Card>
    );
}