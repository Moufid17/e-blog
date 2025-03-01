// [ ] color (and variant) management : can be set by using hook like useColor
import Link from "next/link";

import { Box, Card, CardContent, CardOverflow, Chip, IconButton, Stack, Typography } from "@mui/joy";
import { Circle, Edit2, } from "react-feather";
import CategoryTag from "../category/categoryTag";

import { dateTimeToLastTimeAgo, toUppercaseFirstChar } from "@/app/lib/utils";
import { AccountPostOwnType } from "@/app/common/types/account";


export default function AccountDraftCard({data}: {data: AccountPostOwnType}) {
    const { 
        id = "0", title = "Title", updatedAt = new Date(), 
        category: {name, color} = {name: "UI/UX", color: "primary.solidDisabledBg"}
    } = data
    
    return (
        <Card key={`account_article_card_${id}`} sx={{ p: 0, height: "100%", gap: 2, border: "none", boxShadow: "none",}}>
            <Box key={`account_article_card_title_${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
                <CategoryTag name={name} color={color}/>
                <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <IconButton sx={{m: 1}}><Edit2 size={"12px"}/></IconButton>
                </Link>
            </Box>
            <CardContent>
                <Typography level="title-md" >{toUppercaseFirstChar(title.slice(0, 45)) + (title.length > 45 ? "...": "")}</Typography>
            </CardContent>
            <CardOverflow>
                <Stack key={`account_article_card_${id}_time`} direction={"row"} gap={0.5} sx={{alignItems: "center"}}>
                    <Circle size={"6px"}/><Typography level="body-xs">Last update: {dateTimeToLastTimeAgo(new Date(updatedAt))}</Typography>
                </Stack>
            </CardOverflow>
        </Card>
    );
}