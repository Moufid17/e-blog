"use server"
import { getServerSession } from "next-auth/next"
import { Post } from "@prisma/client";

import authOptions from "@/app/lib/authOptions";
import { prismaClientDB } from "@/app/lib/prismaClient";
import { AddPostType, UpdatePostType } from "../common/types/posts";

export const addLike = async ({postId}: {postId: string}) => {
  const session = await getServerSession(authOptions);

  if (session?.user?.id == null) return null
  // Verifiez si l'utilisateur a déjà liké le post
  const postLikes = await prismaClientDB.post.findUnique({
    where: { id : postId },
    select: {
      likes: {
        where: {
          userId: session?.user?.id,
          postId: postId
        },
      },
    },
  })
  if (postLikes) {
    if (postLikes?.likes.length > 0) return
  }

  await prismaClientDB.post.update({
    where: { id : postId },
    data: {
      likes: {
        create: {
          userId: session?.user?.id,
        },
      },
    },
  })
}

export const removeLike = async ({postId}: {postId: string}) => {
    const session = await getServerSession(authOptions);

    if (session?.user?.id == null) return null

    await prismaClientDB.post.update({
      where: { id : postId },
      data: {
        likes: {
            deleteMany: {
                userId: session.user.id,
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

export const fetchPostBySlug = async ({slug}: {slug: string}) => {
  return await prismaClientDB.post.findUnique({
    where: { slug : slug },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      userId: true,
      owner: {
        select: {
          name: true,
          socialBio: true,
          email: true,
        }
      },
      updatedAt: true,
      createdAt: true,
      categoryId: true,
      isPublished: true,
    }
  })
}

export const addPost = async ({post}: {post: AddPostType}) => {
  if (!post) return
  if (!post.userId)  return
  if (!post.categoryId) return
  
  await prismaClientDB.post.create({
    data: {
      title: post.title,
      slug: post.slug,
      description: post.description,
      isPublished: post.isPublished,
      category: {
        connect: {
          id: post.categoryId, 
        },
      },
      owner: {
        connect: {
          id: post.userId,
        },
      },
    }
  }).catch((error) => {
    console.error("Error creating post:", error.message);
  }
  )
}

/**
 * Il semble que vous utilisez la méthode update de Prisma pour mettre à jour un post. Cependant, vous passez l'objet post entier à la propriété data. Cela pourrait être la cause du problème si l'objet post contient des champs qui ne devraient pas être mis à jour, comme createdAt ou id.
 * Si vous voulez seulement mettre à jour certains champs, vous devriez spécifier ces champs dans l'objet data. Par exemple, si vous voulez seulement mettre à jour le title et le description,
 * @param post
 */
export const updatePost = async ({post}: {post: UpdatePostType}) => {
  if (!post) return
  if (!post.id || !post.userId || !post.categoryId) return
  const existingPost = await prismaClientDB.post.findUnique({
    where: {id: post.id}
  })
  if (!existingPost) return

  await prismaClientDB.post.update({
    where: {id: post.id},
    data: {
      title: post.title,
      slug: post.slug,
      description: post.description,
      userId: post.userId,
      categoryId: post.categoryId,
      isPublished: post.isPublished,
    }
  })
}

export const deletePost = async ({postId}: {postId: string}) => {
  if (!postId) return
  const post = await prismaClientDB.post.findUnique({
    where: {id: postId}
  })
  if (!post) return

  await prismaClientDB.$transaction([
    prismaClientDB.postLikes.deleteMany({
      where: {postId: postId}
    }),
    prismaClientDB.post.delete({
      where: {id: postId}
    })
  ])
}

export const draftPost = async ({postId}: {postId: string}) => {
  if (!postId) return 
  const post = await prismaClientDB.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      isPublished: true
    }
  })
  if (!post) return
  if (!post.isPublished) return
  await prismaClientDB.post.update({
    where: {id: postId},
    data: {
      isPublished: false
    }
  })
}

export const publishPost = async ({postId}: {postId: string}) => {
  if (!postId) return 
  const post = await prismaClientDB.post.findUnique({
    where: {id: postId},
    select: {
      isPublished: true
    }
  })
  if (!post) return
  if (post.isPublished) return
  await prismaClientDB.post.update({
    where: {id: postId},
    data: {
      isPublished: true
    }
  })
}