import Link from "next/link";

import { Button, Card, CardOverflow, Chip, Divider, Stack, Typography } from "@mui/joy";
import AccountArticleCard from "./AccountArticleCard";
import AccountDraftCard from "./AccountDraftCard";

import { AccountDraftPostOwnType, AccountFavoritePostType, AccountPostOwnType, AccountRecentPostType } from "@/app/common/types/account";
import { MAX_ARTICLE_CARD } from "@/app/help/constants";


export function AccountRecentListArticleCard({data}: {data: {title?: string, articles?: AccountRecentPostType[] | null}}) {
    
    return (
        <Card key={`account_recent_articles_card`}>
            <Typography level="h4">{"Recent Blog List"}</Typography>
            <Divider inset="context" />
            { data.articles && data.articles.length > 0 ?
                <>
                    <Stack key={`account_recent_articles_cards`} gap={1}>
                    {data.articles.map((recentArticle: AccountRecentPostType, index: number) => (
                        <AccountArticleCard key={`account_recent_articles_card_${index}`} data={recentArticle} isCreateDateTime/>
                    ))}
                    </Stack>
                    {data.articles.length > MAX_ARTICLE_CARD && <CardOverflow sx={{px: 0}}>
                        <Link href="/">
                            <Button fullWidth sx={{borderRadius: `0 0 6px 6px`}}>View all</Button>
                        </Link>
                    </CardOverflow>}
                </> : <></>
            }
        </Card>
    )
}

export function AccountMyListArticleCard({data}: {data: {title?: string, articles?: AccountPostOwnType[] | null}}) {
    return (
        <Card title="account_lists_articles_card" sx={{ maxHeight: "950px" }}>
            <Stack key={"account_lists_articles_card_header"} direction={"row"} gap={1.5}><Typography level="h4">{"My Articles"}</Typography><Chip color="primary" variant="solid">{data.articles ? data.articles.length : 0}</Chip></Stack>
            <Divider inset="context"/>
            {data.articles && data.articles.length > 0 ? 
                <Stack key={`account_articles_cards`} gap={1} sx={{overflow: "auto",}}>
                    {data.articles.map((myArticle: AccountPostOwnType, index: number) => (
                        <>
                            <AccountArticleCard key={`account_articles_cards_card_${index}`} data={myArticle} isOwner />
                            <Divider />
                        </>
                    ))}
                </Stack> : <></>
            }
        </Card>
    )
}


export function AccountDraftListArticleCard({data}: {data: {title?: string, articlesDraft?: AccountDraftPostOwnType[] | null}}) {
    return (
        <Card title="account_lists_drafts_card" sx={{ maxHeight: "950px" }}>
            <Stack key={`account_lists_drafts_card_header`}  direction={"row"} gap={1.5}><Typography level="h4">{"Draft(s)"}</Typography><Chip color="success" variant="solid">{data.articlesDraft ? data.articlesDraft.length : 0}</Chip></Stack>
            <Divider inset="context"/>
            {data.articlesDraft && data.articlesDraft.length > 0 ? 
                <Stack key={`account_drafts_cards`} gap={1} sx={{overflow: "auto",}}>
                    {data.articlesDraft.map((articleDraft: AccountDraftPostOwnType, index: number) => (
                        <>
                            <AccountDraftCard key={`account_drafts_cards_card_${index}`} data={articleDraft} />
                            <Divider />
                        </>
                    ))}
                </Stack> : <></>
            }
        </Card>
    )
}


export function AccountFavoriteListArticleCard({data}: {data: AccountFavoritePostType[] | null}) {
    return (
        <Card title="account_lists_fav_card" sx={{ maxHeight: "950px" }}>
            <Stack key={`account_lists_favs_card_header`}  direction={"row"} gap={1.5}><Typography level="h4">{"Favorites"}</Typography><Chip color="success" variant="solid">{data ? data.length : 0}</Chip></Stack>
            <Divider inset="context"/>
            {data && data.length > 0 ? 
                <Stack key={`account_fav_articles_cards`} gap={1} sx={{overflow: "auto",}}>
                    {data.map((favArticle: AccountFavoritePostType, index: number) => (
                        <AccountArticleCard key={`account_fav_articles_card_${index}`} data={favArticle} />
                    ))} 
                </Stack> : <></>
            }
        </Card>
    )
}