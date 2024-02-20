import { prismaClientDB } from '@/app/lib/prismaClient'
import { Posts } from "@/app/common/types/posts";

export const getAllPosts = async () => {
    return await prismaClientDB.post.findMany({
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
}