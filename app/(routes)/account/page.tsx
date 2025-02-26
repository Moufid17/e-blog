import React from 'react';
import type { Metadata } from 'next'
import { redirect } from "next/navigation";
import { getServerSession, Session } from "next-auth";

import { Card, CardContent, Divider, Grid, Stack, Typography } from "@mui/joy";
import StackedBarChart from "@/app/components/common/StackedBarChart";
import {AccountDraftListArticleCard, AccountMyListArticleCard, AccountRecentListArticleCard} from '@/app/components/account/AccountListArticleCard';

import authOptions from "@/app/lib/authOptions";
import { getAllNbLastPostsNotOwned } from '@/app/actions/postList';
import { getAccountDetails, getAllOwnPost, getStatsByMonth, likeReceived } from '@/app/actions/account';
import AccountProfileCard from '@/app/components/account/AccountProfileCard';
import { AcccountPrivilegeType, AccountRecentPostType, AccoutProfilType, OwnPostGroupByType } from '@/app/common/types/account';

import { DEFAULT_ACCOUNT_PRIVILEGE, DEFAULT_AVATAR_IMAGE, DEFAULT_EMAIL, DEFAULT_GITHUB, DEFAULT_JOB_NAME, DEFAULT_LINKEDIN, DEFAULT_LOCATION, DEFAULT_PSEUDO, DEFAULT_WEBSITE, DEFAULT_YOUTUBE } from '@/app/help/constants';


export const metadata: Metadata = {
    title: 'E-Blog • Account',
    description: 'Account page',
}

export default async function AccountPage () {
    const session : Session | null = await getServerSession(authOptions)
    // Redirect if user session is not defined
    if (!session) {
        redirect('/')
    }
    const allPostOwn : OwnPostGroupByType = await getAllOwnPost({userId: session?.user?.id}) ?? []
    const allRecentPost: AccountRecentPostType[] = await getAllNbLastPostsNotOwned({userId: session?.user?.id}) ?? []
    
    const allLikeReceived : number = await likeReceived({userId: session?.user?.id}) ?? 0
    const accountProfileDetails = await getAccountDetails({userId: session?.user?.id}) ?? null
    const acountProfilData : AccoutProfilType = {
        name: session.user?.name ?? DEFAULT_PSEUDO,
        image: session.user?.image ?? DEFAULT_AVATAR_IMAGE,
        email: session.user?.email ?? DEFAULT_EMAIL,
        jobName: accountProfileDetails?.jobName ?? DEFAULT_JOB_NAME,
        location: accountProfileDetails?.location ?? DEFAULT_LOCATION,
        accountPrivilege: accountProfileDetails?.type as AcccountPrivilegeType ?? DEFAULT_ACCOUNT_PRIVILEGE,
        socialLink: {
            linkedin: accountProfileDetails?.socialLinkedin ?? DEFAULT_LINKEDIN,
            github: accountProfileDetails?.socialGithub ?? DEFAULT_GITHUB,
            youtube: accountProfileDetails?.socialYoutube ?? DEFAULT_YOUTUBE,
            website: accountProfileDetails?.socialWebsite ?? DEFAULT_WEBSITE,
        },
        stats: {
            likes: allLikeReceived,
        }
    }

    const statsPerMonth = await getStatsByMonth({userId: session?.user?.id}) ?? []
    
    return (
        <Grid key="account_main" component={'main'} container spacing={2} sx={{ flexGrow: 1, p: 2, bgcolor: "background.body", }}>
            <Grid key="account_profil" xs={12} lg={4}>
                <AccountProfileCard userDetails={{...session?.user, ...acountProfilData}} />
            </Grid>
            <Grid key="account_recent_articles" xs={12} lg={5}>
                <AccountRecentListArticleCard data={{title: "Recent Blog List", articles: allRecentPost}}/>
            </Grid>
            <Grid key="account_lists_drafts" xs={12} lg={3}>
                <AccountDraftListArticleCard data={{title: "Draft(s)", articlesDraft: allPostOwn.isNotPublished}}/>
            </Grid>
            <Grid key="account_stats" xs={12} lg={7} xl={9}>
                    <Card title="stats_card" sx={{ height: "100%", width: "100%" }}>
                        <Typography level="h4">Analytics Summary</Typography>
                        <Divider inset="context" />
                        <CardContent>
                            <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: 2, justifyContent: "space-between" }}>
                                <Card sx={{ width: "100%" }}>
                                    <Typography level="title-lg">{"-"}</Typography>
                                    <Typography level="body-md">Views(7 days)</Typography>
                                </Card>
                                <Card sx={{ width: "100%" }}>
                                    <Typography level="title-lg">{statsPerMonth.find((stat) => stat.month === (new Date()).getMonth())?.stats.views ?? "-"}</Typography>
                                    <Typography level="body-md">Views(30 days)</Typography>
                                </Card>
                                <Card sx={{ width: "100%" }}>
                                    <Typography level="title-lg">{"-"}</Typography>
                                    <Typography level="body-md">Views(All Time)</Typography>
                                </Card>
                            </Stack>
                            <Stack key="stackedBarChartDiv">
                                <StackedBarChart key="stackedBarChart" stats={statsPerMonth}/>
                            </Stack>
                        </CardContent>
                    </Card>
            </Grid>
            <Grid key="account_lists_articles" xs={12} lg={5} xl={3}>
                <AccountMyListArticleCard data={{title: "My Articles", articles: allPostOwn.isPublished}}/>
            </Grid>
        </Grid>
    );
}

