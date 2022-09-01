import type { API, WhereFieldFilter, GameResult, WhereField, APIRequestResult } from '@/common/types';
import useCurrUser from '@/stores/curr-user';
import { getANDFields, getFieldContainsFilter, getFieldEqualFilter, getORFields } from '@/utils/query-string';
import { Endpoints } from '@/common/enums/endpoints';
import { APIService } from './api-service';
import { APIError } from './error-handling/api-error';
import { errorHandler } from './error-handling/error-handler';

const getFilter = (searchText: string, selected: string[]): string => {
  const search: WhereFieldFilter | WhereField | null = searchText
    ? getORFields(['name', 'github'].map((field) => getFieldContainsFilter(field, searchText)))
    : null;

  const select: WhereFieldFilter | WhereField | null = selected.length
    ? getORFields(selected.map((field) => getFieldEqualFilter('role', field)))
    : null;

  return getANDFields([search, select]);
};

const { hasAuth, getUserId } = useCurrUser();

export class GameResultService implements API<GameResult> {
  private service: APIService<GameResult>;

  constructor(gameId: string) {
    this.service = new APIService<GameResult>(`${Endpoints.games}/${gameId}/${Endpoints.results}`);
  }

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

  public create(gameResult: GameResult) {
    const res: APIRequestResult<GameResult> = {
      ok: false,
      status: 401,
      data: {} as GameResult,
      headers: {} as Headers,
    };
    try {
      const userId = getUserId;
      if (!(hasAuth && userId)) throw new APIError('Unauthorized', 401);

      const body = { userId, result: gameResult.result };
      return this.service.create(body);
    } catch (error) {
      errorHandler(error);
    }
    return new Promise<APIRequestResult<GameResult>>((resolve) => {
      resolve(res);
    });
  }

  public updateById(gameId: string, gameResult: GameResult) {
    const { id, result } = gameResult;
    const body = { id, result };
    return this.service.updateById(gameId, body);
  }

  public update(gameResult: GameResult) {
    const res: APIRequestResult<GameResult> = {
      ok: false,
      status: 401,
      data: {} as GameResult,
      headers: {} as Headers,
    };
    try {
      const userId = getUserId;
      if (!(hasAuth && userId)) throw new APIError('Unauthorized', 401);

      const body = { userId, result: gameResult.result };
      return this.service.update(body);
    } catch (error) {
      errorHandler(error);
    }
    return res;
  }

  public deleteById(id: string) {
    return this.service.deleteById(id);
  }
}

export default GameResultService;
