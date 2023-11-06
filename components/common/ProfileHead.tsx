import { FC } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import ProfileIcon from './ProfileIcon';

interface IProps {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const ProfileHead: FC<IProps> = ({ lightOnly, avatar, nameInitial }) => {
  return (
    <div className="flex items-center">
      <ProfileIcon
        lightOnly={lightOnly}
        avatar={avatar}
        nameInitial={nameInitial}
      />
      <AiFillCaretDown
        className={
          lightOnly ? 'text-primary' : 'text-primary-dark dark:text-primary'
        }
      />
    </div>
  );
};

export default ProfileHead;
