import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { PostDetail } from '@/utils/types';
import { formatPosts, readPostsFromDb } from '@/lib/utils';
import InfiniteScrollPosts from '@/components/common/InfiniteScrollPosts';
import axios from 'axios';

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

let pageNo = 0;
const limit = 9;

const Posts: NextPage<IProps> = ({ posts }) => {
  const [postsToRender, setPostsToRender] = useState(posts);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const fetchMorePosts = async () => {
    try {
      pageNo++;
      const { data } = await axios(
        `/api/posts?limit=${limit}&pageNo=${pageNo}`
      );

      if (data?.posts?.length < limit) {
        setPostsToRender([...postsToRender, ...data.posts]);
        setHasMorePosts(false);
      } else {
        setPostsToRender([...postsToRender, ...data.posts]);
      }
    } catch (error) {
      setHasMorePosts(false);
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto p-3">
        <InfiniteScrollPosts
          hasMore={hasMorePosts}
          next={fetchMorePosts}
          dataLength={postsToRender.length}
          posts={postsToRender}
          pageLimit={limit}
          showControls
        />
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
