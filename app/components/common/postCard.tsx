"use client";
import {useEffect, useState} from "react";
import {
  IconButton,
  Typography,
  Divider,
  Card,
  CardContent,
  CardOverflow,
  CardActions,
  Box,
  AspectRatio,
} from "@mui/joy";
import { Heart } from "react-feather";
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react'
import Link from "next/link";
import { addLike, fetchLikeCount, removeLike } from "@/app/actions/post";
import { PostCardType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";


export default function PostCard({data}: {data: PostCardType}) {
  const { id, title, createdAt, owner, likes, _count } = data
  const router = useRouter()
  const { data : session } = useSession()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [countLike, setCountLike] = useState<number>(0)

  const addLikeToPost = async () => await addLike({id})
  const removeLikeToPost = async () => await removeLike({id})

  const handleSetFavorite = async () => {
    if (!session || !session.user){
      signIn()
      return
    } 
    
    if (isFavorite) {
      setCountLike(prevCountLike => prevCountLike -1)
      removeLikeToPost()
    } else {
      setCountLike(prevCountLike => prevCountLike + 1)
      addLikeToPost()
    }
    setIsFavorite(prev => !prev)
  }

  useEffect(() => {
    // Mettre à jour visuellement après chaque clic sur le bouton
    setCountLike(_count.likes);
  
    // Vérifier si l'utilisateur a aimé ce poste après chaque clic sur le bouton
    const isUserFavorite = likes.find((value) => value.user.email === session?.user?.email);
    setIsFavorite(!!isUserFavorite);
  }, [likes, _count.likes, session?.user?.email]);

  useEffect(() => {
    const fetchData = async () => {
      const likeCount = await fetchLikeCount({postId: id})
      if (likeCount) setCountLike(likeCount)

      const isUserFavorite = likes.find((value) => value.user.email == session?.user?.email)
      if (isUserFavorite) setIsFavorite(true)
    }

    fetchData();
  }, [])
  
  return (
    <Card key={`postCard_${id}`} variant="outlined" sx={{ width: 390 }}>
      <Box key={`postCard_head${id}`} sx={{display:"flex", alignItems: "flex-start", justifyContent: "space-between", wordWrap: "break-word"}}>
        <Box key={`postCard_head_title${id}`}  width={'80%'}>
          <Link href={`/posts/${ id }`}>
            <Typography level="title-lg" >{toUppercaseFirstChar(title)}</Typography>
          </Link>
        </Box>
        <IconButton aria-label="Like minimal photography" variant="plain" onClick={handleSetFavorite} sx={{mt: "-0.5rem", "&:hover:":{color: "red"}}}>
          <Heart color={ isFavorite ? "#000" : 'grey'}/>
        </IconButton>
      </Box>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography>Owner : {owner.name?.toLocaleUpperCase()}</Typography>
      </CardContent>
      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardActions orientation="horizontal" sx={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography level="body-xs">{countLike.toString()} like(s)</Typography>
          <Typography level="body-xs" suppressHydrationWarning>Published : {convertDateToString(createdAt)}</Typography>
        </CardActions>
      </CardOverflow>
    </Card>
  );
}

