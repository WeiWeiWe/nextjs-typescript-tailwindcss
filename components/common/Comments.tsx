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

  const insertNewReplyComment = (reply: CommentResponse) => {
    if (!Array.isArray(comments)) return;

    const updatedComments = [...comments];

    const chiefCommentIndex = updatedComments.findIndex(
      ({ id }) => id === reply?.repliedTo
    );

    const { replies } = updatedComments[chiefCommentIndex];
    if (replies) {
      updatedComments[chiefCommentIndex].replies = [...replies, reply];
    } else {
      updatedComments[chiefCommentIndex].replies = [reply];
    }

    setComments([...updatedComments]);
  };

  const handleReplySubmit = async (replyComment: {
    content: string;
    repliedTo: string;
  }) => {
    try {
      const newReplyComment = await axios
        .post('/api/comment/add-reply', replyComment)
        .then(({ data }) => data?.comment || {});

      insertNewReplyComment(newReplyComment);
    } catch (err) {
      console.error(err);
    }
  };

  const updateEditedComment = (newComment: CommentResponse) => {
    if (!Array.isArray(comments)) return;

    let updatedComments = [...comments];

    if (newComment?.chiefComment) {
      const index = updatedComments.findIndex(({ id }) => id === newComment.id);
      if (updatedComments[index]) {
        updatedComments[index].content = newComment.content;
      }
    } else {
      const chiefCommentIndex = updatedComments.findIndex(
        ({ id }) => id === newComment?.repliedTo
      );

      if (updatedComments[chiefCommentIndex]?.replies) {
        let newReplies = updatedComments[chiefCommentIndex].replies;
        newReplies = newReplies?.map((comment) => {
          if (comment?.id === newComment?.id) {
            comment.content = newComment.content;
          }
          return comment;
        });

        updatedComments[chiefCommentIndex].replies = newReplies;
      }
    }

    setComments([...updatedComments]);
  };

  const handleUpdateSubmit = async (content: string, id: string) => {
    try {
      const newUpdateComment = await axios
        .patch(`/api/comment?commentId=${id}`, { content })
        .then(({ data }) => data?.comment || {});

      updateEditedComment(newUpdateComment);
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
      {comments?.map((comment) => {
        const { replies } = comment;

        return (
          <div key={comment?.id}>
            <CommentCard
              comment={comment}
              showControls={userProfile?.id === comment?.owner?.id}
              onReplySubmit={(content) => {
                handleReplySubmit({ content, repliedTo: comment?.id });
              }}
              onUpdateSubmit={(content) => {
                handleUpdateSubmit(content, comment?.id);
              }}
            />
            {replies?.length ? (
              <div className="w-[93%] ml-auto space-y-3">
                <h1 className="text-secondary-dark mb-3">Replies</h1>
                {replies?.map((reply) => {
                  return (
                    <CommentCard
                      key={reply?.id}
                      comment={reply}
                      showControls={userProfile?.id === reply?.owner?.id}
                      onReplySubmit={(content) => {
                        handleReplySubmit({ content, repliedTo: comment?.id });
                      }}
                      onUpdateSubmit={(content) => {
                        handleUpdateSubmit(content, reply?.id);
                      }}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
