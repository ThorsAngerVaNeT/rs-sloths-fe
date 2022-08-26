import type { API, User } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

const getFilter = (searchText: string, selected: string[]) => {
  const search = searchText
    ? {
        OR: [
          {
            name: {
              contains: searchText,
              mode: 'insensitive',
            },
          },
          {
            github: {
              contains: searchText,
              mode: 'insensitive',
            },
          },
        ],
      }
    : '';

  const select = selected.length
    ? {
        OR: selected.map((el) => {
          return { role: el };
        }),
      }
    : '';

  if (search && select) return JSON.stringify({ AND: [search, select] });
  if (search) return JSON.stringify(search);
  if (select) return JSON.stringify(select);

  return '';
};

export class UsersService implements API<User> {
  private service = new APIService<User>(Endpoints.users);

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
    const { id, name, role } = user;
    const body = { id, name, role };
    return this.service.updateById(userId, body);
  }

  public deleteById(id: string) {
    return this.service.deleteById(id);
  }
}

export default UsersService;
