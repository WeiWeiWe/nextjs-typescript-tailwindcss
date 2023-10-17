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
import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePost: NextPage<Props> = ({ post }) => {
  const { title, content, tags, meta, thumbnail, createdAt } = post;

  return (
    <DefaultLayout title={title} desc={meta}>
      <div className="pb-20">
        {thumbnail ? (
          <div className="relative aspect-video">
            <Image src={thumbnail} alt={title} layout="fill" />
          </div>
        ) : null}
        <div className="flex items-center justify-between py-2">
          {tags?.map((t, index) => (
            <span key={t + index}>#{t}</span>
          ))}
          <span>
            {createdAt
              ? moment(createdAt).format('YYYY-MM-DD')
              : moment().format('YYYY-MM-DD')}
          </span>
        </div>
        <div className="prose prose-lg max-w-full mx-auto">
          <h1>{title || ''}</h1>
          {parse(content)}
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