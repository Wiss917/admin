import { IResponse } from '@/interfaces/api';
import instance from '@/utils/axios';

type AppDetail = {
  id: string;
  parentId: string;
  name: string;
  alias: string;
  category: number;
  path: string;
  isPublic: number;
  image: string;
  sort: number;
  remark: string;
  isDeleted: number;
  isNewPage: number;
  color: string;
  source: string;
  secondImg: null | string;
  menuParam: null | string;
  menuOption: null | string;
  parentName: null | string;
  categoryName: null | string;
  children?: AppDetail[];
};

export function loadUserApps(params: {
  parentMenuId: string;
}): Promise<IResponse<AppDetail[]>> {
  return instance.get('/blade-system/menu/mobile/routes', {
    params,
  });
}

export function loadAppDetails(params: {
  id: string;
}): Promise<IResponse<AppDetail>> {
  return instance.get('/blade-system/menu/mobile/detail', {
    params,
  });
}
