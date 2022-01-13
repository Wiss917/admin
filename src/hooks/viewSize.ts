import { useEffect, useState } from 'react';

export const useViewSize = () => {
  const [deviceViewSize, setDeviceViewSize] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if(!document) {
      return;
    }

    const { clientHeight: height, clientWidth:width } = document.documentElement;

    setDeviceViewSize({
      width,
      height
    })
  }, [])

  return deviceViewSize;
};
