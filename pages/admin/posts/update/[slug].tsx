import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import axios from 'axios';
import AdminLayout from '@/components/layout/AdminLayout';
import Editor, { FinalPost } from '@/components/editor';
import dbConnect from '@/lib/dbConnect';
import { generateFormData } from '@/utils/helper';
import Post from '@/models/Post';

interface PostResponse extends FinalPost {
  id: string;
}

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Update: NextPage<IProps> = ({ post }) => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      const formData = generateFormData(post);
      const { data } = await axios.patch(`/api/posts/${post?.id}`, formData);
      console.log(data);
    } catch (error: any) {
      console.error(error?.response?.data);
    }
  };

  return (
    <AdminLayout title="Update">
      <div className="max-w-4xl mx-auto">
        <Editor initialValue={post} onSubmit={handleSubmit} btnTitle="Update" />
      </div>
    </AdminLayout>
  );
};

interface ServerSideResponse {
  post: PostResponse;
}

export const getServerSideProps: GetServerSideProps<ServerSideResponse> =
  async (context) => {
    try {
      const slug = context?.query?.slug as string;

      await dbConnect();
      const post = await Post.findOne({ slug });
      if (!post) return { notFound: true };

      const { _id, meta, title, content, thumbnail, tags } = post;

      return {
        props: {
          post: {
            id: _id.toString(),
            meta,
            title,
            content,
            thumbnail: thumbnail?.url || '',
            tags: tags.join(', '),
            slug,
          },
        },
      };
    } catch (error) {
      return { notFound: true };
    }
  };

export default Update;
