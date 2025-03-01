import Link from "next/link";

import { Button, Card, CardOverflow, Chip, Divider, Stack, Typography } from "@mui/joy";

import AccountArticleCard from "./AccountArticleCard";
import AccountDraftCard from "./AccountDraftCard";
import { AccountPostOwnType, AccountRecentPostType } from "@/app/common/types/account";
import { DEFAULT_AVATAR_IMAGE, DEFAULT_JOB_NAME, DEFAULT_PSEUDO, MAX_ARTICLE_CARD } from "@/app/help/constants";

const recentArticleList: AccountRecentPostType[] = [
    {
        id:"0",
        title: "Responsive UI Design With Material-UI & React",
        createdAt:  new Date(),
        owner: {
            name: DEFAULT_PSEUDO,
            image: DEFAULT_AVATAR_IMAGE,
            jobName: DEFAULT_JOB_NAME,
        },
        _count: {
            likes: 20
        },
    }
]
export function AccountRecentListArticleCard({data}: {data: {title?: string, articles?: AccountRecentPostType[]}}) {
    const { title = "Recent Blog List",  articles = recentArticleList} = data
    
    return (
        <Card key={`account_recent_articles_card`}>
            <Typography level="h4">{title}</Typography>
            <Divider inset="context" />
            <Stack key={`account_recent_articles_cards`} gap={1}>
                {articles.map((recentArticle: AccountRecentPostType, index: number) => (
                    <AccountArticleCard key={`account_recent_articles_card_${index}`} data={recentArticle} />
                ))}
            </Stack>
            {articles.length > MAX_ARTICLE_CARD && <CardOverflow sx={{px: 0}}>
                <Link href="/">
                    <Button fullWidth sx={{borderRadius: `0 0 6px 6px`}}>View all</Button>
                </Link>
            </CardOverflow>}
        </Card>
    )
}

const myArticleList: AccountPostOwnType[] = [
    {
        id:"0",
        title: "Responsive UI Design With Material-UI & React",
        updatedAt:  new Date(),
        category: {
            name: "John Doe",
            color: "primary.solidDisabledBg"},
        _count: {
            likes: 20
        },
    }
]
export function AccountMyListArticleCard({data}: {data: {title?: string, articles?: AccountPostOwnType[]}}) {
    const { title = "My Articles", articles = myArticleList} = data
    return (
        <Card title="account_lists_articles_card" sx={{ maxHeight: "950px" }}>
            <Stack key={"account_lists_articles_card_header"} direction={"row"} gap={1.5}><Typography level="h4">{title}</Typography><Chip color="primary" variant="solid">{articles.length}</Chip></Stack>
            <Divider inset="context"/>
                <Stack key={`account_articles_cards`} gap={1} sx={{overflow: "auto",}}>
                    {articles.map((myArticle: AccountPostOwnType, index: number) => (
                        <>
                            <AccountArticleCard key={`account_articles_cards_card_${index}`} data={myArticle} isOwner />
                            <Divider />
                        </>
                    ))}
                </Stack>
        </Card>
    )
}


const draftArticleList: AccountPostOwnType[] = [
    {
        id:"0",
        title: "Responsive UI Design With Material-UI & React",
        updatedAt:  new Date(),
        category: {
            name: "UI/UX",
            color: "success.solidDisabledBg"
        }
    }
]
export function AccountDraftListArticleCard({data}: {data: {title?: string, articlesDraft?: AccountPostOwnType[]}}) {
    const { title = "Draft(s)",  articlesDraft = draftArticleList} = data
    return (
        <Card title="account_lists_drafts_card" sx={{ maxHeight: "950px" }}>
            <Stack key={`account_lists_drafts_card_header`}  direction={"row"} gap={1.5}><Typography level="h4">{title}</Typography><Chip color="success" variant="solid">{articlesDraft.length}</Chip></Stack>
            <Divider inset="context"/>
                <Stack key={`account_drafts_cards`} gap={1} sx={{overflow: "auto",}}>
                    {articlesDraft.map((articleDraft: AccountPostOwnType, index: number) => (
                        <>
                            <AccountDraftCard key={`account_drafts_cards_card_${index}`} data={articleDraft} />
                            <Divider />
                        </>
                    ))}
                </Stack>
        </Card>
    )
}