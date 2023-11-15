import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/layout/AdminLayout';
import LatestUserTable from '@/components/admin/LatestUserTable';
import PageNavigator from '@/components/common/PageNavigator';
import { LatestUserProfile } from '@/utils/types';

interface IProps {}

const LIMIT = 5;
let currentPageNo = 0;

const Users: NextPage<IProps> = () => {
  const [users, setUsers] = useState<LatestUserProfile[]>();
  const [reachedToEnd, setReachedToEnd] = useState(false);

  const fetchAllUsers = async (pageNo: number = currentPageNo) => {
    try {
      const { data } = await axios(`/api/user?pageNo=${pageNo}&limit=${LIMIT}`);

      if (!data?.users?.length) {
        currentPageNo--;
        return setReachedToEnd(true);
      }

      setUsers(data?.users || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;

    currentPageNo++;
    fetchAllUsers(currentPageNo);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo--;
    fetchAllUsers(currentPageNo);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl dark:text-primary text-primary-dark font-semibold py-2 transition">
        Users
      </h1>
      <LatestUserTable users={users} />
      <div className="py-10 flex justify-end">
        <PageNavigator
          onNextClick={handleOnNextClick}
          onPreClick={handleOnPrevClick}
        />
      </div>
    </AdminLayout>
  );
};

export default Users;
