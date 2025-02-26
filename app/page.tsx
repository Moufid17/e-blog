/**
 * Rendering : server component
 * Data Fetching : Server (server action)
 */
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { Box, Grid, IconButton, Stack, Typography } from '@mui/joy'

import authOptions from './lib/authOptions';
import { prismaClientDB } from '@/app/lib/prismaClient'
import { Posts } from "@/app/common/types/posts";
import PostCard from '@/app/components/common/postCard'
import { getAllPosts } from './actions/postList';


export default async function Home() {
  const session = await getServerSession(authOptions);
  
  const allPosts: Posts = await getAllPosts()
  
  return (
    <Box key={"main_app"} sx={{p: "12px", bgcolor: "#fff",}}>
      <Stack direction={"row"} key="home_title" sx={{mb: "12px", justifyContent: "space-between"}} >
        <Typography level="title-lg" lineHeight="2rem" fontSize="25px" textTransform="uppercase" sx={{ letterSpacing: '0.2rem', }}>Articles</Typography>
        <Link href={session ? "/posts/new" : "/api/auth/signin"}>
          <IconButton sx={{bgcolor: "#000", p: 2, gap: 1, }} variant="solid">
            New article
          </IconButton>
        </Link>
      </Stack>
      
      {allPosts.length > 0 ?
        <Grid container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          columns={{ xs: 4, sm: 12, md: 12 }}
          sx={{ flexGrow: 1 , }}
        >
          {[...allPosts].map(
              (post, index: number) => 
                <Grid key={index} xs={9} sm={6} md={3}>
                  <PostCard key={"home_post_"+index} data={post}/>
                </Grid>
          )} 
        </Grid>
       : <Box sx={{textAlign:"center"}}>No articles found</Box>
      }
    </Box>
  )
}
