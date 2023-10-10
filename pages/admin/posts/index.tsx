import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import PostCard from '@/components/common/PostCard';
import { PostDetail } from '@/utils/types';
import { formatPosts, readPostsFromDb } from '@/lib/utils';

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;

const Posts: NextPage<IProps> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-3">
        <div className="grid grid-cols-3 gap-4">
          {Array.isArray(postsToRender) &&
            postsToRender?.length > 0 &&
            postsToRender.map((post) => (
              <PostCard key={post?.slug} post={post} />
            ))}
        </div>
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  posts: PostDetail[];
}

export const getServerSideProps: GetServerSideProps<ServerSideResponse> =
  async () => {
    try {
      const posts = await readPostsFromDb(limit, pageNo);
      const formattedPosts = formatPosts(posts);
      return {
        props: {
          posts: formattedPosts,
        },
      };
    } catch (error) {
      return { notFound: true };
    }
  };

export default Posts;
