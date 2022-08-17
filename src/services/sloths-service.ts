import type { API } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';
import { getAllSloths, getByIdSloth, getDeleteSloth } from './mocks/sloths-mocks';

export class SlothsService<T> implements API<T> {
  private service = new APIService<T>(Endpoints.sloths);

  private getAllResult = getAllSloths;

  private getByIdResult = getByIdSloth;

  private getDeleteResult = getDeleteSloth;

  public getAll() {
    // return this.service.getAll();
    return Promise.resolve(this.getAllResult);
  }

  public getPage(page: number, limit: number) {
    // return this.service.getSome(page, limit);
    return Promise.resolve(this.getAllResult);
  }

  public getById(id: string) {
    // return this.service.getById(id);
    return Promise.resolve(this.getByIdResult);
  }

  public create(body: T) {
    // return this.service.create(body);
    return Promise.resolve(this.getByIdResult);
  }

  public updateById(id: string, body: T) {
    // return this.service.updateById(id, body);
    return Promise.resolve(this.getByIdResult);
  }

  public deleteById(id: string) {
    // return this.service.deleteById(id);
    return Promise.resolve(this.getDeleteResult);
  }
}

export default SlothsService;
