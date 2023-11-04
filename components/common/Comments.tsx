import { FC } from 'react';
import CommentForm from './CommentForm';
import { GitHubAuthButton } from '../button';
import useAuth from '@/hooks/useAuth';

interface IProps {
  belongsTo: string;
}

const Comments: FC<IProps> = ({ belongsTo }) => {
  const userProfile = useAuth();

  const handleNewCommentSubmit = (content: string) => {};

  return (
    <div className="py-20">
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
    </div>
  );
};

export default Comments;
