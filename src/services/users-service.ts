import type { API, Users } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';
import { getAllUsers, getByIdUser, getDeleteUser } from './mocks/users-mocks';

export class UsersService implements API<Users> {
  private service = new APIService<Users>(Endpoints.users);

  private getAllResult = getAllUsers;

  private getByIdResult = getByIdUser;

  private getDeleteResult = getDeleteUser;

  public getAll() {
    return this.service.getAll();
    // return Promise.resolve(this.getAllResult);
  }

  public getPage(page: number, limit: number) {
    // return this.service.getSome(page, limit);
    return Promise.resolve(this.getAllResult);
  }

  public getById(id: string) {
    // return this.service.getById(id);
    return Promise.resolve(this.getByIdResult);
  }

  public create(body: Users) {
    // return this.service.create(body);
    return Promise.resolve(this.getByIdResult);
  }

  public updateById(id: string, body: Users) {
    // return this.service.updateById(id, body);
    return Promise.resolve(this.getByIdResult);
  }

  public deleteById(id: string) {
    // return this.service.deleteById(id);
    return Promise.resolve(this.getDeleteResult);
  }
}

export default UsersService;
