import { NextPage } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import Comments from '@/components/common/Comments';

interface IProps {}

const AdminComments: NextPage<IProps> = () => {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <Comments fetchAll />
      </div>
    </AdminLayout>
  );
};

export default AdminComments;
