import { NextPage } from 'next';
import AdminLayout from '@/components/layout/AdminLayout';
import ContentWrapper from '@/components/admin/ContentWrapper';
import LatestPostListCard from '@/components/admin/LatestPostListCard';
import LatestCommentListCard from '@/components/admin/LatestCommentListCard';

interface IProps {}

const Admin: NextPage<IProps> = () => {
  return (
    <div>
      <AdminLayout>
        <div className="flex space-x-10">
          <ContentWrapper title="Latest Posts" seeAllRoute="/admin">
            <LatestPostListCard
              title="This is my title"
              slug="this-is-slug"
              meta=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui deleniti magnam dolor, sint modi itaque nostrum dolores similique. Saepe temporibus veritatis ex earum illum beatae perferendis repellendus maiores sapiente exercitationem nihil et voluptas nostrum, accusantium fugiat reprehenderit odio ratione aut, sit, cum sint fuga magnam possimus maxime. Nisi tenetur quisquam, accusamus molestias porro praesentium voluptatem aut eos ipsum corporis fuga ducimus consequuntur dicta maxime optio facilis quas harum quia provident. Expedita voluptate, illo in magni soluta sed perspiciatis mollitia eos, dolore sint amet eius cupiditate deserunt? Dolorum delectus expedita nihil impedit inventore totam voluptates, officia beatae, dolorem porro dolor praesentium!"
            />
          </ContentWrapper>
          <ContentWrapper title="Latest Comments" seeAllRoute="/admin">
            <LatestCommentListCard
              comment={{
                id: 'commentId1',
                owner: {
                  id: 'ownerId1',
                  name: 'ownerTitle',
                  avatar: '',
                },
                belongsTo: {
                  id: 'belongsToId1',
                  title: 'belongsToTitle',
                  slug: '',
                },
                content: '<p>Comment Content</p>',
              }}
            />
          </ContentWrapper>
        </div>
      </AdminLayout>
    </div>
  );
};

export default Admin;
