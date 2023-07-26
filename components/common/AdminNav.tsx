import { FC } from 'react';
import Link from 'next/link';
import Logo from '../common/Logo';

interface IProps {}

const AdminNav: FC<IProps> = () => {
  return (
    <nav className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark">
      <Link href="/admin">
        <a className="flex items-center space-x-2 p-3">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          <span className="fill-highlight-light dark:fill-highlight-dark text-xl font-semibold">
            Admin
          </span>
        </a>
      </Link>
    </nav>
  );
};

export default AdminNav;
