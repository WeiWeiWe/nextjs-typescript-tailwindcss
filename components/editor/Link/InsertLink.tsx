import { FC, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import Button from '../ToolBar/Button';
import LinkForm, { linkOption } from './LinkForm';

interface IProps {
  onSubmit: (link: linkOption) => void;
}

const InsertLink: FC<IProps> = ({ onSubmit }) => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (link: linkOption) => {
    if (!link.url.trim()) return hideForm();

    onSubmit(link);
    hideForm();
  };

  const hideForm = () => setVisible(false);
  const showForm = () => setVisible(true);

  return (
    <div
      className="relative"
      onKeyDown={({ key }) => {
        if (key === 'Escape') hideForm();
      }}
    >
      <Button onClick={visible ? hideForm : showForm}>
        <BsLink45Deg />
      </Button>
      <div className="absolute top-full mt-4 z-50 right-0">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;
