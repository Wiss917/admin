import React, { useCallback, useContext, useEffect, useState } from 'react';
import { getApiMonitorData } from 'api/apiAnalysis';
import { IMonitorResult } from 'interfaces/apiAnalysis';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import { defaultGradientColors } from 'constant/colors';
import AuthContext from 'context/authContext';

type MonitorCardProp = {
  name: string;
  data: IMonitorResult[];
};

const Dashboard = () => {
  const [monitorCardProps, setMonitorCardProps] = useState<MonitorCardProp[]>(
    []
  );
  const { goRedirect } = useContext(AuthContext);
  const getMonitorCardProps = useCallback(async () => {
    try {
      const { data, msg, code, success } = await getApiMonitorData();

      const go = goRedirect(code);

      if (go) {
        throw new Error('redirect');
      }

      if (code !== 200 || !success) {
        throw new Error(msg || '首页信息获取失败！');
      }

      setMonitorCardProps(parseMonitorApiData(data));
    } catch (e) {
      console.error(e);
    }
  }, [goRedirect]);

  useEffect(() => {
    getMonitorCardProps();
  }, [getMonitorCardProps]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ pt: 2 }}>
          Welcome! 🙋🏻
        </Grid>
        {monitorCardProps.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <StatusCard
              cardProp={item}
              bgColor={defaultGradientColors[index]}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const StatusCard: React.FC<{
  cardProp: MonitorCardProp;
  bgColor: string | undefined;
}> = ({ cardProp, bgColor }) => {
  return (
    <Card sx={{ height: 300, background: bgColor }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          hello
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

const parseMonitorApiData = (data: IMonitorResult[]): MonitorCardProp[] =>
  data
    .reduce<string[]>(
      (pre, { modelName }) =>
        pre.includes(modelName) ? pre : [...pre, modelName],
      []
    )
    .map((m) => ({
      name: m,
      data: data.filter(({ modelName }) => m === modelName),
    }));

export default Dashboard;