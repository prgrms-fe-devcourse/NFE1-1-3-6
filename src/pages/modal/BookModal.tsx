import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { BookData } from '../../api/book';
import { getBookDataById } from '../../api/book';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from '../../components';
import { gsap } from 'gsap';
import SlidingTitle from './SlidingTitle';

const BookModal = () => {
  const [book, setBook] = useState<BookData | null>(null);
  const [isBookmarkOpen, setBookmarkOpen] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const bookmarkRef = useRef<HTMLDivElement>(null);

  const bookId = '2173713'; // 임시 책 Id
  const backgroundColor = 'rgba(36, 56, 104, 0.5)'; // 임시 배경색 (투명도 50)

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const data = await getBookDataById(bookId);
        setBook(data);
        console.log(data);
      } catch (error) {
        console.error('Failed to fetch book details:', error);
      } finally {
        setInitialized(true);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // 리본 초기 위치
  useEffect(() => {
    if (bookmarkRef.current) {
      const initialY = isBookmarkOpen ? 0 : -200;
      gsap.set(bookmarkRef.current, { y: initialY });
    }
  }, [initialized]);

  // 리본 애니메이션
  useEffect(() => {
    if (!initialized || !bookmarkRef.current) return;

    gsap.to(bookmarkRef.current, {
      y: isBookmarkOpen ? 0 : -200,
      duration: 0.8,
      ease: 'bounce.out',
    });
  }, [isBookmarkOpen, initialized]);

  if (!book) return <p>Loading...</p>;

  const author = book.author.split(' (')[0];
  const formatCategory = (category: string) =>
    category
      .split('/')
      .map(item => `#${item.trim()}`)
      .join(' ');

  const renderRating = (rating: number) => {
    const maxRating = 5;
    const filledHearts = Math.round(rating / 2);

    return (
      <div className='flex space-x-0.5'>
        {Array.from({ length: maxRating }, (_, index) => (
          <img
            key={index}
            src={`/icon/${index < filledHearts ? 'heart.svg' : 'white-heart.svg'}`}
            alt='heart'
            className='w-6 h-6'
          />
        ))}
      </div>
    );
  };

  return (
    <div className='fixed inset-0 z-50 bg-white'>
      <div className='relative w-full h-full flex' style={{ backgroundColor }}>
        <div
          ref={bookmarkRef}
          className='absolute top-0'
          style={{
            right: '10%',
            zIndex: 99,
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            width: '4rem',
            height: '300px',
            backgroundColor: '#DD0000',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onClick={() => setBookmarkOpen(prev => !prev)}
        />

        <div className='w-[15%] flex items-center justify-center'>
          <SlidingTitle title={book.title} />
        </div>
        <div className='w-[80%] flex items-center justify-center'>
          <div className='relative max-w-5xl w-full h-full p-12 flex flex-col items-center justify-center overflow-y-auto'>
            <div className='flex flex-col md:flex-row items-end gap-12'>
              <img
                className='w-full max-w-md md:max-w-lg h-auto object-cover rounded-lg shadow-xl'
                src={book.cover}
                alt={book.title}
              />
              <div className='flex-1 flex flex-col justify-end'>
                <div>
                  <p className='text-h4 mb-4'>{book.title}</p>
                  <p className='text-h5 mb-2'>{author}</p>
                  <div className='text-body1 mb-4'>{formatCategory(book.category_name)}</div>
                  <div className='flex items-center mb-6'>
                    {renderRating(Number(book.rating_info))}
                    <span className='text-[#DD0000] text-body1 ml-2'>{book.rating_info}</span>
                  </div>
                  <p className='text-body1 leading-relaxed'>{book.description}</p>
                </div>
              </div>
            </div>
          </div>
          <Button position='default' onClick={() => navigate('/')}>
            <>
              <Icon src='/icon/X.svg' alt='Close' />
            </>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
