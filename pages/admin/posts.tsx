import { NextPage } from 'next';
import AdminLayout from '../../components/layout/AdminLayout';

interface IProps {}

const Posts: NextPage<IProps> = () => {
  return <AdminLayout>posts</AdminLayout>;
};

export default Posts;
