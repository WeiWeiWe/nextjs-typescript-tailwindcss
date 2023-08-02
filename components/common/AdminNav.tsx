import { useState, useRef, FC } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import Logo from '../common/Logo';

interface IProps {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';

const AdminNav: FC<IProps> = ({ navItems }) => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  const handleOpenOrCloseNav = () => {
    const { current } = navRef;

    if (!current) {
      return;
    }

    if (visible) {
      current.classList.remove(NAV_OPEN_WIDTH);
      current.classList.add(NAV_CLOSE_WIDTH);
    } else {
      current.classList.remove(NAV_CLOSE_WIDTH);
      current.classList.add(NAV_OPEN_WIDTH);
    }

    setVisible(!visible);
  };

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between"
    >
      <div>
        <Link href="/admin">
          <a className="flex items-center space-x-2 p-3 mb-10">
            <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
            {visible && (
              <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold">
                Admin
              </span>
            )}
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
                    {visible && (
                      <span className="ml-2">{item?.label || ''}</span>
                    )}
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
      <button
        onClick={handleOpenOrCloseNav}
        className="text-highlight-light dark:text-highlight-dark p-3 hover:scale-[0.98] transition self-end"
      >
        {visible ? (
          <RiMenuFoldFill size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
