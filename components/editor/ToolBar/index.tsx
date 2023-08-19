import { FC } from 'react';
import { Editor } from '@tiptap/react';
import { AiFillCaretDown } from 'react-icons/ai';
import DropdownOptions from '../../common/DropdownOptions';
import { getFocusedEditor } from '../editorUtils';

interface IProps {
  editor: Editor | null;
}

const ToolBar: FC<IProps> = ({ editor }) => {
  if (!editor) return null;

  const options = [
    {
      label: 'Paragraph',
      onMouseDown: () => getFocusedEditor(editor)?.setParagraph()?.run(),
    },
    {
      label: 'Heading 1',
      onMouseDown: () =>
        getFocusedEditor(editor)?.toggleHeading({ level: 1 })?.run(),
    },
    {
      label: 'Heading 2',
      onMouseDown: () =>
        getFocusedEditor(editor)?.toggleHeading({ level: 2 })?.run(),
    },
    {
      label: 'Heading 3',
      onMouseDown: () =>
        getFocusedEditor(editor)?.toggleHeading({ level: 3 })?.run(),
    },
  ];

  const getLabel = (): string => {
    if (editor?.isActive('heading', { level: 1 })) return 'Heading 1';
    if (editor?.isActive('heading', { level: 2 })) return 'Heading 2';
    if (editor?.isActive('heading', { level: 3 })) return 'Heading 3';

    return 'Paragraph';
  };

  const Head = () => {
    return (
      <div className="flex items-center space-x-2 text-primary-dark dark:text-primary">
        <p>{getLabel()}</p>
        <AiFillCaretDown />
      </div>
    );
  };

  return (
    <div>
      <DropdownOptions options={options} head={<Head />} />
    </div>
  );
};

export default ToolBar;
