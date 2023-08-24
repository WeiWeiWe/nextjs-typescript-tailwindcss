import { FC } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ToolBar from './ToolBar';

interface IProps {}

const Editor: FC<IProps> = () => {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  return (
    <div className="p-3 dark:bg-primary-dark bg-primary transition">
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
