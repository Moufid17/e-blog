import Link from 'next/link';
import { getServerSession } from 'next-auth/next';

import { Box, Grid, IconButton, Stack, Typography } from '@mui/joy'
import PostCard from '@/app/components/common/postCard'

import { getAllPosts } from './actions/postList';
import { Posts } from "@/app/common/types/posts";
import authOptions from './lib/authOptions';


export default async function Home() {
  const session = await getServerSession(authOptions);
  
  const allPosts: Posts = await getAllPosts()
  
  return (
    <Box key={"home_page_main"} sx={{p: "12px",}}>
      <Stack key={"home_page_main_title"} direction={"row"} sx={{mb: "12px", justifyContent: "space-between"}} >
        <Typography level="title-lg" lineHeight="2rem" fontSize="25px" textTransform="uppercase" sx={{ letterSpacing: '0.2rem', }}>Articles</Typography>
        <Link href={session ? "/posts/new" : "/api/auth/signin"}>
          <IconButton sx={{p: 2,}} variant="solid" color='primary'>
            New article
          </IconButton>
        </Link>
      </Stack>
      
      {allPosts.length > 0 ?
        <Grid key={`home_posts_grid`} spacing={2} container sx={{ flexGrow: 1 , }}>
          {[...allPosts].map(
            (post, index: number) => 
              <Grid key={`home_post_grid_${index}`} xs={12} md={6} lg={4} xl={3}>
                <PostCard key={"home_post_"+index} data={post}/>
              </Grid>
          )} 
        </Grid>
       : <Box sx={{textAlign:"center"}}>No articles yet.</Box>
      }
    </Box>
  )
}
