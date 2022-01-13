import { Home } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import React, { useMemo, useState } from 'react';
import style from './index.module.scss';

// todo 考虑响应式， 大屏左边导航， 中屏抽屉显示
// todo Bottom Navigation refectory
interface ITabBarProps {
  barItems: string[];
}

interface IBarItemProps {
  name: string;
  isActive: boolean;
  changeActive: Function;
}

export const TabBar: React.FC<ITabBarProps> = ({ barItems = [] }) => {
  const [active, setActive] = useState<number>(
    barItems.findIndex((name) => name === '首页')
  );

  const handleClick = (index: number) => {
    if (index !== active) {
      setActive(index);
    }
  };

  return barItems.length ? (
    <div className={style.bar}>
      <Grid container columns={barItems.length}>
        {barItems.map((barName, index) => {
          return (
            <Grid item key={index} xs={1}>
              <BarItem
                name={barName}
                isActive={active === index}
                changeActive={() => {
                  setActive(index);
                }}
              ></BarItem>
            </Grid>
          );
        })}
      </Grid>
    </div>
  ) : null;
};

const BarItem: React.FC<IBarItemProps> = ({ name, isActive, changeActive }) => {
  return (
    <Button
      fullWidth
      className="bar-item"
      startIcon={<Home sx={{ ml: 1 }} />}
      color={isActive ? 'primary' : 'warning'}
      onClick={() => changeActive()}
    >
      <span>{name}</span>
    </Button>
  );
};

TabBar.defaultProps = {
  barItems: [],
};
