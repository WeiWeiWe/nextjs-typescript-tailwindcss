import { NextPage } from 'next';
import AdminNav from '../../components/common/AdminNav';

interface IProps {}

const Admin: NextPage<IProps> = () => {
  return (
    <div>
      <AdminNav />
    </div>
  );
};

export default Admin;
