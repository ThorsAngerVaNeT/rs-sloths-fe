import type { API } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

export class UsersService implements API {
  private service = new APIService(Endpoints.users);

  public getAll() {
    return this.service.getAll();
  }

  public getSome(page: number, limit: number) {
    return this.service.getSome(page, limit);
  }

  public getById(id: number) {
    return this.service.getById(id);
  }

  public create(body: unknown) {
    return this.service.create(body);
  }

  public updateById(id: number, body: unknown) {
    return this.service.updateById(id, body);
  }

  public deleteById(id: number) {
    return this.service.deleteById(id);
  }
}

export default UsersService;
