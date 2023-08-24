import { FC } from 'react';
import { Editor } from '@tiptap/react';
import { AiFillCaretDown } from 'react-icons/ai';
import { RiDoubleQuotesL } from 'react-icons/ri';
import {
  BsTypeStrikethrough,
  BsBraces,
  BsCode,
  BsListOl,
  BsListUl,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsImageFill,
  BsLink45Deg,
  BsYoutube,
} from 'react-icons/bs';
import DropdownOptions from '../../common/DropdownOptions';
import Button from './Button';
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
    <div className="flex items-center">
      <DropdownOptions options={options} head={<Head />} />

      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8"></div>
      <div className="flex items-center space-x-3">
        <Button>
          <BsTypeBold />
        </Button>
        <Button>
          <BsTypeItalic />
        </Button>
        <Button>
          <BsTypeUnderline />
        </Button>
        <Button>
          <BsTypeStrikethrough />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8"></div>
      <div className="flex items-center space-x-3">
        <Button>
          <RiDoubleQuotesL />
        </Button>
        <Button>
          <BsCode />
        </Button>
        <Button>
          <BsBraces />
        </Button>
        <Button>
          <BsLink45Deg />
        </Button>
        <Button>
          <BsListOl />
        </Button>
        <Button>
          <BsListUl />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-secondary-dark dark:bg-secondary-light mx-8"></div>
      <div className="flex items-center space-x-3">
        <Button>
          <BsYoutube />
        </Button>
        <Button>
          <BsImageFill />
        </Button>
      </div>
    </div>
  );
};

export default ToolBar;
