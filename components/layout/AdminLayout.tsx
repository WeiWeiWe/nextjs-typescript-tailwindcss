import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
  AiOutlineFileAdd,
} from 'react-icons/ai';
import AdminNav from '../common/AdminNav';

interface IProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
  { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
  { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
  { href: '/admin/contact', icon: AiOutlineContacts, label: 'Contact' },
];

const AdminLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="flex">
      <AdminNav {...{ navItems }} />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
