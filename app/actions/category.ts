"use server"
import { prismaClientDB } from "@/app/lib/prismaClient";

export const getAllCategories = async () => {
    return await prismaClientDB.category.findMany({})
}