export interface User {
  id: string;
  name: string;
  handle: string;
  bio: string;
  verified: boolean;
  followers: number;
  following: boolean;
  joinedAt: number;
  location?: string;
}

export interface Tweet {
  id: string;
  authorId: string;
  text: string;
  createdAt: number;
  likes: number;
  retweets: number;
  liked: boolean;
  retweeted: boolean;
  bookmarked: boolean;
  replyToId?: string;
}

export interface DB {
  users: User[];
  tweets: Tweet[];
}
