import { NextPage } from 'next';
import axios from 'axios';
import Editor, { FinalPost } from '@/components/editor';
import AdminLayout from '@/components/layout/AdminLayout';

interface IProps {}

const Create: NextPage<IProps> = () => {
  const handleSubmit = async (post: FinalPost) => {
    try {
      const formData = new FormData();
      for (const key in post) {
        const value = post[key as keyof typeof post];
        if (key === 'tags' && (value as string).trim()) {
          const tags = (value as string).split(',').map((tag) => tag.trim());
          formData.append(key, JSON.stringify(tags));
        } else {
          formData.append(key, value!);
        }
      }

      const { data } = await axios.post('/api/posts', formData);
      console.log(data);
    } catch (err) {
      console.error(err?.response?.data);
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
