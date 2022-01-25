import { Alert, AlertColor, AlertTitle, Snackbar } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';

type CustomAlertProps = {
  severity: AlertColor;
  text: string;
  show: boolean;
  title?: string;
  autoHideDuration?: number;
};

export default function useCustomAlert(
  initState: CustomAlertProps
): [Dispatch<SetStateAction<CustomAlertProps>>, JSX.Element] {
  const [alertState, setAlertState] = useState(initState);
  const { autoHideDuration, show, severity, title, text } = alertState;

  const CustomSnackbar = (
    <Snackbar
      open={show}
      autoHideDuration={autoHideDuration || 1000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={() => {
        setAlertState((s) => ({
          ...s,
          show: !s.show,
        }));
      }}
    >
      <Alert severity={severity}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {text}
      </Alert>
    </Snackbar>
  );

  return [setAlertState, CustomSnackbar];
}
