import type { ImgHTMLAttributes } from 'react';

import { useColorThief } from 'hooks';

interface SliderItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
  src: string;
  bookId: string;
  onCardClick?: (bookId: string, bookColor: string) => void;
}

const SliderItem = ({ src, alt, bookId, onCardClick }: SliderItemProps) => {
  const { bookColor, handleOnLoadImage } = useColorThief();

  return (
    <div
      className='wheel__card absolute [perspective:1000px] top-0 left-0 w-[13%] max-w-[300px] aspect-[200/295]'
      data-color={bookColor}
      onClick={() => onCardClick && onCardClick(bookId, bookColor || 'transparent')}
    >
      <div className='faces relative w-full h-full rounded-xl [transform-style:preserve-3d]'>
        <div className='absolute w-full h-full shadow-xl hover:shadow-2xl [backface-visibility:hidden] transition-transform duration-500 ease-in-out transform hover:translate-y-2'>
          <img
            alt={alt}
            className='w-full h-full object-cover'
            crossOrigin='anonymous'
            onLoad={handleOnLoadImage}
            src={src}
          />
        </div>
        <div
          className='absolute w-full h-full shadow-xl [transform:rotateY(180deg)] [backface-visibility:hidden]'
          style={{ backgroundColor: bookColor }}
        ></div>
      </div>
    </div>
  );
};

export default SliderItem;
