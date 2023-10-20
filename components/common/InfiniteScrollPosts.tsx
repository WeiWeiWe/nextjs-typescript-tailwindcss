import { FC, ReactNode, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostDetail } from '@/utils/types';
import PostCard from './PostCard';
import ConfirmModal from './ConfirmModal';

interface IProps {
  posts: PostDetail[];
  showControls?: boolean;
  hasMore: boolean;
  next: () => void;
  dataLength: number;
  loader?: ReactNode;
  onPostRemoved: (post: PostDetail) => void;
}

const InfiniteScrollPosts: FC<IProps> = ({
  posts,
  showControls,
  hasMore,
  next,
  dataLength,
  loader,
  onPostRemoved,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [postToRemove, setPostToRemove] = useState<PostDetail | null>(null);

  const handleOnDeleteClick = (post: PostDetail) => {
    setPostToRemove(post);
    setShowConfirmModal(true);
  };

  const handleDeleteCancel = () => {
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = async () => {
    if (!postToRemove) return handleDeleteCancel();

    setShowConfirmModal(false);
    setRemoving(true);
    const { data } = await axios.delete(`/api/posts/${postToRemove?.id}`);

    if (data?.removed) {
      onPostRemoved(postToRemove);
    }
    setRemoving(false);
  };

  const defaultLoader = (
    <p className="p-3 text-secondary-dark opacity-50 text-center font-semibold text-xl animate-pulse">
      Loading...
    </p>
  );

  return (
    <>
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
                <PostCard
                  key={post?.slug}
                  post={post}
                  controls={showControls}
                  onDeleteClick={() => handleOnDeleteClick(post)}
                  busy={post?.id === postToRemove?.id && removing}
                />
              ))}
          </div>
        </div>
      </InfiniteScroll>
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this post permanently!"
        onClose={handleDeleteCancel}
        onCancel={handleDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
      />
    </>
  );
};

export default InfiniteScrollPosts;
