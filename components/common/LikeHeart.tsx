import { FC } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface IProps {
  liked?: boolean;
  label?: string;
  onClick?: () => void;
}

const LikeHeart: FC<IProps> = ({ liked = false, label, onClick }) => {
  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary flex items-center space-x-2 outline-none"
      onClick={onClick}
    >
      {liked ? <BsHeartFill color="#4790FD" /> : <BsHeart />}
      <span className="hover:underline">{label}</span>
    </button>
  );
};

export default LikeHeart;
