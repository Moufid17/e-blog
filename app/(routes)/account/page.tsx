import { Avatar, Box, List, ListItem, ListItemContent, ListItemDecorator, Stack, Typography } from "@mui/joy";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'

import authOptions from "@/app/lib/authOptions";


export const metadata: Metadata = {
    title: 'EsgiBloc • Account',
    description: 'Blog dédié à l\'esgi',
}

export default async function AccountPage () {
    const session = await getServerSession(authOptions)
    
    // Redirect if user session is not defined
    if (!session) {
        redirect('/')
    }
    
    return (
        <Box key="account" component={'main'} sx={{p: 4, gap: 2}}>
            <Typography id="esgiblog-account-label" level="body-lg" textTransform="uppercase" sx={{ letterSpacing: '0.15rem', }}>
                Profile
            </Typography>
            <List>
                <ListItem>
                    <ListItemDecorator>
                        <Avatar src={session.user?.image ?? "P"}/>
                    </ListItemDecorator>
                    <ListItemContent>
                        <Typography level="body-lg" fontWeight='bold' textTransform="uppercase" >{session.user?.name ?? "John Deo"}</Typography>
                        <Typography level="body-md" noWrap>{session.user?.email ?? "johndeo@gmail.com"}</Typography>
                    </ListItemContent>
                </ListItem>
            </List>
        </Box>
    );
}

