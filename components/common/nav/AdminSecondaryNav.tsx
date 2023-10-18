import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { FC } from 'react';
import useDarkMode from '@/hooks/useDarkMode';
import DropdownOptions, { dropDownOptions } from '../DropdownOptions';
import ProfileHead from '../ProfileHead';
import SearchBar from '../SearchBar';

interface IProps {}

const AdminSecondaryNav: FC<IProps> = () => {
  const router = useRouter();
  const { toggleTheme } = useDarkMode();

  const navigateToCreateNewPost = () => {
    router.push('/admin/posts/create');
  };

  const handleLogOut = async () => {
    await signOut();
  };

  const options: dropDownOptions = [
    {
      label: 'Add new post',
      onMouseDown: navigateToCreateNewPost,
    },
    {
      label: 'Change theme',
      onMouseDown: toggleTheme,
    },
    {
      label: 'Log out',
      onMouseDown: handleLogOut,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {/* search bar */}
      <SearchBar />
      {/* options / profile head */}
      <DropdownOptions
        head={<ProfileHead nameInitial="J" />}
        options={options}
      />
    </div>
  );
};

export default AdminSecondaryNav;
