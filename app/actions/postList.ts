import { getServerSession } from "next-auth/next"

import { prismaClientDB } from '@/app/lib/prismaClient'
import authOptions from "@/app/lib/authOptions";

// La liste des posts publiés dans l'ordre décroissant.
export const getAllPosts = async () => {
    return await prismaClientDB.post.findMany({
        where: { isPublished: true },
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
        orderBy: [{ updatedAt: 'desc', }],
    })
}

const NB_LAST_POSTS = 5
// La liste des NB_LAST_POSTS derniers posts publiés par les autres auteurs, dans l'ordre décroissant.
export const getAllNbLastPostsNotOwned = async ({userId} : {userId: string | null}) => {
    const session = await getServerSession(authOptions);

    if (userId == null) return []
    return await prismaClientDB.post.findMany({
        where: { 
            isPublished: true,
            NOT: {
                owner: {
                    id: userId
                }
            }
        },
        select: {
            id: true,
            title: true,
            createdAt: true,
            owner: {
                select: {
                    id: true,
                    name: true,
                    jobName: true,
                    image: true,
                }
            },
            _count: {
                select: { likes: true },
            },
        },
        orderBy: [{ updatedAt: 'desc', }],
    })
}