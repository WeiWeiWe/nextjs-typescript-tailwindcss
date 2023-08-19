import { NextPage } from 'next';
import Editor from '../../../components/editor';

interface IProps {}

const Create: NextPage<IProps> = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Editor />
    </div>
  );
};

export default Create;
