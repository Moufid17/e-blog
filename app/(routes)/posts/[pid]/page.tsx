import PostItem from "@/app/components/common/postItem";

export default function Post({ params }: { params: { pid: string } }) {
    return(
        <PostItem postId={params.pid} />
    )
}