import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import PostItem from "@/app/components/common/PostItem";

import { GetPostType } from "@/app/common/types/posts";
import { fetchPostBySlug } from "@/app/actions/post";
import authOptions from "@/app/lib/authOptions";

export default async function Page({ params }: { params: { slug: string } }) {
    const session = await getServerSession(authOptions);

    const paramSlug = params.slug 
    if (paramSlug == undefined || paramSlug.length <= 0) notFound()
    
    let data : GetPostType | null = null

    if (params.slug == "new") {
        if (session == null) {
            redirect("/api/auth/signin")
        } else {
            data = {id: paramSlug, title: "Hello World", description: "", isPublished: false, userId: session?.user.id, 
                owner: {email: session?.user?.email ?? null, socialBio: null,name: session?.user?.name ?? null} , createdAt: null, updatedAt: null, categoryId: null,}

        }
    } else {
        data = await fetchPostBySlug({slug: paramSlug})
        if (data == null) notFound()
    }

    return (
        <PostItem data={data} />
    )
}