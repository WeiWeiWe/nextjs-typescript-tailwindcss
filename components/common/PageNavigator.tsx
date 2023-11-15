import { FC, MouseEventHandler } from 'react';

interface IProps {
  onPreClick?: () => void;
  onNextClick?: () => void;
}

const PageNavigator: FC<IProps> = ({ onPreClick, onNextClick }) => {
  return (
    <div className="flex items-center space-x-3">
      <Button onClick={onPreClick} title="Prev" />
      <Button onClick={onNextClick} title="Next" />
    </div>
  );
};

const Button: FC<{ title: string; onClick?: MouseEventHandler }> = ({
  title,
  onClick,
}) => {
  return (
    <button
      className="text-primary-dark dark:text-primary hover:underline transition"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PageNavigator;
