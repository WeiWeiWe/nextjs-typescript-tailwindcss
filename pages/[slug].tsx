import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import moment from 'moment';
import parse from 'html-react-parser';
import DefaultLayout from '@/components/layout/DefaultLayout';
import CommentForm from '@/components/common/CommentForm';
import { GitHubAuthButton } from '@/components/button';
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import useAuth from '@/hooks/useAuth';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, tags, meta, thumbnail, createdAt } = post;
  const userProfile = useAuth();

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="pb-20">
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
        <div className="prose prose-lg dark:prose-invert max-w-full mx-auto">
          {parse(content)}
        </div>
        <div className="py-20">
          {userProfile ? (
            <CommentForm title="Add comment" />
          ) : (
            <div className="flex flex-col items-end space-y-2">
              <h3 className="text-secondary-dark text-xl font-semibold">
                Login to add comment
              </h3>
              <GitHubAuthButton />
            </div>
          )}
        </div>
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
  };
}

export const getStaticProps: GetStaticProps<
  StaticPropsResponse,
  { slug: string }
> = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.slug });
    if (!post) return { notFound: true };

    const { _id, title, content, meta, slug, tags, thumbnail, createdAt } =
      post;

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
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

export default SinglePost;
