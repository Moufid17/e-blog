import { prismaClientDB } from "@/app/lib/prismaClient";

export const likeReceived = async ({userId}: {userId: string| null}) => {
  if (!userId) return 0;
  const postLikesPosts = await prismaClientDB.post.findMany({
      where: {
        userId: userId
      },
      select: {
        _count: {
          select: { likes: true },
        }
      },
  });
  return postLikesPosts.reduce((sum, post) => sum + post._count.likes, 0);
}

export const getAllOwnPostPublished = async () => {
  return await prismaClientDB.post.findMany({
      select: {
          id: true,
          title: true,
          createdAt: true,
          owner: {
              select: {
                  id: true,
                  name: true,
                  image: true,
              }
          },
          likes: {
              select: {
                  user: {
                      select: {
                        name: true,
                        image: true
                      }
                  }
              }
          },
          _count: {
            select: { likes: true },
          },
      },
      orderBy: [{ updatedAt: 'desc', }],
  })
}