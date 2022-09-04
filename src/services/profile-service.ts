import type { API, User, QueryStringOptions } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

export class ProfileService implements API<User> {
  private service = new APIService<User>(Endpoints.profile);

  public getAllList() {
    return this.service.getAllList();
  }

  public getByOptions(options: QueryStringOptions) {
    return this.service.getByOptions(options);
  }

  public getAll(page = 1, limit = 10, order = '', searchText = '', filter = '', userId = '') {
    return this.service.getAll(page, limit, order, searchText, filter, userId);
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

export default ProfileService;
