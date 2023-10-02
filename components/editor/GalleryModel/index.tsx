import { FC, ChangeEventHandler, useState, useCallback } from 'react';
import Image from 'next/image';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import ModelContainer, {
  ModelContainerIProps,
} from '../../common/ModelContainer';
import ActionButton from '../../common/ActionButton';
import Gallery from './Gallery';

export interface ImageSelectionResult {
  src: string;
  altText: string;
}

interface IProps extends ModelContainerIProps {
  images: { src: string }[];
  uploading?: boolean;
  onFileSelect: (image: File) => void;
  onSelect: (result: ImageSelectionResult) => void;
}

const GalleryModel: FC<IProps> = ({
  visible,
  images,
  uploading,
  onClose,
  onFileSelect,
  onSelect,
}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [altText, setAltText] = useState('');

  const handleClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { files } = target;
    if (!files) return;

    const file = files[0];
    if (!file.type.startsWith('image')) return handleClose();

    onFileSelect(file);
  };

  const handleSelection = () => {
    if (!selectedImage) return handleClose();
    onSelect({ src: selectedImage, altText });
    handleClose();
  };

  return (
    <ModelContainer visible={visible} onClose={onClose}>
      <div className="w-full max-w-4xl p-2 bg-primary-dark dark:bg-primary rounded">
        <div className="flex">
          {/* gallery */}
          <div className="basis-[75%] max-h-[450px] h-[200px] overflow-y-auto custom-scroll-bar">
            <Gallery
              images={images}
              selectedImage={selectedImage}
              uploading={uploading}
              onSelect={(src) => setSelectedImage(src)}
            />
          </div>

          {/* image selection and upload */}
          <div className="basis-1/4 px-2">
            <div className="space-y-4">
              <div>
                <input
                  type="file"
                  id="image-input"
                  onChange={handleOnImageChange}
                  hidden
                />
                <label htmlFor="image-input">
                  <div className="w-full border-2 border-action text-action flex items-center justify-center space-x-2 p-2 cursor-pointer rounded">
                    <AiOutlineCloudUpload />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
              {selectedImage ? (
                <>
                  <textarea
                    className="resize-none w-full bg-transparent rounded border-2 border-secondary-dark focus:ring-1 text-primary dark:text-primary-dark h-32 p-1"
                    placeholder="Alt text"
                    value={altText}
                    onChange={({ target }) => setAltText(target.value)}
                  ></textarea>
                  <ActionButton title="Select" onClick={handleSelection} />
                  <div className="relative aspect-video bg-png-pattern">
                    <Image
                      src={selectedImage}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </ModelContainer>
  );
};

export default GalleryModel;
