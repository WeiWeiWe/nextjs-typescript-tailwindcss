import Image from 'next/image';
import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { AiFillCaretDown } from 'react-icons/ai';

interface IProps {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const commonClasses =
  'relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none';

const ProfileHead: FC<IProps> = ({ lightOnly, avatar, nameInitial }) => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? 'text-primary-dark bg-primary'
      : 'bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary';
  }, [lightOnly]);

  return (
    <div className="flex items-center">
      <div className={classNames(commonClasses, getStyle())}>
        {avatar ? (
          <Image src={avatar} layout="fill" alt="profile" />
        ) : (
          nameInitial
        )}
      </div>
      <AiFillCaretDown
        className={
          lightOnly ? 'text-primary' : 'text-primary-dark dark:text-primary'
        }
      />
    </div>
  );
};

export default ProfileHead;
