import { FC } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface IProps {}

const Editor: FC<IProps> = () => {
  const editor = useEditor({
    extensions: [StarterKit],
  });

  return <EditorContent editor={editor} />;
};

export default Editor;
