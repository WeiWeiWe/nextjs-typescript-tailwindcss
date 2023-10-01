import { FC, ReactNode, useEffect, useCallback, useId } from 'react';

export interface ModelContainerIProps {
  visible?: boolean;
  onClose?: () => void;
}

interface IProps extends ModelContainerIProps {
  children: ReactNode;
}

const ModelContainer: FC<IProps> = ({ visible, children, onClose }) => {
  const containerId = useId();

  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleClick = ({ target }: any) => {
    if (target.id === containerId) handleClose();
  };

  useEffect(() => {
    const closeModel = ({ key }: any) => key === 'Escape' && handleClose();
    document.addEventListener('keydown', closeModel);

    return () => {
      document.removeEventListener('keydown', closeModel);
    };
  }, [handleClose]);

  if (!visible) return null;

  return (
    <div
      id={containerId}
      onClick={handleClick}
      className="fixed inset-0 bg-primary dark:bg-primary-dark dark:bg-opacity-5 bg-opacity-5 backdrop-blur-[2px] z-50 flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default ModelContainer;
