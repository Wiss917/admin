import { AlertColor } from '@mui/material';
import { Location } from 'react-router';

export interface IRedirectState {
  from: Location;
  alertType?: AlertColor | undefined;
  msg?: string;
}
