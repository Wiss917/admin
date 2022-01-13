import { getApiMonitorData } from 'api/apiAnalysis';
import { IMonitorResult } from 'interfaces/apiAnalysis';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

type MonitorCardProp = {
  name: string;
  data: IMonitorResult[];
};

export const getMonitorCardProps = async () => {
  const { data, msg, code, success } = await getApiMonitorData();

  if (code !== 200 || !success) {
    console.log(msg);
  }

  return {
    props: {
      monitorCardProps: parseMonitorApiData(data),
    },
  };
};

const Dashboard: React.FC<{}> = ({}) => {
  const [monitorCardProps, setMonitorCardProps] = useState<MonitorCardProp[]>(
    []
  );
  const getMonitorCardProps = useCallback(async () => {
    const { data, msg, code, success } = await getApiMonitorData();

    console.log(success ? 'ok' : 'fail');

    if (code !== 200 || !success) {
      console.log(msg);
    }

    setMonitorCardProps(parseMonitorApiData(data));
  }, []);

  useEffect(() => {
    getMonitorCardProps();
  }, [getMonitorCardProps]);

  return (
    <div>
      <Grid container spacing={2}>
        {monitorCardProps.map((item, index) => (
          <Grid key={index} xs={4} md={12}>
            {getCards({ cardProp: item })}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const getCards: React.FC<{ cardProp: MonitorCardProp }> = ({ cardProp }) => {
  return (
    <Card sx={{ height: 300 }}>
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
