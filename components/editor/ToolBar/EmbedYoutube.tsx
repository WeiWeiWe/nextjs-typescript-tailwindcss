import { FC, useState } from 'react';
import { BsYoutube } from 'react-icons/bs';
import Button from '../ToolBar/Button';

interface IProps {
  onSubmit: (url: string) => void;
}

const EmbedYoutube: FC<IProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSubmit = () => {
    if (!url.trim()) return hideForm();

    onSubmit(url);
    setUrl('');
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
        <BsYoutube />
      </Button>
      {visible && (
        <div className="absolute top-full mt-4 z-50 right-0">
          <div className="flex space-x-2">
            <input
              type="text"
              autoFocus
              className="bg-transparent rounded border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary transition p-2 text-primary-dark dark:text-primary"
              placeholder="https://youtube.com"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-action p-2 text-primary rounded text-sm"
            >
              Embed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedYoutube;
