import { NextPage } from 'next';
import axios from 'axios';
import Editor, { FinalPost } from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';
import { generateFormData } from '@/utils/helper';

interface IProps {}

const Create: NextPage<IProps> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      const formData = generateFormData(post);
      const { data } = await axios.post('/api/posts', formData);
      console.log(data);
    } catch (error: any) {
      console.error(error?.response?.data);
    }
  };

  return (
    <AdminLayout title="New Post">
      <div className="max-w-4xl mx-auto">
        <Editor onSubmit={handleSubmit} />
      </div>
    </AdminLayout>
  );
};

export default Create;
