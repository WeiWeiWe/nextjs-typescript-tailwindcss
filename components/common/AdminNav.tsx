import { FC } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { RiMenuFoldFill } from 'react-icons/ri';
import Logo from '../common/Logo';

interface IProps {
  navItems: { label: string; icon: IconType; href: string }[];
}

const AdminNav: FC<IProps> = ({ navItems }) => {
  return (
    <nav className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between">
      <div>
        <Link href="/admin">
          <a className="flex items-center space-x-2 p-3 mb-10">
            <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
            <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold">
              Admin
            </span>
          </a>
        </Link>
        <div className="space-y-6">
          {Array.isArray(navItems) &&
            navItems?.length > 0 &&
            navItems.map((item) => {
              return (
                <Link key={item?.href} href={item?.href || '/admin'}>
                  <a className="flex items-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition">
                    {item?.icon && <item.icon size={24} />}
                    <span className="ml-2">{item?.label || ''}</span>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
      <button className="text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end">
        <RiMenuFoldFill size={25} />
      </button>
    </nav>
  );
};

export default AdminNav;
