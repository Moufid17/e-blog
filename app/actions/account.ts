import { prismaClientDB } from "@/app/lib/prismaClient";
import { AccountPostOwnType, OwnPostGroupByType } from "../common/types/account";

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

export const getAllOwnPost = async ({userId}: {userId: string | null}) => {
  if (!userId) return {isPublished: [], isNotPublished: []}
  const allOwn = await prismaClientDB.post.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      updatedAt: true,
      category: {
        select: {
          name: true,
          color: true,
        },
      },
      isPublished: true,
      _count: {
        select: { likes: true },
      },
    },
    orderBy: [{ updatedAt: 'desc', }],
  })

  if (!allOwn) return {isPublished: [], isNotPublished: []};
  return allOwn.reduce<OwnPostGroupByType>((acc, post) => {
    if (post.isPublished) {
      acc.isPublished.push(post);
    } else {
      acc.isNotPublished.push(post);
    }
    return acc;
  }, {isPublished: [], isNotPublished: []});
}