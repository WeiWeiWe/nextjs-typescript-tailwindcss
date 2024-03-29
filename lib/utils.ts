import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import formidable from 'formidable';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dbConnect from '@/lib/dbConnect';
import Post, { PostModelSchema } from '@/models/Post';
import { IComment } from '@/models/Comment';
import { CommentResponse, PostDetail, UserProfile } from '@/utils/types';

interface FormidablePromise<T> {
  files: formidable.Files;
  body: T;
}

export const readFile = <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ files, body: fields as T });
    });
  });
};

export const readPostsFromDb = async (
  limit: number,
  pageNo: number,
  skip?: number
) => {
  if (!limit || limit > 10)
    throw Error('Please use limit under 10 and a valid pageNo');
  const finalSkip = typeof skip === 'number' ? skip : limit * pageNo;
  await dbConnect();
  const posts = await Post.find()
    .sort({ createdAt: 'desc' })
    .select('-content')
    .skip(finalSkip)
    .limit(limit);

  return posts;
};

export const formatPosts = (posts: PostModelSchema[]): PostDetail[] => {
  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    createdAt: post.createdAt.toString(),
    thumbnail: post.thumbnail?.url || '',
    meta: post.meta,
    tags: post.tags,
  }));
};

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user as UserProfile;
  return user?.role === 'admin';
};

export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const user = session?.user;
  if (user) return user as UserProfile;
};

const getLikedByOwner = (likes: any[], user: UserProfile) => {
  return likes?.includes(user?.id);
};

export const formatComment = (
  comment: IComment,
  user?: UserProfile
): CommentResponse => {
  const owner = comment?.owner as any;

  return {
    id: comment?._id?.toString(),
    content: comment?.content || '',
    likes: comment?.likes?.length,
    chiefComment: comment?.chiefComment || false,
    createdAt: comment?.createdAt?.toString() as string,
    owner: { id: owner?._id, name: owner?.name, avatar: owner?.avatar },
    repliedTo: comment?.repliedTo?.toString(),
    likedByOwner: user ? getLikedByOwner(comment?.likes, user) : false,
  };
};
