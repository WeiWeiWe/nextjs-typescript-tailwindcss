import { FC } from 'react';

interface IProps {}

const images: { src: string }[] = [];

const Gallery: FC<IProps> = () => {
  return (
    <div className="flex flex-wrap">
      {images.map(({ src }, index) => {
        return (
          <div key={index} className="basis-1/4">
            <img src={src} alt="gallery" />
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
