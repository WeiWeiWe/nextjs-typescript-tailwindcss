import { FC } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { BiLoader } from 'react-icons/bi';

interface IProps {
  busy?: boolean;
  liked?: boolean;
  label?: string;
  onClick?: () => void;
}

const LikeHeart: FC<IProps> = ({ busy, liked = false, label, onClick }) => {
  const likeIcon = liked ? <BsHeartFill color="#4790FD" /> : <BsHeart />;

  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary flex items-center space-x-2 outline-none"
      onClick={onClick}
    >
      {busy ? <BiLoader className="animate-spin" size={20} /> : likeIcon}
      <span className="hover:underline">{label}</span>
    </button>
  );
};

export default LikeHeart;
