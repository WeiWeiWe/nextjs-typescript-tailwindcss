import { FC } from 'react';
import NextImage from 'next/image';
import CheckMark from '../../common/CheckMark';

interface IProps {
  src: string;
  alt?: string;
  selected?: boolean;
  onClick?: () => void;
}

const Image: FC<IProps> = ({ src, alt, selected, onClick }) => {
  return (
    <div
      className="relative rounded overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <NextImage
        src={src}
        width={200}
        height={200}
        alt={alt}
        objectFit="cover"
        className="bg-secondary-ligth hover:scale-110 transition"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default Image;
