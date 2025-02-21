import Link from "next/link";

import { Button, Card, CardOverflow, Chip, Divider, Stack, Typography } from "@mui/joy";

import AccountArticleCard from "./AccountArticleCard";
import AccountDraftCard from "./AccountDraftCard";

const recentArticleList: any[] = [
    {
        id: "0",
        title: "Responsive UI Design With Material-UI & React",
        owner: {
            name: "John Doe",
            image: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_5.png"
        }
    },
    {
        id: 1,
        title: "Responsive UI Design With Material-UI & React",
        owner: {
            name: "John Doe",
            image: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_1.png"
        }
        
    },
    {
        id: 2,
        title: "Responsive UI Design With Material-UI & React",
        owner: {
            name: "John Doe",
            image: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_2.png"
        }
        
    },
    {
        id: 3,
        title: "Responsive UI Design With Material-UI & React",
        owner: {
            name: "John Doe",
            image: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_3.png"
        }
        
    },
    {
        id: 4,
        title: "Responsive UI Design With Material-UI & React",
        owner: {
            name: "John Doe",
            image: "https://cdn.jsdelivr.net/gh/alohe/memojis/png/vibrent_4.png"
        }
        
    },
]
export function AccountRecentListArticleCard({data}: {data: any}) {
    const { title = "Recent Blog List",  articles = recentArticleList} = data
    return (
        <Card title="account_recent_articles_card">
            <Typography level="h4">{title}</Typography>
            <Divider inset="context" />
            <Stack key={`account_recent_articles_cards`} gap={1}>
                {articles.map((recentArticle: any, index: number) => (
                    <AccountArticleCard data={recentArticle} />
                ))}
            </Stack>
            <CardOverflow sx={{px: 0}}>
                <Link href="/">
                    <Button fullWidth sx={{borderRadius: `0 0 6px 6px`}}>View all</Button>
                </Link>
            </CardOverflow>
        </Card>
    )
}

const myArticleList: any[] = [
    {
        id: "0",
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 1,
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 2,
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 3,
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 4,
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 5,
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 6,
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 7,
        title: "Responsive UI Design With Material-UI & React"
    },
    {
        id: 6,
        title: "Responsive UI Design With Material-UI & React"
    },
]
export function AccountMyListArticleCard({data}: {data: any}) {
    const { title = "My Articles", articles = myArticleList} = data
    return (
        <Card title="account_lists_articles_card" sx={{ maxHeight: "950px" }}>
            <Stack direction={"row"} gap={1.5}><Typography level="h4">{title}</Typography><Chip color="primary" variant="solid">{articles.length}</Chip></Stack>
            <Divider inset="context"/>
                <Stack key={`account_articles_cards`} gap={1} sx={{overflow: "auto",}}>
                    {articles.map((myArticle: any, index: number) => (
                        <>
                            <AccountArticleCard data={myArticle} isOwner />
                            <Divider />
                        </>
                    ))}
                </Stack>
        </Card>
    )
}


const draftArticleList: any[] = [
    {
        id:"0",
        title: "Responsive UI Design With Material-UI & React",
        subtitle: "Responsive UI Design With Material-UI & React",
        updateAt: "June 20, 2024",
        category: {
            name: "UI/UX",
            color: "success.solidDisabledBg"
        }
    },
    {
        id: "1",
        title: "Responsive UI Design With Material-UI & React",
        subtitle: "Responsive UI Design With Material-UI & React",
        updateAt: "June 20, 2024",
        category: {
            name: "DevOps",
        }
        
    },
    {
        id: "2",
        title: "Responsive UI Design With Material-UI & React",
        subtitle: "Responsive UI Design With Material-UI & React",
        updateAt: "June 20, 2024",
        category: {
            name: "UI/UX",
            color: "success.solidDisabledBg"
        }
        
    },
    {
        id: "3",
        title: "Responsive UI Design With Material-UI & React",
        subtitle: "Responsive UI Design With Material-UI & React",
        updateAt: "June 20, 2024",
        category: {
            name: "UI/UX",
            color: "success.solidDisabledBg"
        }
    },
    {
        id: "4",
        title: "Responsive UI Design With Material-UI & React",
        subtitle: "Responsive UI Design With Material-UI & React",
        updateAt: "June 20, 2024",
        category: {
            name: "UI/UX",
            color: "success.solidDisabledBg"
        }
    },
]
export function AccountDraftListArticleCard({data}: {data: any}) {
    const { title = "Draft(s)",  articlesDraft = draftArticleList} = data
    return (
        <Card title="account_lists_drafts_card" sx={{ maxHeight: "950px" }}>
            <Stack direction={"row"} gap={1.5}><Typography level="h4">{title}</Typography><Chip color="success" variant="solid">{articlesDraft.length}</Chip></Stack>
            <Divider inset="context"/>
                <Stack key={`account_drafts_cards`} gap={1} sx={{overflow: "auto",}}>
                    {articlesDraft.map((articleDraft: any) => (
                        <>
                            <AccountDraftCard data={articleDraft} />
                            <Divider />
                        </>
                    ))}
                </Stack>
        </Card>
    )
}