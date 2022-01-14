import { IList, IResponse } from 'interfaces/api';
import {
  IApiInfoRecord,
  IApiLogRecord,
  IMonitorResult,
} from 'interfaces/apiAnalysis';
import instance from 'utils/axios';

export const getApiMonitorData = (): Promise<IResponse<IMonitorResult[]>> =>
  instance.get('/api/apimanage/apihistory/apiMonitor', {});

/**
 *
 * @param apireqtype 接口类型
 * @param current 当前页码
 * @param size 查询数量
 * @returns
 */
export const getApiInfoList = (
  apireqtype = '1',
  current = 1,
  size = 10
): Promise<IResponse<IList<IApiInfoRecord>>> =>
  instance.get('/apimanage/apihistory/apiInfoList', {
    params: {
      apireqtype,
      size,
      current,
    },
  });

/**
 *
 * @param apiId api唯一标识
 * @param current 当前页码
 * @param size 查询数量
 * @returns 
 */
export const getApiHistoryList = (
  apiId = '',
  current = 1,
  size = 10
): Promise<IResponse<IList<IApiLogRecord>>> =>
  instance.get('/api/apimanage/apihistory/apiInfoHistoryList', {
    params: {
      apiId,
      size,
      current,
    },
  });
