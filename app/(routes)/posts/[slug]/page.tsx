import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";


import { GetPostType } from "@/app/common/types/posts";
import { fetchPostBySlug } from "@/app/actions/post";
import authOptions from "@/app/lib/authOptions";
import PostItem from "@/app/components/common/PostItem";

export default async function Page({ params }: { params: { slug: string } }) {
    const session = await getServerSession(authOptions);

    const paramSlug = params.slug 
    if (paramSlug == undefined || paramSlug.length <= 0) notFound()
    
    let data : GetPostType | null = null

    if (paramSlug == "new") {
        if (session == null) {
            redirect("/api/auth/signin")
        } else {
            data = {id: paramSlug, title: "Hello World", slug: paramSlug, description: "", isPublished: false, userId: session?.user.id, 
                owner: {email: session?.user?.email ?? null, socialBio: null,name: session?.user?.name ?? null} , createdAt: null, updatedAt: null, categoryId: null,
            }
        }
    } else {
        const postData = await fetchPostBySlug({slug: paramSlug})
        
        if (postData == null) notFound()
        data = { ...postData, slug: paramSlug, }
    }

    return (
        <PostItem data={data} />
    )
}