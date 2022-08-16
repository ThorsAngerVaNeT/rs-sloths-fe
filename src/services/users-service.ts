import type { API } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

export class UsersService implements API {
  private service = new APIService<unknown>(Endpoints.users);

  private getAllResult = {
    ok: true,
    status: 200,
    data: [
      {
        id: 1,
        name: 'user1',
        email: 'user1@gmail.com',
      },
      {
        id: 2,
        name: 'user2',
        email: 'user2@gmail.com',
      },
      {
        id: 3,
        name: 'user3',
        email: 'user3@gmail.com',
      },
    ],
    headers: 3,
  };

  private getByIdResult = {
    ok: true,
    status: 200,
    data: {
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
    },
    headers: '',
  };

  private getDeleteResult = {
    ok: true,
    status: 200,
    data: {},
    headers: '',
  };

  public getAll() {
    // return this.service.getAll();
    return Promise.resolve(this.getAllResult);
  }

  public getSome(page: number, limit: number) {
    // return this.service.getSome(page, limit);
    return Promise.resolve(this.getAllResult);
  }

  public getById(id: number) {
    // return this.service.getById(id);
    return Promise.resolve(this.getByIdResult);
  }

  public create(body: unknown) {
    // return this.service.create(body);
    return Promise.resolve(this.getByIdResult);
  }

  public updateById(id: number, body: unknown) {
    // return this.service.updateById(id, body);
    return Promise.resolve(this.getByIdResult);
  }

  public deleteById(id: number) {
    // return this.service.deleteById(id);
    return Promise.resolve(this.getDeleteResult);
  }
}

export default UsersService;
