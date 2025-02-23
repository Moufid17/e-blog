// This page will split into PROFILE (https://berrydashboard.io/apps/blog/general-settings) and dashboard (https://berrydashboard.io/dashboard/blog)
import React from 'react';
import type { Metadata } from 'next'
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession, Session } from "next-auth";

import { Avatar, Box, Card, CardActions, CardContent, CardOverflow, Chip, Divider, Grid, List, ListItem, ListItemContent, Stack, Typography } from "@mui/joy";
import {Linkedin, Mail, MapPin} from "react-feather";

import authOptions from "@/app/lib/authOptions";
import { likeReceived } from '@/app/actions/account';
import StackedBarChart from "@/app/components/common/StackedBarChart";
import {AccountDraftListArticleCard, AccountMyListArticleCard, AccountRecentListArticleCard} from '@/app/components/account/AccountListArticleCard';
import { DEFAULT_AVATAR_IMAGE, DEFAULT_JOB_NAME, DEFAULT_PSEUDO } from '@/app/help/constants';


export const metadata: Metadata = {
    title: 'EsgiBloc • Account',
    description: 'Account page',
}

export default async function AccountPage () {
    const session : Session | null = await getServerSession(authOptions)
    // Redirect if user session is not defined
    if (!session) {
        redirect('/')
    }
    const allLikeReceived = await likeReceived({userId: session?.user?.id}) ?? 0
    
    
    return (
        <Grid key="account_main" component={'main'} container spacing={2} sx={{ flexGrow: 1, p: 2, bgcolor: "background.body", }}>
            <Grid key="account_profil" xs={12} lg={4}>
                <Card key="account_card" sx={{ height: "auto" }}>
                    <Stack key="profil_stack" direction={{ xs: "column", xl: "row" }} sx={{ gap: 2, alignItems: 'center', justifyContent: "space-between" }}>
                        <Box key="profil_stack_box">
                            <List key="profil_list" sx={{ alignItems: 'center', flexDirection: { xs: "column", lg: "row" } }}>
                                <ListItem>
                                    <ListItemContent>
                                        <Avatar src={session.user?.image ?? DEFAULT_AVATAR_IMAGE} />
                                    </ListItemContent>
                                </ListItem>
                                <ListItem sx={{ gap: 2, alignItems: 'center', justifyContent: "center", direction: { md: "column", lg: "row" } }}>
                                    <ListItemContent sx={{ textAlign: { xs: "center", lg: "left" } }}>
                                        <Typography level="body-lg" fontWeight='bold' textTransform="uppercase">{session.user?.name ?? DEFAULT_PSEUDO}</Typography>
                                        <Typography level="body-md" noWrap>{DEFAULT_JOB_NAME}</Typography>
                                    </ListItemContent>
                                </ListItem>
                            </List>
                        </Box>
                        <Box key="profil_tag">
                            <Chip key="profil_tag_chip" color="primary" variant="solid" sx={{ fontSize: { xs: "lg", lg: "md" } }}>Pro</Chip>
                        </Box>
                    </Stack>
                    <Divider inset="context" />
                    <CardContent>
                        <Box key="profil_card_content">
                            <List key="profil_card_content_list" sx={{ display: 'flex', alignItems: "stretch", justifyContent: 'center', gap: 1 }}>
                                <ListItem key="profil_card_content_list_0" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                                    <Box component="label" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Mail />
                                        Email
                                    </Box>
                                    <Typography level="body-md" noWrap>{session.user?.email ?? "johndeo@gmail.com"}</Typography>
                                </ListItem>
                                <Divider />
                                <ListItem key="profil_card_content_list_1" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                                    <Box component="label" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box><Linkedin /></Box>
                                        <Box>LinkedIn</Box>
                                    </Box>
                                    <Link href="https://www.linkedin.com/in/moufid-mtr/">linkedin/{"https://www.linkedin.com/in/moufid-mtr".split("/").pop()}</Link>
                                </ListItem>
                                <Divider />
                                <ListItem key="profil_card_content_list_2" sx={{ justifyContent: "space-between", alignItems: 'center' }}>
                                    <Box component="label" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box component={"span"}><MapPin /></Box>
                                        <Box>Location</Box>
                                    </Box>
                                    <Typography level="body-md" noWrap textAlign={"left"}> Paris, France</Typography>
                                </ListItem>
                            </List>
                        </Box>
                    </CardContent>
                    <CardOverflow>
                        <CardActions orientation="horizontal" sx={{ display: 'flex', justifyContent: 'space-around' }}>
                            <Box key={""} component={'span'} sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                                <Typography level="title-lg">{allLikeReceived}</Typography>
                                <Typography level="body-xs">like(s)</Typography>
                            </Box>
                            {["comment(s)", "view(s)"].map((t, index) => (
                                <Box key={index} component={'span'} sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center' }}>
                                    <Typography level="title-lg">{index}</Typography>
                                    <Typography level="body-xs">{t}</Typography>
                                </Box>
                            ))}
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Grid>
            <Grid key="account_recent_articles" xs={12} lg={5}>
                <AccountRecentListArticleCard data={{}}/>
            </Grid>
            <Grid key="account_lists_drafts" xs={12} lg={3}>
                <AccountDraftListArticleCard data={{}}/>
            </Grid>
            <Grid key="account_stats" xs={12} lg={9}>
                    <Card title="stats_card" sx={{ height: "100%", width: "100%" }}>
                        <Typography level="h4">Analytics Summary</Typography>
                        <Divider inset="context" />
                        <CardContent>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2, justifyContent: "space-between" }}>
                                <Card sx={{ width: "100%" }}>
                                    <Typography level="title-lg">50</Typography>
                                    <Typography level="body-md">Views(7 days)</Typography>
                                </Card>
                                <Card sx={{ width: "100%" }}>
                                    <Typography level="title-lg">1230</Typography>
                                    <Typography level="body-md">Views(30 days)</Typography>
                                </Card>
                                <Card sx={{ width: "100%" }}>
                                    <Typography level="title-lg">20,987</Typography>
                                    <Typography level="body-md">Views(All Time)</Typography>
                                </Card>
                            </Stack>
                            <Stack key="stackedBarChartDiv">
                                <StackedBarChart key="stackedBarChart" />
                            </Stack>
                        </CardContent>
                    </Card>
            </Grid>
            <Grid key="account_lists_articles" xs={12} lg={3}>
                <AccountMyListArticleCard data={{}}/>
            </Grid>
        </Grid>
    );
}

