import { FC, ReactNode, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import {
  BsFillReplyAllFill,
  BsFillTrashFill,
  BsPencilSquare,
} from 'react-icons/bs';
import ProfileIcon from './ProfileIcon';
import CommentForm from './CommentForm';

interface CommentOwnersProfile {
  name: string;
  avatar?: string;
}

interface IProps {
  profile: CommentOwnersProfile;
  date: string;
  content: string;
}

const CommentCard: FC<IProps> = ({ profile, date, content }) => {
  const { name, avatar } = profile;
  const [showForm, setShowForm] = useState(false);
  const [initialState, setInitialState] = useState('');

  const displayReplyForm = () => {
    setInitialState('');
    setShowForm(true);
  };

  const hideReplyForm = () => {
    setShowForm(false);
  };

  const handleOnReplyClick = () => {
    displayReplyForm();
  };

  const handleOnEditClick = () => {
    displayReplyForm();
    setInitialState(content);
  };

  const handleCommentSubmit = () => {};

  return (
    <div className="flex space-x-3">
      <ProfileIcon nameInitial={name?.[0]?.toUpperCase()} avatar={avatar} />
      <div className="flex-1">
        <h1 className="text-lg text-primary-dark dark:text-primary font-semibold">
          {name}
        </h1>
        <span className="text-sm text-secondary-dark">
          {moment(date).format('YYYY-MM-DD')}
        </span>
        <div className="text-primary-dark dark:text-primary">
          {parse(content)}
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleOnReplyClick}>
            <BsFillReplyAllFill />
            <span>Reply</span>
          </Button>
          <Button onClick={handleOnEditClick}>
            <BsPencilSquare />
            <span>Edit</span>
          </Button>
          <Button>
            <BsFillTrashFill />
            <span>Delete</span>
          </Button>
        </div>
        {showForm && (
          <div className="mt-3">
            <CommentForm
              initialState={initialState}
              onSubmit={handleCommentSubmit}
              onClose={hideReplyForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="flex items-center text-primary-dark dark:text-primary space-x-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CommentCard;
