import { signIn } from 'next-auth/react';
import { FC, useCallback } from 'react';
import classNames from 'classnames';
import { AiFillGithub } from 'react-icons/ai';

interface IProps {
  lightOnly?: boolean;
}

const commonClasses =
  'flex items-center justify-center space-x-1 px-3 py-2 rounded hover:scale-[0.97] transition duration-100';

export const GitHubAuthButton: FC<IProps> = ({ lightOnly }) => {
  const getStyle = useCallback(() => {
    if (lightOnly) return 'text-primary-dark bg-primary';
    return 'bg-primary-dark dark:bg-primary dark:text-primary-dark text-primary';
  }, [lightOnly]);

  const handleClick = async () => {
    await signIn('github');
  };

  return (
    <button
      className={classNames(commonClasses, getStyle())}
      onClick={handleClick}
    >
      <span>Continue with</span>
      <AiFillGithub size={24} />
    </button>
  );
};
