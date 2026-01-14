import React, { useEffect, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth?: number;
  frameSize?: number;
  step?: number;
  animationDuration?: number;
  infinity?: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinity = false,
}) => {
  const [position, setPosition] = useState(0);

  const wrapperStyle = {
    width: `${frameSize * itemWidth}px`,
  };

  const itemStyle = {
    width: `${itemWidth}px`,
  };
  const listWidth = itemWidth * images.length;
  const listStyle = {
    width: `${listWidth}px`,
    transform: `translateX(${position}px)`,
    transition: `transform ${animationDuration}ms`,
  };

  const control = itemWidth * frameSize;

  type OnClick = 'previous' | 'next';

  const handleOnClick = (direction: OnClick) => {
    if (direction === 'next') {
      setPosition(position - step * itemWidth);
    } else {
      setPosition(position + step * itemWidth);
    }
  };

  useEffect(() => {
    if (!infinity) {
      return;
    }

    const interval = setInterval(() => {
      setPosition(prev => {
        const nextPosition = prev - step * itemWidth;

        if (Math.abs(nextPosition) >= listWidth) {
          return 0;
        }

        return nextPosition;
      });
    }, animationDuration + 500);

    return () => clearInterval(interval);
  }, [infinity, animationDuration, itemWidth, listWidth, step]);

  return (
    <div className="Carousel">
      <button
        onClick={() => handleOnClick('previous')}
        type="button"
        className={position === 0 && !infinity ? 'disabled' : ''}
        disabled={position === 0 && !infinity}
      >
        ←
      </button>

      <div className="Carousel__wrapper" style={wrapperStyle}>
        <ul className="Carousel__list" style={listStyle}>
          {images.map((image: string, index: number) => (
            <li className="Carousel__item" key={image} style={itemStyle}>
              <img src={image} width={`${itemWidth}`} alt={`${index}`} />
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => handleOnClick('next')}
        type="button"
        className={
          (listWidth + position === control ||
            listWidth - Math.abs(position) === itemWidth) &&
          !infinity
            ? 'disabled'
            : ''
        }
        disabled={
          (listWidth - Math.abs(position) === control ||
            listWidth - Math.abs(position) === itemWidth) &&
          !infinity
        }
        data-cy="next"
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
