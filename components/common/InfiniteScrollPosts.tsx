import { FC, ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostDetail } from '@/utils/types';
import PostCard from './PostCard';

interface IProps {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next: () => void;
  dataLength: number;
  loader?: ReactNode;
  pageLimit?: number;
}

const InfiniteScrollPosts: FC<IProps> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  pageLimit = 9,
}) => {
  const defaultLoader = (
    <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      {posts?.length < pageLimit ? '' : 'Loading...'}
    </p>
  );

  return (
    <InfiniteScroll
      hasMore={hasMore}
      next={next}
      dataLength={dataLength}
      loader={loader || defaultLoader}
    >
      <div className="max-w-4xl mx-auto p-3">
        <div className="grid grid-cols-3 gap-4">
          {Array.isArray(posts) &&
            posts?.length > 0 &&
            posts.map((post) => (
              <PostCard key={post?.slug} post={post} controls={showControls} />
            ))}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollPosts;
