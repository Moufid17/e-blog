export type AcccountPrivilegeType = "Basic" | "Argent" | "Or" | "Platine" | "Diamant" | "Pro" | "Admin" | "SuperAdmin"

type AnalyticType = {
  likes?: number,
  comments?: number,
  views?: number,
} 

type SocialType = {
  linkedin?: string,
  github?: string,
  twitter?: string,
  facebook?: string,
  instagram?: string,
  website?: string,
  youtube?: string,
  twitch?: string,
  discord?: string,
  tiktok?: string,
} 

type OwnerType = {
  name?: string | null,
  image?: string | null,
  jobName?: string | null,
} 

export type AccoutProfilType = {
  name?: string | null,
  image?: string | null,
  email?: string | null,
  jobName?: String | null,
  accountPrivilege?: AcccountPrivilegeType,
  socialLink?: SocialType,
  location?: string | null,
  stats?: AnalyticType
}

export type AccountPostType = {
  id: string,
  title: string;
  createdAt?: Date,
  updatedAt?: Date,
  stats?: AnalyticType,
  owner?: Omit<OwnerType, "name"> & { name: string },
  _count?: {
    likes: number,
  },
  category?: {
    name: string,
    color: string,
  },
  isPublished?: boolean,
} | null

export type AccountRecentPostType = Readonly<Omit<AccountPostType, "updatedAt">> | null
export type AccountPostOwnType = Readonly<Omit<NonNullable<AccountPostType>, "createdAt" | "stats" | "owner">>
export type AccountDraftPostOwnType = Readonly<Omit<NonNullable<AccountPostType>, "createdAt" | "_count" | "stats" | "owner">>

export type AccountAnalyticsType = {
  week? : AnalyticType,
  month? : AnalyticType,
  year? : AnalyticType,
  all? : AnalyticType,
}

export type OwnPostGroupByType = {isPublished: AccountPostOwnType[], isNotPublished: AccountPostOwnType[]};