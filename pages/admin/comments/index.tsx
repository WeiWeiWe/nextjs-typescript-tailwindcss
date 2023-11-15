import { NextPage } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import Comments from '@/components/common/Comments';

interface IProps {}

const AdminComments: NextPage<IProps> = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl dark:text-primary text-primary-dark font-semibold py-2 transition">
        Comments
      </h1>
      <div className="max-w-4xl mx-auto">
        <Comments fetchAll />
      </div>
    </AdminLayout>
  );
};

export default AdminComments;
