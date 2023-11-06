import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { GitHubAuthButton } from '../button';
import useAuth from '@/hooks/useAuth';
import { CommentResponse } from '@/utils/types';

interface IProps {
  belongsTo: string;
}

const Comments: FC<IProps> = ({ belongsTo }) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const userProfile = useAuth();

  const handleNewCommentSubmit = async (content: string) => {
    try {
      const newComment = await axios
        .post('/api/comment', { content, belongsTo })
        .then(({ data }) => data?.comment || []);

      if (newComment?.length > 0) {
        setComments([...comments, newComment]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    axios(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data?.comments || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="py-20 space-y-4">
      {userProfile ? (
        <CommentForm title="Add comment" onSubmit={handleNewCommentSubmit} />
      ) : (
        <div className="flex flex-col items-end space-y-2">
          <h3 className="text-secondary-dark text-xl font-semibold">
            Login to add comment
          </h3>
          <GitHubAuthButton />
        </div>
      )}
      {comments?.map(({ id, owner, createdAt, content }) => {
        return (
          <div key={id}>
            <CommentCard profile={owner} date={createdAt} content={content} />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
