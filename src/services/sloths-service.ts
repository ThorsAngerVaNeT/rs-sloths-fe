import type { API, Sloth } from '@/common/types';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';
import { getAllSloths, getByIdSloth, getDeleteSloth } from './mocks/sloths-mocks';

export class SlothsService implements API<Sloth> {
  private service = new APIService<Sloth>(Endpoints.sloths);

  private getAllResult = getAllSloths;

  private getByIdResult = getByIdSloth;

  private getDeleteResult = getDeleteSloth;

  public getAll() {
    return this.service.getAll();
    // return Promise.resolve(this.getAllResult);
  }

  public getPage(page: number, limit: number) {
    return this.service.getPage(page, limit);
    // return Promise.resolve(this.getAllResult);
  }

  public getById(id: string) {
    return this.service.getById(id);
    // return Promise.resolve(this.getByIdResult);
  }

  public create(body: Sloth) {
    return this.service.create(body);
    // return Promise.resolve(this.getByIdResult);
  }

  public updateById(slothId: string, sloth: Sloth) {
    const { id, caption, description } = sloth;
    const body = { id, caption, description };
    return this.service.updateById(slothId, body);
    // return Promise.resolve(this.getByIdResult);
  }

  public deleteById(id: string) {
    return this.service.deleteById(id);
    // return Promise.resolve(this.getDeleteResult);
  }
}

export default SlothsService;
