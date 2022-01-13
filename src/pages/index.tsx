import { TabBar } from '@/components/TabBar';
import { Header } from '@/components/Header';
import React, { useEffect, useCallback, useState } from 'react';
import { loadAppDetails, loadUserApps } from '@/api/common';
import { Backdrop, CircularProgress } from '@mui/material';
import TransitionGroupExample from '@/components/Transition';
import { Carousel } from '@/components/Carousel';
import style from '../styles/index.module.scss';

interface IHomeProps {
  configs: config[];
}

type config = {
  name: string;
  alias: string;
  remark: string;
  link: string;
};

const id = '1461263265597231105';
const carouselId = '1474295972354854914';

const Home: React.FC<IHomeProps> = ({ configs }) => {
  const [barItems, setBarItems] = useState<string[]>([]);
  const [imgItems, setImgItems] = useState<string[]>([]);

  const [open, setOpen] = useState(true);

  const getPageConfig = useCallback(async () => {
    const [
      {
        data: detailData,
        code: detailCode,
        success: detailSuccess,
        msg: detailMsg,
      },
      { data: appData, code: appCode, success: appSuccess, msg: appMsg },
      { data: imgData, code: imgCode, success: imgSuccess, msg: imgMsg },
    ] = await Promise.all([
      loadAppDetails({ id }),
      loadUserApps({ parentMenuId: id }),
      loadUserApps({ parentMenuId: carouselId }),
    ]);

    if (detailCode !== 200 || !detailSuccess) {
      // todo
      console.log(detailMsg);
    }

    console.log(detailData, '详情');

    if (appCode !== 200 || !appSuccess) {
      console.log(appMsg);
      return;
    }

    if (imgCode !== 200 || !imgSuccess) {
      console.log(imgMsg);
      return;
    }

    console.log(appData, '配置');

    setOpen(false);
    setBarItems(appData.map(({ name }) => name));
    setImgItems(imgData.map(({ image }) => image));
  }, []);

  useEffect(() => {
    // todo callback
    document.title = 'home';
    getPageConfig();
  }, [getPageConfig]);

  return (
    <div>
      <Header title="Hello NextJs"></Header>
      <Carousel imgItems={imgItems}></Carousel>
      <TransitionGroupExample></TransitionGroupExample>
      <div className="footer">
        <div className={style.box}>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
      </div>
      <TabBar barItems={barItems}></TabBar>
      <Backdrop open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Home;
