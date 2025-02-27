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
import { signIn, useSession } from 'next-auth/react'
import Link from "next/link";
import { addLike, removeLike } from "@/app/actions/post";
import { PostCardType } from "@/app/common/types/posts";
import { convertDateToString, toUppercaseFirstChar } from "@/app/lib/utils";
import CategoryTag from "../category/categoryTag";


export default function PostCard({data}: {data: PostCardType}) {
  const { id, title, createdAt, owner, category, likes, _count } = data
  const { data : session } = useSession()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [countLike, setCountLike] = useState<number>(0)

  const addLikeToPost = async () => await addLike({postId:id})
  const removeLikeToPost = async () => await removeLike({postId:id})

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
    const fetchData = async () => {
      setCountLike(_count.likes)
  
      const isUserFavorite = likes.find((value) => value.userId == session?.user?.id)
      if (isUserFavorite) setIsFavorite(true)
    }

    fetchData();
  }, [session?.user?.email]);
  
  return (
    <Card key={`postCard_${id}`} variant="outlined">
      <Box key={`post_card_title_${id}`} sx={{display:"flex", alignItems: "flex-start", justifyContent: "space-between", wordWrap: "break-word"}}>
        <Box key={`postCard_head_title${id}`} width={'85%'}>
          <Link href={`/posts/${ id }`}>
            <Typography level="title-lg" >{toUppercaseFirstChar(title.slice(0, 31)) + (title.length > 31 ? "...": "")}</Typography>
          </Link>
        </Box>
        <IconButton aria-label="Like minimal photography" variant="plain" onClick={handleSetFavorite} sx={{mt: "-0.5rem",}}>
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
        <CategoryTag name={category.name} color={category.color}/>
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

