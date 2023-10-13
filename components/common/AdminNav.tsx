import { FC, useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri';
import Logo from '../common/Logo';

interface IProps {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = 'w-60';
const NAV_CLOSE_WIDTH = 'w-12';
const NAV_VISIBILITY_LOCALSTORAGE_KEY = 'nav-visibility';

const AdminNav: FC<IProps> = ({ navItems }) => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  const toggleNav = (visibility: boolean) => {
    const { current } = navRef;

    if (!current) {
      return;
    }

    if (visibility) {
      // close nav
      current.classList.remove(NAV_OPEN_WIDTH);
      current.classList.add(NAV_CLOSE_WIDTH);
    } else {
      // open nav
      current.classList.remove(NAV_CLOSE_WIDTH);
      current.classList.add(NAV_OPEN_WIDTH);
    }
  };

  const handleOpenOrCloseNav = () => {
    toggleNav(visible);
    const newVisibleState = !visible;
    setVisible(newVisibleState);
    localStorage.setItem(
      NAV_VISIBILITY_LOCALSTORAGE_KEY,
      JSON.stringify(newVisibleState)
    );
  };

  useEffect(() => {
    const visibleState = localStorage.getItem(NAV_VISIBILITY_LOCALSTORAGE_KEY);

    if (visibleState !== null) {
      try {
        const newVisibleState = JSON.parse(visibleState);
        toggleNav(!newVisibleState);
        setVisible(newVisibleState);
      } catch (err) {
        console.error(err);
        setVisible(true);
      }
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0"
    >
      <div>
        <Link href="/admin">
          <a className="flex items-center space-x-2 p-3 mb-10">
            <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
            {visible && (
              <span className="text-highlight-light dark:text-highlight-dark text-xl font-semibold leading-none">
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
                      <span className="ml-2 leading-none">
                        {item?.label || ''}
                      </span>
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
