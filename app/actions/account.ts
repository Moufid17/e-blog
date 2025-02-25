import { prismaClientDB } from "@/app/lib/prismaClient";
import { OwnPostGroupByType } from "../common/types/account";

// Get account details
export const getAccountDetails = async ({userId}: {userId: string | null}) => {
  if (!userId) return null;
  return await prismaClientDB.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      jobName: true,
      socialBio: true,
      socialLinkedin: true,
      socialGithub: true,
      socialYoutube: true,
      socialWebsite: true,
      location: true,
      type: true,
    },
  });
}

// All likes received
export const likeReceived = async ({userId}: {userId: string| null}) => {
  if (!userId) return 0;
  const postLikesPosts = await prismaClientDB.post.findMany({
      where: {
        userId: userId,
        isPublished: true,
      },
      select: {
        _count: {
          select: { likes: true },
        }
      },
  });
  return postLikesPosts.reduce((sum, post) => sum + post._count.likes, 0);
}

// Get all posts owned, group by isPublished
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