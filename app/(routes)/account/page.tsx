// This page will split into PROFILE (https://berrydashboard.io/apps/blog/general-settings) and dashboard (https://berrydashboard.io/dashboard/blog)
import { Avatar, Box, Card, CardContent, Chip, Grid, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
import { getServerSession, Session } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import authOptions from "@/app/lib/authOptions";
import Link from "next/link";



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
            <Grid key="account_card_profil" xs={12} md={3}>
                <Card key="account_card" sx={{height: "100%"}}>
                    <Stack key="profil_stack" direction={{xs: "column", xl:"row"}} sx={{gap: 2, alignItems: 'center',}}>
                        <Box key="profil_stack_box" sx={{justifyContent: 'space-around',}}>
                            <List key="profil_list" sx={{alignItems: 'center', flexDirection: {xs: "column", lg: "row"}}}>
                                <ListItem>
                                    <ListItemContent>
                                        <Avatar src={session.user?.image ?? "P"}/>
                                    </ListItemContent>
                                </ListItem>
                                <ListItem sx={{gap: 2, alignItems: 'center',  justifyContent: "center", direction: {md: "column", lg: "row"}}}>
                                    <ListItemContent sx={{textAlign: {xs: "center", lg: "left"}}}>
                                        <Typography level="body-lg" fontWeight='bold' textTransform="uppercase" >{session.user?.name ?? "John Deo"}</Typography>
                                        <Typography level="body-md" noWrap>{session.user?.email ?? "johndeo@gmail.com"}</Typography>
                                    </ListItemContent>
                                </ListItem>
                            </List>
                        </Box>
                        <Box key="profil_tag">
                            <Chip key="profil_tag_chip" color="primary" variant="solid">Pro</Chip>
                        </Box>
                    </Stack>
                    <CardContent>
                        
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12} md={9}>
                <Card title="D" sx={{height: "100%"}}>
                    
                </Card>
            </Grid>
        </Grid>
    );
}

