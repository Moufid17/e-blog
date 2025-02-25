import { prismaClientDB } from "@/app/lib/prismaClient";
import { AccountStatsMonthType, MonthType, OwnPostGroupByType, } from "../common/types/account";
import { MONTHS } from "../help/constants";

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

// Get all posts owned, group by is published
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

// Get all stats by userId by month
export const getStatsByMonth = async ({userId}: {userId: string | null}) => {
  if (!userId) return [];
  const data = await prismaClientDB.post.findMany({
    where: {
      userId: userId,
    },
    select: {
      likes: {
        select: {
          createdAt: true,
        }
      }
    }
  });
  if (!data) return [];
  const existingMonth : number[] = [];
  data.forEach((post) => {
    if (post.likes.length > 0) {
      post.likes.forEach((like) => {
        if (!existingMonth.includes(like.createdAt.getMonth())) {
          existingMonth.push(like.createdAt.getMonth());
        }
      });
    }
  })
  const statPerMonth : AccountStatsMonthType[] = []
  data.forEach((post) => {
    if (post.likes.length > 0) {
      post.likes.forEach((like) => {
        const monthIndex = like.createdAt.getMonth();
        const monthData = statPerMonth.find((m) => m.month === monthIndex);
        if (monthData) {
          if (monthData.stats.likes) monthData.stats.likes += 1;
        } else {
          statPerMonth.push({month: monthIndex, stats: {likes: 1}});
        }
      });
    }
  })
  return statPerMonth;
}