import type { API, Sloths } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';
import { getAllSloths, getByIdSloth, getDeleteSloth } from './mocks/sloths-mocks';

export class SlothsService implements API<Sloths> {
  private service = new APIService<Sloths>(Endpoints.sloths);

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

  public create(body: Sloths) {
    // return this.service.create(body);
    return Promise.resolve(this.getByIdResult);
  }

  public updateById(id: string, body: Sloths) {
    // return this.service.updateById(id, body);
    return Promise.resolve(this.getByIdResult);
  }

  public deleteById(id: string) {
    // return this.service.deleteById(id);
    return Promise.resolve(this.getDeleteResult);
  }
}

export default SlothsService;
