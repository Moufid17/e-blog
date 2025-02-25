import Link from "next/link";
import { Box, Card, List, Stack, ListItem, ListItemContent, Avatar, Typography, Chip, Divider, CardContent, CardOverflow, CardActions } from "@mui/joy";
import { Mail, Linkedin, MapPin, GitHub, Youtube } from "react-feather";

import { AccoutProfilType,  } from "@/app/common/types/account";
import { toUppercaseFirstChar } from "@/app/lib/utils";
import { DEFAULT_ACCOUNT_PRIVILEGE, DEFAULT_AVATAR_IMAGE, DEFAULT_EMAIL, DEFAULT_GITHUB, DEFAULT_JOB_NAME, DEFAULT_LINKEDIN, DEFAULT_LOCATION, DEFAULT_PSEUDO, DEFAULT_YOUTUBE } from "@/app/help/constants";

export default function AccountProfileCard ({userDetails} : {userDetails: AccoutProfilType}) {
    return(
        <Card key="account_profil_card" sx={{ height: "auto" }}>
            <Stack key="account_profil_card_stack" direction={{ xs: "column", xl: "row" }} sx={{ gap: 2, alignItems: 'center', justifyContent: "space-between" }}>
                <Box key="account_profil_card_stack_box">
                    <List key="profil_list" sx={{ alignItems: 'center', flexDirection: { xs: "column", lg: "row" } }}>
                        <ListItem key="profil_list_item_0" >
                            <ListItemContent>
                                <Avatar src={userDetails?.image ?? DEFAULT_AVATAR_IMAGE} />
                            </ListItemContent>
                        </ListItem>
                        <ListItem key="profil_list_item_1"  sx={{ gap: 2, alignItems: 'center', justifyContent: "center", direction: { md: "column", lg: "row" } }}>
                            <ListItemContent sx={{ textAlign: { xs: "center", lg: "left" } }}>
                                <Typography level="body-lg" fontWeight='bold' textTransform="uppercase">{userDetails?.name ?? DEFAULT_PSEUDO}</Typography>
                                <Typography level="body-md" noWrap>{userDetails?.jobName ?? DEFAULT_JOB_NAME}</Typography>
                            </ListItemContent>
                        </ListItem>
                    </List>
                </Box>
                <Box key="profil_tag">
                    <Chip key="profil_tag_chip" color="primary" variant="solid" sx={{ fontSize: { xs: "lg", lg: "md" } }}>{toUppercaseFirstChar(userDetails.accountPrivilege as string) ?? DEFAULT_ACCOUNT_PRIVILEGE}</Chip>
                </Box>
            </Stack>
            <Divider inset="context" />
            <CardContent>
                <Box key="profil_card_content">
                    <List key="profil_card_content_list" sx={{ display: 'flex', alignItems: "stretch", justifyContent: 'center', gap: 1 }}>
                        <ListItem key="profil_card_content_list_0" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography level="body-md" noWrap textAlign={"left"} startDecorator={<Mail />}>Email</Typography>
                            <Typography level="body-md" noWrap>{userDetails?.email ?? DEFAULT_EMAIL}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem key="profil_card_content_list_1" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography level="body-md" noWrap textAlign={"left"} startDecorator={<Linkedin />}>LinkedIn</Typography>
                            <Link href={userDetails.socialLink?.linkedin ?? DEFAULT_LINKEDIN}target="_blank">{"linkedin/me"}</Link>
                        </ListItem>
                        <Divider />
                        <ListItem key="profil_card_content_list_2" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography level="body-md" noWrap textAlign={"left"} startDecorator={<Youtube />}>Youtube</Typography>
                            <Link href={userDetails.socialLink?.youtube ?? DEFAULT_YOUTUBE} target="_blank"><Typography level="body-md">{"youtube/me"}</Typography></Link>
                        </ListItem>
                        <Divider />
                        <ListItem key="profil_card_content_list_2" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography level="body-md" noWrap textAlign={"left"} startDecorator={<GitHub />}>GitHub</Typography>
                            <Link href={userDetails.socialLink?.github ?? DEFAULT_GITHUB} target="_blank">{"github/me"}</Link>
                        </ListItem>
                        <Divider />
                        <ListItem key="profil_card_content_list_2" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                            <Typography level="body-md" noWrap textAlign={"left"} startDecorator={<MapPin />}>Location</Typography>
                            <Typography level="body-md" noWrap textAlign={"left"}>{userDetails.location ?? DEFAULT_LOCATION}</Typography>
                        </ListItem>
                    </List>
                </Box>
            </CardContent>
            <CardOverflow>
                <CardActions orientation="horizontal" sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Box key={""} component={'span'} sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                        <Typography level="title-lg">{userDetails?.stats?.likes ?? "-"}</Typography>
                        <Typography level="body-xs">like(s)</Typography>
                    </Box>
                    {["comment(s)", "view(s)"].map((t, index) => (
                        <Box key={index} component={'span'} sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                            <Typography level="title-lg">{"-"}</Typography>
                            <Typography level="body-xs">{t}</Typography>
                        </Box>
                    ))}
                </CardActions>
            </CardOverflow>
        </Card>
    )
}