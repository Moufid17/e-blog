import PostItem from "@/app/components/common/postItem";
import PostItemExperimental from "@/app/components/common/PostItemExperimental";

export default function Post({ params }: { params: { pid: string } }) {
    return(
        <PostItemExperimental postId={params.pid} />
    )
}