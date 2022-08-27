import type {
  API,
  Sloth,
  SlothRating,
  SlothTags,
  Tag,
  WhereField,
  WhereFieldFilter,
  WhereFieldSome,
} from '@/common/types';
import { getORFields, getFieldContainsFilter, getANDFields } from '@/utils/query-string';
import { Endpoints } from '../common/enums/endpoints';
import { APIService } from './api-service';

const getFilter = (searchText: string, selected: string[]): string => {
  const search: WhereFieldFilter | WhereField | null = searchText
    ? getORFields(['caption', 'description'].map((field) => getFieldContainsFilter(field, searchText)))
    : null;

  const select: WhereFieldSome | null = selected.length ? { tags: { some: { value: { in: selected } } } } : null;

  return getANDFields([search, select]);
};

export class SlothsService implements API<Sloth> {
  private service = new APIService<Sloth>(Endpoints.sloths);

  public getAllList() {
    return this.service.getAllList();
  }

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

  public createImage(sloth: Sloth, file: File) {
    const formData = new FormData();
    formData.append('caption', sloth.caption);
    formData.append('description', sloth.description);
    formData.append('tags', JSON.stringify(sloth.tags));
    formData.append('file', file);

    return this.service.createImage(formData);
  }

  public updateById(slothId: string, sloth: Sloth) {
    const { id, caption, description } = sloth;
    const imageUrl = sloth.image_url;
    const body = { id, caption, description, image_url: imageUrl };
    return this.service.updateById(slothId, body);
  }

  public static updateByIdAndTags(slothId: string, sloth: Sloth) {
    const tagsService = new APIService<SlothTags>(Endpoints.sloths);

    const { id, caption, description, tags } = sloth;
    const imageUrl = sloth.image_url;
    const body = { id, caption, description, image_url: imageUrl, tags: JSON.stringify(tags) };
    return tagsService.updateById(slothId, body);
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

  public static getTags() {
    const tagsService = new APIService<Tag>(`${Endpoints.sloths}/tags`);

    return tagsService.getAllList();
  }
}

export default SlothsService;
