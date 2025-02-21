"use server"
import { getServerSession } from "next-auth/next"
import { Post } from "@prisma/client";

import authOptions from "@/app/lib/authOptions";
import { prismaClientDB } from "@/app/lib/prismaClient";
import { AddPostType } from "../common/types/posts";

export const addLike = async ({postId}: {postId: string}) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.email == null) return null
  const user = await prismaClientDB.user.findUnique({
    select: {id: true},
    where: {
      email: session?.user?.email
    }
  })
  if (user == null) return null

  const updatedPost = await prismaClientDB.post.update({
    where: { id : postId },
    data: {
      likes: {
        create: {
          userId: user.id,
        },
      },
    },
  })
}

export const removeLike = async ({postId}: {postId: string}) => {
    const session = await getServerSession(authOptions);
    if (session?.user?.email == null) return
    const user = await prismaClientDB.user.findUnique({
      select: {id: true},
      where: {
        email: session?.user?.email
      }
    })
    if (user == null) return

    const updatedPost = await prismaClientDB.post.update({
      where: { id : postId },
      data: {
        likes: {
            deleteMany: {
                // Spécifiez les conditions pour supprimer le like du user puis l'association du like et du user
                userId: user.id,
            },
        },
      },
    })
}

export const fetchLikeCount = async ({postId}: {postId: string}) => {
    const postLikesPosts = await prismaClientDB.post.findUnique({
        where: { id : postId },
        select: {
          likes: true
        }
    })
    return postLikesPosts?.likes.length
}

export const fetchPost = async ({postId}: {postId: string}) => {
  return await prismaClientDB.post.findUnique({
    where: { id : postId },
    select: {
      id: true,
      title: true,
      description: true,
      userId: true,
      owner: {
        select: {
          name: true,
          email: true,
        }
      },
      updatedAt: true,
      createdAt: true,
    }
  })
}

export const addPost = async ({post}: {post: AddPostType}) => {
  await prismaClientDB.post.create({
    data: {
      title: post.title,
      description: post.description,
      owner: {
        connect: {
          id: post.userId, // Remplacez ceci par l'ID de l'utilisateur
        },
      },
    }
  })
}

/**
 * Il semble que vous utilisez la méthode update de Prisma pour mettre à jour un post. Cependant, vous passez l'objet post entier à la propriété data. Cela pourrait être la cause du problème si l'objet post contient des champs qui ne devraient pas être mis à jour, comme createdAt ou id.
 * Si vous voulez seulement mettre à jour certains champs, vous devriez spécifier ces champs dans l'objet data. Par exemple, si vous voulez seulement mettre à jour le title et le description,
 * @param post
 */
export const updatePost = async ({post}: {post: Post}) => {
  await prismaClientDB.post.update({
    where: {id: post.id},
    data: {
      title: post.title,
      description: post.description,
      userId: post.userId,
    }
  })
}

export const deletePost = async ({id}: {id: string}) => {
  await prismaClientDB.post.delete({
    where: {id: id}
  })
}