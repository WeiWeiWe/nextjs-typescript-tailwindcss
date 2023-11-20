import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { GitHubAuthButton } from '../button';
import useAuth from '@/hooks/useAuth';
import { CommentResponse } from '@/utils/types';
import ConfirmModal from './ConfirmModal';
import PageNavigator from './PageNavigator';

interface IProps {
  belongsTo?: string;
  fetchAll?: boolean;
}

const LIMIT = 5;
let currentPageNo = 0;

const Comments: FC<IProps> = ({ belongsTo, fetchAll }) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [busyCommentLike, setBusyCommentLike] = useState(false);
  const [selectedComment, setSelectedComment] =
    useState<CommentResponse | null>(null);
  const [commentToDelete, setCommentToDelete] =
    useState<CommentResponse | null>(null);

  const userProfile = useAuth();

  const handleNewCommentSubmit = async (content: string) => {
    try {
      setSubmitting(true);
      const newComment = await axios
        .post('/api/comment', { content, belongsTo })
        .then(({ data }) => data?.comment);

      if (newComment && Array.isArray(comments)) {
        setComments([...comments, newComment]);
      }
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
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

  const updateDeletedComment = (deletedComment: CommentResponse) => {
    if (!Array.isArray(comments)) return;

    let newComments = [...comments];

    if (deletedComment?.chiefComment) {
      newComments = newComments.filter(({ id }) => id !== deletedComment.id);
    } else {
      const chiefCommentIndex = newComments.findIndex(
        ({ id }) => id === deletedComment?.repliedTo
      );

      if (newComments[chiefCommentIndex]?.replies) {
        const newReplies = newComments[chiefCommentIndex].replies?.filter(
          ({ id }) => id !== deletedComment?.id
        );
        newComments[chiefCommentIndex].replies = newReplies;
      }
    }

    setComments([...newComments]);
  };

  const updateLikedComment = (likedComment: CommentResponse) => {
    if (!Array.isArray(comments)) return;

    let newComments = [...comments];

    if (likedComment?.chiefComment) {
      newComments = newComments.map((comment) => {
        if (comment?.id === likedComment?.id) return likedComment;
        return comment;
      });
    } else {
      const chiefCommentIndex = newComments.findIndex(
        ({ id }) => id === likedComment?.repliedTo
      );

      if (newComments[chiefCommentIndex]?.replies) {
        const newReplies = newComments[chiefCommentIndex].replies?.map(
          (reply) => {
            if (reply?.id === likedComment?.id) return likedComment;
            return reply;
          }
        );
        newComments[chiefCommentIndex].replies = newReplies;
      }
    }

    setComments([...newComments]);
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

  const handleOnDeleteClick = (comment: CommentResponse) => {
    setCommentToDelete(comment);
    setShowConfirmModal(true);
  };

  const handleOnDeleteCancel = () => {
    setCommentToDelete(null);
    setShowConfirmModal(false);
  };

  const handleOnDeleteConfirm = async () => {
    if (!commentToDelete?.id) return;

    try {
      const isDeleteSuccess = await axios
        .delete(`/api/comment?commentId=${commentToDelete.id}`)
        .then(({ data }) => Boolean(data?.removed));

      if (isDeleteSuccess) {
        updateDeletedComment(commentToDelete);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCommentToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const handleOnLikeClick = async (comment: CommentResponse) => {
    try {
      setBusyCommentLike(true);
      setSelectedComment(comment);
      const likedComment = await axios
        .post('/api/comment/update-like', { commentId: comment?.id })
        .then(({ data }) => data?.comment || {});
      setBusyCommentLike(false);
      setSelectedComment(null);

      updateLikedComment(likedComment);
    } catch (err) {
      console.error(err);
      setBusyCommentLike(false);
      setSelectedComment(null);
    }
  };

  const fetchAllComments = async (pageNo: number = currentPageNo) => {
    try {
      const { data } = await axios(
        `/api/comment/all?pageNo=${pageNo}&limit=${LIMIT}`
      );

      if (!data?.comments?.length) {
        currentPageNo--;
        return setReachedToEnd(true);
      }

      setComments(data?.comments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;

    currentPageNo++;
    fetchAllComments(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo--;
    fetchAllComments(currentPageNo);
  };

  useEffect(() => {
    if (!belongsTo) return;
    axios(`/api/comment?belongsTo=${belongsTo}`)
      .then(({ data }) => {
        setComments(data?.comments || []);
      })
      .catch((err) => console.error(err));
  }, [belongsTo]);

  useEffect(() => {
    if (!belongsTo && fetchAll) {
      fetchAllComments();
    }
  }, [belongsTo, fetchAll]);

  return (
    <div className="py-20 space-y-4">
      {userProfile ? (
        <CommentForm
          visible={!fetchAll}
          busy={submitting}
          title="Add comment"
          onSubmit={handleNewCommentSubmit}
        />
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
              busy={selectedComment?.id === comment?.id && busyCommentLike}
              comment={comment}
              showControls={userProfile?.id === comment?.owner?.id}
              onReplySubmit={(content) => {
                handleReplySubmit({ content, repliedTo: comment?.id });
              }}
              onUpdateSubmit={(content) => {
                handleUpdateSubmit(content, comment?.id);
              }}
              onDeleteClick={() => handleOnDeleteClick(comment)}
              onLikeClick={() => handleOnLikeClick(comment)}
            />
            {replies?.length ? (
              <div className="w-[93%] ml-auto space-y-3">
                <h1 className="text-secondary-dark mb-3">Replies</h1>
                {replies?.map((reply) => {
                  return (
                    <CommentCard
                      key={reply?.id}
                      busy={
                        selectedComment?.id === reply?.id && busyCommentLike
                      }
                      comment={reply}
                      showControls={userProfile?.id === reply?.owner?.id}
                      onReplySubmit={(content) => {
                        handleReplySubmit({ content, repliedTo: comment?.id });
                      }}
                      onUpdateSubmit={(content) => {
                        handleUpdateSubmit(content, reply?.id);
                      }}
                      onDeleteClick={() => handleOnDeleteClick(reply)}
                      onLikeClick={() => handleOnLikeClick(reply)}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
      {fetchAll && (
        <div className="py-10 flex justify-end">
          <PageNavigator
            onNextClick={handleOnNextClick}
            onPreClick={handleOnPrevClick}
          />
        </div>
      )}
      <ConfirmModal
        visible={showConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this comment and replies if this is chief comment!"
        onCancel={handleOnDeleteCancel}
        onConfirm={handleOnDeleteConfirm}
      />
    </div>
  );
};

export default Comments;
