import { z } from "zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import authOptions from "@/app/lib/authOptions";
import { updateAccountDetails } from "@/app/actions/account";
import { DEFAULT_JOB_NAME, DEFAULT_PSEUDO } from "@/app/help/constants";
import { AccountEditProfileType } from "@/app/common/types/account";

const postSchema = z.object(
    {
        job: z.string().min(5, {message: "Too short"}).max(100, {message: "Too long"}).default(DEFAULT_JOB_NAME).optional(),
        pseudo: z.string().min(5, {message: "Too short"}).max(18, {message: "Too long"}).default(DEFAULT_PSEUDO).optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
        youtube: z.string().optional(),
        website: z.string().optional(),
        twitter: z.string().optional(),
        discord: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        location: z.string().optional(),
    }
);

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    
    const postData = postSchema.safeParse(body);

    if (!postData.success) {
        console.error("Invalid request body => ", postData.data);
        return NextResponse.json({error: postData.error.message}, {status: 400});
    }
    
    try{
        await updateAccountDetails({userId: session?.user?.id ?? null, data: postData.data as AccountEditProfileType})
        return NextResponse.json({},{status: 200});
    } catch (error) {     
        console.error("An error occurred while updating the account.", error);
        return NextResponse.json({message: "An error occurred while updating the account."}, {status: 400});
    }
}