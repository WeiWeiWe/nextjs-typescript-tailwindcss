import { FC } from 'react';
import classnames from 'classnames';
import { ImSpinner3 } from 'react-icons/im';
import ModelContainer, { ModelContainerIProps } from './ModelContainer';

interface IProps extends ModelContainerIProps {
  title: string;
  subTitle: string;
  busy?: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const commonBtnClasses = 'px-3 py-1 text-white rounded';

const ConfirmModal: FC<IProps> = ({
  visible,
  title,
  subTitle,
  busy = false,
  onClose,
  onCancel,
  onConfirm,
}) => {
  return (
    <ModelContainer visible={visible} onClose={onClose}>
      <div className="bg-primary-dark dark:bg-primary rounded p-3">
        {/* title */}
        <p className="text-primary dark:text-primary-dark font-semibold text-lg">
          {title || ''}
        </p>
        {/* sub title */}
        <p className="text-primary dark:text-primary-dark">{subTitle || ''}</p>
        {/* buttons */}
        {busy && (
          <p className="flex items-center space-x-2 text-primary dark:text-primary-dark pt-2">
            <ImSpinner3 className="animate-spin" />
            <span>Please wait</span>
          </p>
        )}
        {!busy && (
          <div className="flex items-center space-x-2 pt-2">
            <button
              className={classnames(commonBtnClasses, 'bg-red-500')}
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className={classnames(commonBtnClasses, 'bg-blue-500')}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </ModelContainer>
  );
};

export default ConfirmModal;
