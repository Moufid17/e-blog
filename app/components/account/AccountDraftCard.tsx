import Link from "next/link";

import { Avatar, Box, Card, CardContent, CardOverflow, Chip, Divider, IconButton, List, ListItem, ListItemContent, Stack, Typography } from "@mui/joy";
import { Circle, Edit2, } from "react-feather";

import { toUppercaseFirstChar } from "@/app/lib/utils";
import { useTheme } from '@mui/joy/styles'


export default function AccountDraftCard({data}: {data: any}) {
    const { id, title, subtitle, category: {name, color} = {name: "UI/UX", color: "success.solidBg"} } = data
    return (
        <Card key={`account_article_card_${id}`} sx={{ p: 0, height: "100%", gap: 2, border: "none", boxShadow: "none",}}>
            <Box key={`account_article_card_title ${id}`} sx={{display:"flex", flexDirection:"row", alignItems: "center", justifyContent: "space-between"}}>
                <Chip sx={{fontSize: "12px", bgcolor:"success.solidBg"  }}>Draft</Chip>
                <IconButton sx={{m: 1}}><Edit2 size={"12px"}/></IconButton>
            </Box>
            <CardContent>
                <>
                    <Typography level="title-md" >{toUppercaseFirstChar(title.slice(0, 20)) + (title.length > 20 ? "...": "")}</Typography>
                    <Typography level="body-sm" >{toUppercaseFirstChar(title.slice(0, 20)) + (title.length > 20 ? "...": "")}</Typography>
                </>
            </CardContent>
            <CardOverflow>
                <Stack direction={"row"} gap={0.5} sx={{alignItems: "center"}}>
                    <Circle size={"6px"}/><Typography level="body-xs">Last update June 20, 2024</Typography>
                </Stack>
            </CardOverflow>
        </Card>
    );
}