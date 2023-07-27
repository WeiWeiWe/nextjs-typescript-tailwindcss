import { NextPage } from 'next';
import AdminNav from '../../components/common/AdminNav';
import {
  AiOutlineDashboard,
  AiOutlineContainer,
  AiOutlineTeam,
  AiOutlineMail,
  AiOutlineContacts,
} from 'react-icons/ai';

interface IProps {}

const navItems = [
  { href: '/admin', icon: AiOutlineDashboard, label: 'Dashboard' },
  { href: '/admin/posts', icon: AiOutlineContainer, label: 'Posts' },
  { href: '/admin/users', icon: AiOutlineTeam, label: 'Users' },
  { href: '/admin/comments', icon: AiOutlineMail, label: 'Comments' },
  { href: '/admin/contact', icon: AiOutlineContacts, label: 'Contact' },
];

const Admin: NextPage<IProps> = () => {
  return (
    <div>
      <AdminNav
        {...{
          navItems,
        }}
      />
    </div>
  );
};

export default Admin;
