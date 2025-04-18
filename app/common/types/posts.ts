export type PostCardType = {
    id: string,
    title: string,
    createdAt: Date,
    owner: {
      id: string,
      name: string | null,
      socialBio: string | null,
    };
    category: {
      name: string,
      color: string,
    };
    likes: {
      user: {
        email: string | null;
      };
      userId: string;
    }[],
    _count: {
      likes: number,
    };
}

export type GetPostType = {
    id: string,
    title: string,
    description: string,
    userId: string | null,
    owner: {
      name: string | null,
      email: string | null,
    }
    createdAt: Date | null,
    updatedAt: Date | null,
    categoryId: string | null,
    isPublished: boolean,
} | null

export type AddPostType = {
  title: string;
  description: string,
  userId?: string | null,
  createdAt: Date | null,
  updatedAt: Date | null,
  categoryId: string | null,
  isPublished: boolean,
} 

export type UpdatePostType = {
  id: string,
  title: string;
  description: string,
  userId: string | null,
  updatedAt: Date | null,
  categoryId: string | null,
  isPublished: boolean,
} 

export type Posts = PostCardType[]
