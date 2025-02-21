// [ ] color (and variant) management : can be set by using hook like useColor
import Link from "next/link";

import { Box, Button, Card, CardContent, CardOverflow, Chip, IconButton, Stack, Typography } from "@mui/joy";
import { Circle, Edit2, } from "react-feather";

import { toUppercaseFirstChar } from "@/app/lib/utils";


export default function AccountDraftCard({data}: {data: any}) {
    const { id = "0", title = "Title", subtitle = `${title}`, updateAt= "June 20, 2024", 
            category: {name, color} = {name: "UI/UX", color: "primary.solidDisabledBg"}
    } = data
    
    return (
        <Card key={`account_article_card_${id}`} sx={{ p: 0, height: "100%", gap: 2, border: "none", boxShadow: "none",}}>
            <Box key={`account_article_card_title_${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
                <Chip sx={{fontSize: "12px", bgcolor: `${color}`  }}>{name}</Chip>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <IconButton sx={{m: 1}}><Edit2 size={"12px"}/></IconButton>
                </Link>
            </Box>
            <CardContent>
                <>
                    <Typography level="title-md" >{toUppercaseFirstChar(title.slice(0, 20)) + (title.length > 20 ? "...": "")}</Typography>
                    <Typography level="body-sm" >{toUppercaseFirstChar(subtitle.slice(0, 35)) + (subtitle.length > 20 ? "...": "")}</Typography>
                </>
            </CardContent>
            <CardOverflow>
                <Stack direction={"row"} gap={0.5} sx={{alignItems: "center"}}>
                    <Circle size={"6px"}/><Typography level="body-xs">Last update {updateAt}</Typography>
                </Stack>
            </CardOverflow>
        </Card>
    );
}