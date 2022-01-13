export interface IResponse<T = any> {
  /** 状态码 */
  code: number;
  data: T;
  msg: string;
  /** 请求是否成功 */
  success: boolean;
}

export interface IList<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  orders: unknown;
  optimizeCountSql: boolean;
  hitCount: boolean;
  searchCount: boolean;
  pages: number;
}
