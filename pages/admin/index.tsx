import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/layout/AdminLayout';
import ContentWrapper from '@/components/admin/ContentWrapper';
import LatestPostListCard from '@/components/admin/LatestPostListCard';
import LatestCommentListCard from '@/components/admin/LatestCommentListCard';
import LatestUserTable from '@/components/admin/LatestUserTable';
import { PostDetail, LatestComment, LatestUserProfile } from '@/utils/types';

interface IProps {}

const Admin: NextPage<IProps> = () => {
  const [latestPosts, setLatestPosts] = useState<PostDetail[]>();
  const [latestComments, setLatestComments] = useState<LatestComment[]>();
  const [latestUsers, setLatestUsers] = useState<LatestUserProfile[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await axios('/api/posts?limit=5&skip=0').then(
          ({ data }) => {
            return data?.posts;
          }
        );
        const comments = await axios('/api/comment/latest').then(({ data }) => {
          return data?.comments;
        });
        const users = await axios('/api/user').then(({ data }) => {
          return data?.users;
        });

        setLatestPosts(posts);
        setLatestComments(comments);
        setLatestUsers(users);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="flex space-x-10">
        <ContentWrapper title="Latest Posts" seeAllRoute="/admin/posts">
          {latestPosts?.map(({ id, title, meta, slug }) => {
            return (
              <LatestPostListCard
                key={id}
                title={title}
                meta={meta}
                slug={slug}
              />
            );
          })}
        </ContentWrapper>
        <ContentWrapper title="Latest Comments" seeAllRoute="/admin/comments">
          {latestComments?.map((comment) => {
            return (
              <LatestCommentListCard key={comment?.id} comment={comment} />
            );
          })}
        </ContentWrapper>
      </div>
      <div className="max-w-[500px]">
        <ContentWrapper title="Latest Users" seeAllRoute="/admin/users">
          <LatestUserTable users={latestUsers} />
        </ContentWrapper>
      </div>
    </AdminLayout>
  );
};

export default Admin;
