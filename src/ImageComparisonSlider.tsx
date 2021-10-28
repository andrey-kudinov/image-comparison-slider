/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import './ImageComparisonSlider.scss';

import React from 'react';

interface IProps {
  imageLeft: string;
  imageRight: string;
  styleRightImage?: React.CSSProperties;
}

const ImageComparisonSlider: React.FC<IProps> = (props: IProps) => {
  const { imageLeft, imageRight, styleRightImage } = props;
  const handleRef = React.useRef<HTMLDivElement>(null);
  const leftImgRef = React.useRef<HTMLImageElement>(null);
  let isMouseDown: boolean = false;
  let clientX: number;
  let handleWidth: number;
  let imgWidth: number;
  let imgHeight: number;

  const handleStart = (e: any): void => {
    e.stopPropagation();
    e.preventDefault();
    clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    isMouseDown = true;
  };

  const handleEnd = (): void => {
    isMouseDown = false;
  };

  const handleMove = (e: any): void => {
    if (isMouseDown && handleRef.current && leftImgRef.current) {
      if (e.type === 'mousemove') {
        handleRef.current.style.left = `${
          parseInt(handleRef.current.style.left, 10) + (e.clientX - clientX)
        }px`;
        clientX = e.clientX;
      } else {
        if (handleRef.current)
          handleRef.current.style.left = `${
            parseInt(handleRef.current.style.left, 10) +
            (Math.round(e.touches[0].clientX) - clientX)
          }px`;
        clientX = Math.round(e.touches[0].clientX);
      }

      const { width, height } = handleRef.current.getBoundingClientRect();
      leftImgRef.current.style.clip = `rect(0px, ${
        width / 2 + parseInt(handleRef.current.style.left, 10)
      }px, ${height}px, 0px)`;
    }
  };

  const handleResize = (): void => {
    if (handleRef.current && leftImgRef.current) {
      handleRef.current.style.left = `${imgWidth / 2 - handleWidth / 2}px`;
      leftImgRef.current.style.clip = `rect(0px, ${imgWidth / 2}px, ${imgHeight}px, 0px`;

      ({ width: handleWidth } = handleRef.current.getBoundingClientRect());
      ({ width: imgWidth, height: imgHeight } =
        leftImgRef.current.getBoundingClientRect());
    }
  };

  React.useEffect(() => {
    if (handleRef.current && leftImgRef.current) {
      ({ width: handleWidth } = handleRef.current.getBoundingClientRect());
      ({ width: imgWidth, height: imgHeight } =
        leftImgRef.current.getBoundingClientRect());

      handleRef.current.style.left = `${imgWidth / 2 - handleWidth / 2}px`;
      leftImgRef.current.style.clip = `rect(0px, ${imgWidth / 2}px, 999px, 0px)`;

      window.addEventListener('resize', handleResize);
    }

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="image-comparison">
      <div
        className="image-comparison__handle"
        ref={handleRef}
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseOut={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        aria-label="Handler image comparison"
        role="slider"
        tabIndex={0}>
        <div className="image-comparison__icons">
          <i className="icon-chevron-left" />
          <i className="icon-chevron-right" />
        </div>
      </div>
      <img
        className="image-comparison__img"
        ref={leftImgRef}
        src={imageLeft}
        alt="before comparison"
      />
      <img
        className="image-comparison__img"
        style={styleRightImage}
        src={imageRight}
        alt="after comparison"
      />
    </div>
  );
};

export default ImageComparisonSlider;
