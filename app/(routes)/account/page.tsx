// This page will split into PROFILE (https://berrydashboard.io/apps/blog/general-settings) and dashboard (https://berrydashboard.io/dashboard/blog)
import { Avatar, Box, Card, CardActions, CardContent, CardOverflow, Chip, Divider, Grid, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import {Linkedin, Mail, MapPin, Phone} from "react-feather"
import authOptions from "@/app/lib/authOptions";
import Link from "next/link";
import StackedBarChart from "@/app/components/common/StackedBarChart";
import AccountArticleCard from "@/app/components/account/AccountArticleCard";


export const metadata: Metadata = {
    title: 'EsgiBloc • Account',
    description: 'Blog dédié à l\'esgi',
}

export default async function AccountPage () {
    const session : Session | null = await getServerSession(authOptions)
    
    // Redirect if user session is not defined
    if (!session) {
        redirect('/')
    }
    
    return (
        <Grid key="account_main" component={'main'} container spacing={2} sx={{ flexGrow: 1, p: 2, bgcolor: "background.body",}}>
            <Grid key="account_profil" xs={12} lg={4}>
                <Card key="account_card" sx={{height: "auto"}}>
                    <Stack key="profil_stack" direction={{xs: "column", xl:"row"}} sx={{gap: 2, alignItems: 'center', justifyContent: "space-between"}}>
                        <Box key="profil_stack_box">
                            <List key="profil_list" sx={{alignItems: 'center', flexDirection: {xs: "column", lg: "row"}}}>
                                <ListItem>
                                    <ListItemContent>
                                        <Avatar src={session.user?.image ?? "P"}/>
                                    </ListItemContent>
                                </ListItem>
                                <ListItem sx={{gap: 2, alignItems: 'center',  justifyContent: "center", direction: {md: "column", lg: "row"}}}>
                                    <ListItemContent sx={{textAlign: {xs: "center", lg: "left"}}}>
                                        <Typography level="body-lg" fontWeight='bold' textTransform="uppercase" >{session.user?.name ?? "John Deo"}</Typography>
                                        <Typography level="body-md" noWrap>Javascript Developer</Typography>
                                    </ListItemContent>
                                </ListItem>
                            </List>
                        </Box>
                        <Box key="profil_tag">
                            <Chip key="profil_tag_chip" color="primary" variant="solid" sx={{fontSize:{xs:"lg", lg:"md"}}}>Pro</Chip>
                        </Box>
                    </Stack>
                    <Divider inset="context"/>
                    <CardContent>
                        <Box key="profil_card_content" >
                            <List key="profil_card_content_list" sx={{display: 'flex', alignItems:"stretch", justifyContent: 'center', gap: 1}}>
                                <ListItem key="profil_card_content_list_0" sx={{justifyContent: "space-between", alignItems: 'center'}}>
                                    <Box component="label" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                        <Mail/>
                                        Email
                                    </Box>
                                    <Typography level="body-md" noWrap>{session.user?.email ?? "johndeo@gmail.com"}</Typography>
                                </ListItem>
                                <Divider/>
                                <ListItem key="profil_card_content_list_1" sx={{justifyContent: "space-between", alignItems: 'center'}}>
                                    <Box component="label" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                        <Box ><Linkedin/></Box>
                                        <Box>LinkedIn</Box>
                                    </Box>
                                    <Link href="https://www.linkedin.com/in/moufid-mtr/">linkedin/{"https://www.linkedin.com/in/moufid-mtr".split("/").pop()}</Link>
                                </ListItem>
                                <Divider/>
                                <ListItem key="profil_card_content_list_2" sx={{justifyContent: "space-between", alignItems: 'center'}}>
                                    <Box component="label" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                        <Box component={"span"}><MapPin/></Box>
                                        <Box>Location</Box>
                                    </Box>
                                    <Typography level="body-md" noWrap textAlign={"left"}> Paris, France</Typography>
                                </ListItem>
                            </List>
                        </Box>
                    </CardContent>
                    <CardOverflow>
                        <CardActions orientation="horizontal" sx={{display: 'flex', justifyContent: 'space-around'}}>
                            {Array.from({length: 3}).map((_, index) => (
                                    <Box key={index} component={'span'} sx={{display: 'flex', flexDirection:"column", alignItems:"center", justifyContent: 'center'}}>
                                        <Typography level="title-lg">20</Typography>
                                        <Typography level="body-xs">like(s)</Typography>
                                    </Box>
                                ))
                            }
                        </CardActions>
                    </CardOverflow>
                </Card>
            </Grid>
            <Grid key="account_list_articles" xs={12} lg={4} sx={{scroll: "auto" , scrollBehavior: "smooth"}}>
                <Card title="account_lists_articles_card" sx={{height: "100%"}}>
                    <Typography>Recent Blog List</Typography>
                    <Divider inset="context"/>
                    <Stack key={`account_articles_cards`} gap={1}>
                        {Array.from({length: 5}).map((_, index) => (
                                <AccountArticleCard data={{id: index, title: `Title ${index}`}} />
                            ))
                        }
                    </Stack>
                </Card>
            </Grid>
            <Grid key="account_lists_drafts" xs={12} lg={4}>
                <Card title="account_lists_drafts_card" sx={{height: "100%"}}>
                    <Stack direction={"row"} gap={1.5}><Typography>Drafts</Typography><Chip color="success" variant="solid">6</Chip></Stack>
                    <Divider inset="context"/>
                    <Stack key={`account_drafts_cards`} gap={1}>
                        {Array.from({length: 5}).map((_, index) => (
                                <AccountArticleCard data={{id: index, title: `Title ${index}`}} />
                            ))
                        }
                    </Stack>
                </Card>
            </Grid>
            <Grid key="account_stats" xs={12} lg={9}>
                <Card title="stats_card" sx={{height: "100%"}}>
                    <Typography level="h4">Analytics Summary</Typography>
                    <Divider inset="context"/>
                    <CardContent>
                        <Stack direction={{xs: "column", sm: "row"}} sx={{gap: 2, justifyContent: "space-between"}}>
                            <Card sx={{width: "100%"}}>
                                <Typography level="title-lg">50</Typography>
                                <Typography level="body-md">Views(7 days)</Typography>
                            </Card>
                            <Card sx={{width: "100%"}}>
                                <Typography level="title-lg">1230</Typography>
                                <Typography level="body-md">Views(30 days)</Typography>
                            </Card>
                            <Card sx={{width: "100%"}}>
                                <Typography level="title-lg">20,987</Typography>
                                <Typography level="body-md">Views(All Time)</Typography>
                            </Card>
                        </Stack>
                        <Stack key="stackedBarChartDiv">
                            <StackedBarChart key="stackedBarChart"/>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

