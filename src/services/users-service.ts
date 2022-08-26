import type { API, User } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

export class UsersService implements API<User> {
  private service = new APIService<User>(Endpoints.users);

  public getAll() {
    return this.service.getAll();
  }

  public getPage(page: number, limit: number) {
    return this.service.getPage(page, limit);
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
