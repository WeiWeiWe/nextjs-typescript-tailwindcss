import { FC } from 'react';
import ModelContainer, {
  ModelContainerIProps,
} from '../../common/ModelContainer';
import Gallery from './Gallery';

interface IProps extends ModelContainerIProps {}

const GalleryModel: FC<IProps> = ({ visible, onClose }) => {
  return (
    <ModelContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded">
        <div className="flex">
          {/* gallery */}
          <div className="basis-[75%] max-h-[450px] overflow-y-auto custom-scroll-bar">
            <Gallery />
          </div>

          {/* image selection and upload */}
          <div className="basis-1/4"></div>
        </div>
      </div>
    </ModelContainer>
  );
};

export default GalleryModel;
