import { useViewSize } from 'hooks/viewSize';
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import style from './index.module.scss';

export const Carousel: React.FC<{ imgItems: string[] }> = ({ imgItems }) => {
  const [imgIndex, setImgIndex] = useState(1);
  const { width, height } = useViewSize();

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setImgIndex((i) => (i === 4 ? 1 : i + 1));
  //   }, 3000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <div
      className={style.carousel}
    >
    </div>
  );
};

const CarouselItem: React.FC<{ path: string }> = ({ path }) => {
  return <div></div>;
};
