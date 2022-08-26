import type { API, Sloth, SlothRating, WhereField, WhereFieldFilter } from '@/common/types';
import { getORFields, getFieldContainsFilter, getFieldEqualFilter, getANDFields } from '@/utils/query-string';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

const getFilter = (searchText: string, selected: string[]): string => {
  const search: WhereFieldFilter | WhereField | null = searchText
    ? getORFields(['caption', 'description'].map((field) => getFieldContainsFilter(field, searchText)))
    : null;

  const select: WhereFieldFilter | WhereField | null = selected.length
    ? getORFields(selected.map((field) => getFieldEqualFilter('role', field)))
    : null;

  return getANDFields([search, select]);
};

export class SlothsService implements API<Sloth> {
  private service = new APIService<Sloth>(Endpoints.sloths);

  public getAll(searchText = '', sorting = '', selected = [] as string[]) {
    return this.service.getAll(getFilter(searchText, selected), sorting);
  }

  public getPage(page: number, limit: number, searchText = '', sorting = '', selected = [] as string[]) {
    return this.service.getPage(page, limit, getFilter(searchText, selected), sorting);
  }

  public getById(id: string) {
    return this.service.getById(id);
  }

  public create(body: Sloth) {
    return this.service.create(body);
  }

  public updateById(slothId: string, sloth: Sloth) {
    const { id, caption, description } = sloth;
    const body = { id, caption, description };
    return this.service.updateById(slothId, body);
  }

  public static updateRatingById(slothId: string, rate: number) {
    const ratingService = new APIService<SlothRating>(`${Endpoints.sloths}/${slothId}/rating`);
    const userId = '09edb293-9e8c-4768-8d32-3ee2784959fa'; // todo user id

    const body: SlothRating = { slothId, userId, rate };
    return ratingService.update(body);
  }

  public deleteById(id: string) {
    return this.service.deleteById(id);
  }
}

export default SlothsService;
