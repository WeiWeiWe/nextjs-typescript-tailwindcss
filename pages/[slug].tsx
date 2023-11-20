import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';
import parse from 'html-react-parser';
import useAuth from '@/hooks/useAuth';
import DefaultLayout from '@/components/layout/DefaultLayout';
import Comments from '@/components/common/Comments';
import LikeHeart from '@/components/common/LikeHeart';
import AuthorInfo from '@/components/common/AuthorInfo';
import Share from '@/components/common/Share';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import User from '@/models/User';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const host = 'http://localhost:3000';

const SinglePost: NextPage<Props> = ({ post }) => {
  const {
    id,
    title,
    content,
    tags,
    meta,
    thumbnail,
    createdAt,
    author,
    slug,
    relatedPosts,
  } = post;

  const [likes, setLikes] = useState({ likedByOwner: false, count: 0 });
  const [liking, setLiking] = useState(false);

  const user = useAuth();

  const getLikeLabel = useCallback((): string => {
    const { likedByOwner, count } = likes;

    if (likedByOwner && count === 1) return 'You liked this post.';

    if (likedByOwner) return `You and ${count - 1} other likes this post.`;

    if (count === 0) return 'Like post.';

    return count + ' people liked this post.';
  }, [likes]);

  const handleOnLikeClick = async () => {
    if (!user) return await signIn('github');

    try {
      setLiking(true);
      const { data } = await axios.post(`/api/posts/update-like?postId=${id}`);
      setLiking(false);
      setLikes({ likedByOwner: !likes.likedByOwner, count: data?.newLikes });
    } catch (error) {
      console.error(error);
      setLiking(false);
    }
  };

  useEffect(() => {
    axios(`/api/posts/like-status?postId=${id}`)
      .then(({ data }) =>
        setLikes({
          likedByOwner: data?.likedByOwner || false,
          count: data?.likesCount || 0,
        })
      )
      .catch((error) => console.error(error));
  }, []);

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="lg:px-0 px-3">
        {thumbnail ? (
          <div className="relative aspect-video">
            <Image src={thumbnail} alt={title} layout="fill" />
          </div>
        ) : null}
        <h1 className="text-6xl font-semibold text-primary-dark dark:text-primary py-2">
          {title || ''}
        </h1>
        <div className="flex items-center justify-between py-2 text-secondary-dark dark:text-secondary-light">
          {tags?.map((t, index) => (
            <span key={t + index}>#{t}</span>
          ))}
          <span>
            {createdAt
              ? moment(createdAt).format('YYYY-MM-DD')
              : moment().format('YYYY-MM-DD')}
          </span>
        </div>
        <div className="py-5 sticky top-0 z-50 bg-primary dark:bg-primary-dark transition">
          <Share url={host + '/' + slug} />
        </div>
        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(content)}
        </div>
        <div className="py-10">
          <LikeHeart
            busy={liking}
            liked={likes.likedByOwner}
            label={getLikeLabel()}
            onClick={!liking ? handleOnLikeClick : undefined}
          />
        </div>
        <div className="pt-10">
          {author && <AuthorInfo profile={JSON.parse(author)} />}
        </div>
        <div className="pt-5">
          <h3 className="text-xl font-semibold bg-secondary-dark text-primary p-2 mb-4">
            Related Posts:
          </h3>
          <div className="flex flex-col space-y-4">
            {relatedPosts?.map((p) => {
              return (
                <Link key={p?.slug} href={p?.slug}>
                  <a className="font-semibold text-primary-dark dark:text-primary hover:underline">
                    {p?.title}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
        <Comments belongsTo={id} />
      </div>
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts = await Post.find().select('slug');
    const paths = posts.map(({ slug }) => ({ params: { slug } }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [{ params: { slug: '/' } }],
      fallback: false,
    };
  }
};

interface StaticPropsResponse {
  post: {
    id: string;
    title: string;
    content: string;
    meta: string;
    tags: string[];
    slug: string;
    thumbnail: string;
    createdAt: string;
    author: string;
    relatedPosts: {
      id: string;
      title: string;
      slug: string;
    }[];
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug }).populate('author');
    if (!post) return { notFound: true };

    // fetching related posts according to tags
    const posts = await Post.find({
      tags: { $in: [...(post?.tags || [])] },
      _id: { $ne: post?.id },
    })
      .sort({ createdAt: 'desc' })
      .limit(5)
      .select('slug title');

    const relatedPosts = posts?.map((p) => {
      return {
        id: p?._id?.toString(),
        title: p?.title,
        slug: p?.slug,
      };
    });

    const {
      _id,
      title,
      content,
      meta,
      slug,
      tags,
      thumbnail,
      createdAt,
      author,
    } = post;

    const admin = await User.findOne({ role: 'admin' });
    const authorInfo = (author || admin) as any;

    const postAuthor = {
      id: authorInfo?._id,
      name: authorInfo?.name,
      avatar: authorInfo?.avatar,
      message: `This post is written by ${authorInfo?.name}. ${
        authorInfo?.name?.split(' ')[0]
      } is an full stack developer.
            }`,
    };

    return {
      props: {
        post: {
          id: _id.toString(),
          title,
          content,
          meta,
          slug,
          tags,
          thumbnail: thumbnail?.url || '',
          createdAt: createdAt.toString(),
          author: JSON.stringify(postAuthor),
          relatedPosts,
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default SinglePost;
