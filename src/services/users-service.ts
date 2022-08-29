import type { API, WhereFieldFilter, User, WhereField } from '@/common/types';
import { getANDFields, getFieldContainsFilter, getFieldEqualFilter, getORFields } from '@/utils/query-string';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

const getFilter = (searchText: string, selected: string[]): string => {
  const search: WhereFieldFilter | WhereField | null = searchText
    ? getORFields(['name', 'github'].map((field) => getFieldContainsFilter(field, searchText)))
    : null;

  const select: WhereFieldFilter | WhereField | null = selected.length
    ? getORFields(selected.map((field) => getFieldEqualFilter('role', field)))
    : null;

  return getANDFields([search, select]);
};

export class UsersService implements API<User> {
  private service = new APIService<User>(Endpoints.users);

  public getAllList() {
    return this.service.getAllList();
  }

  public getAll(searchText = '', sorting = '', selected = [] as string[]) {
    return this.service.getAll(getFilter(searchText, selected), sorting);
  }

  public getPage(page: number, limit: number, searchText = '', sorting = '', selected = [] as string[]) {
    return this.service.getPage(page, limit, getFilter(searchText, selected), sorting);
  }

  public getById(id: string) {
    return this.service.getById(id);
  }

  public create(body: User) {
    return this.service.create(body);
  }

  public updateById(userId: string, user: User) {
    const { id, name, role, github } = user;
    const body = { id, name, role, github };
    return this.service.updateById(userId, body);
  }

  public deleteById(id: string) {
    return this.service.deleteById(id);
  }
}

export default UsersService;
