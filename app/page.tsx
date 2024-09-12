/**
 * Rendering : server component
 * Data Fetching : Server (server action)
 */
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { Box, IconButton, Stack, Typography } from '@mui/joy'

import authOptions from './lib/authOptions';
import { prismaClientDB } from '@/app/lib/prismaClient'
import { Posts } from "@/app/common/types/posts";
import PostCard from '@/app/components/common/postCard'


export default async function Home() {
  const session = await getServerSession(authOptions);
  // La liste des posts dans l'ordre décroissant.
  const getAllPosts: Posts = await prismaClientDB.post.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      owner: {
        select: {
          id: true,
          name: true,
        }
      },
      likes: {
        select: {
          userId: true,
          user: {
            select: {
              email: true
            }
          }
        }
      },
      _count: {
        select: { likes: true },
      },
    },
    orderBy: [
      {
        updatedAt: 'desc',
      }
    ],
  })
  
  return (
    <Box key={"main_app"} sx={{p: "12px", bgcolor: "#fff",}}>
      <Stack direction={"row"} key="home_title" sx={{mb: "12px", justifyContent: "space-between"}} >
        <Typography level="title-lg" lineHeight="2rem" fontSize="25px" textTransform="uppercase" sx={{ letterSpacing: '0.2rem', }}>Posts</Typography>
        {/* Dirige vers la page de création d'un post si un utilisateur est connecté sinon vers la page de connection. */}
        <Link href={session ? "/posts/new" : "/api/auth/signin"}>
          <IconButton sx={{bgcolor: "#000", p: 2, gap: 1, }} variant="solid">
            Créer un post
          </IconButton>
        </Link>
      </Stack>
      <Box key="home_posts" sx={{ gap: 2,  bgcolor: "white", display: "flex", justifyContent:"space-around", flexDirection:"row", flexWrap: 'wrap'}}>
        {[...getAllPosts].map(
          (post, index: number) => <PostCard key={"home_post_"+index} data={post}/>)
        } 
      </Box>
    </Box>
  )
}
