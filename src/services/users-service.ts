import type { API, User } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

const getFilter = (searchText: string) => {
  return searchText
    ? JSON.stringify({
        OR: [
          {
            name: {
              contains: searchText,
            },
          },
          {
            github: {
              contains: searchText,
            },
          },
        ],
      })
    : '';
};

export class UsersService implements API<User> {
  private service = new APIService<User>(Endpoints.users);

  public getAll(searchText = '', sorting = '') {
    return this.service.getAll(getFilter(searchText), sorting);
  }

  public getPage(page: number, limit: number, searchText = '', sorting = '') {
    return this.service.getPage(page, limit, getFilter(searchText), sorting);
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
