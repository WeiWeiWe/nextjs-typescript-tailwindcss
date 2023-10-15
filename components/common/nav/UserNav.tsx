import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import React, { FC } from 'react';
import { HiLightBulb } from 'react-icons/hi';
import { APP_NAME } from '../AppHead';
import Logo from '../Logo';
import { GitHubAuthButton } from '../../button';
import ProfileHead from '../ProfileHead';
import DropdownOptions, { dropDownOptions } from '../DropdownOptions';
import { UserProfile } from '@/utils/types';

interface IProps {}

const defaultOptions: dropDownOptions = [
  {
    label: 'Logout',
    onMouseDown: async () => {
      await signOut();
    },
  },
];

const UserNav: FC<IProps> = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  const profile = data?.user as UserProfile | undefined;
  const isAdmin = profile?.role === 'admin';

  const handleLoginWithGithub = async () => {
    await signIn('github');
  };

  const dropDownOptions: dropDownOptions = isAdmin
    ? [
        {
          label: 'Dashboard',
          onMouseDown: () => {
            router.push('/admin');
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;

  return (
    <div className="flex items-center justify-between bg-primary-dark p-3">
      {/* Logo */}
      <Link href="/">
        <a className="flex space-x-2 text-highlight-dark">
          <Logo className="fill-highlight-dark" />
          <span className="text-xl font-semibold">{APP_NAME}</span>
        </a>
      </Link>
      <div className="flex items-center space-x-5">
        <button className="dark:text-secondary-dark text-secondary-light">
          <HiLightBulb size={34} />
        </button>
        {/* <GitHubAuthButton lightOnly /> */}

        {isAuth ? (
          <DropdownOptions
            options={dropDownOptions}
            head={<ProfileHead nameInitial="N" lightOnly />}
          />
        ) : (
          <GitHubAuthButton lightOnly onClick={handleLoginWithGithub} />
        )}
      </div>
    </div>
  );
};

export default UserNav;
