/**
 * @interface 接口监控数据统计
 */
export interface IMonitorResult {
  modelName: string;
  value: number;
  key: string;
}

/**
 * @interface api基础信息
 */
export interface IApiInfoRecord {
  id: string;
  createUser: string;
  createDept: string;
  createTime: string;
  updateUser: string;
  updateTime: string;
  status: number;
  isDeleted: number;
  parentId: string;
  apiname: string;
  apidesc: string;
  apitype: number;
  apiurl: string;
  apirsptype: number;
  apirspjson: unknown /* 未知类型 */;
  auth: number;
  apireqtype: number;
  publish: number;
  clientCnt: number;
  apiTime: string;
}

/**
 * @interface api日志
 */
export interface IApiLogRecord {
  id: string;
  apiid: string;
  apiName: string;
  apiDesc: string;
  apiMethod: string;
  apiUrl: string;
  apiUri: string;
  apiArgs: string;
  apiResult: string;
  remoteIp: string;
  userAgent: string;
  apiCreateTime: Date;
  status: number;
  isDeleted: number;
  apireqtype: number;
  clientId: string;
  clientName: string;
}
