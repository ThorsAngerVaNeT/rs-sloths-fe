import type { SuggestionStatus } from './enums/suggestion-status';
import type { Role } from './enums/user-role';

export type APIRequestResult<T> = {
  ok: boolean;
  status: number;
  data: T;
  headers: Headers;
};

export type GetList<T> = {
  count: number;
  items: T[];
};

export interface API<T> {
  getAllList(): Promise<APIRequestResult<T[]>>;

  getByOptions(options: QueryStringOptions): Promise<APIRequestResult<GetList<T>>>;

  getAll(
    page: number,
    limit: number,
    order: string,
    searchText: string,
    filter: string,
    userId: string
  ): Promise<APIRequestResult<GetList<T>>>;

  getById(id: string): Promise<APIRequestResult<T>>;

  create(body: T): Promise<APIRequestResult<T>>;

  updateById(id: string, body: T): Promise<APIRequestResult<Partial<T>>>;

  deleteById(id: string): Promise<APIRequestResult<T>>;
}

export type Tags = Tag[];
export type Tag = {
  value: string;
};

export type Users = User[];
export type User = {
  id: string;
  name: string;
  github: string;
  avatar_url: string;
  createdAt: Date;
  role: Role;
};

export type Sloths = Sloth[];
export type Sloth = {
  id: string;
  caption: string;
  description: string;
  image_url: string;
  rating: number;
  ratings: UserRate[];
  createdAt: number;
  tags: Tags;
  checked?: boolean;
};
export type SlothTags = {
  id: string;
  caption: string;
  description: string;
  image_url: string;
  rating: number;
  createdAt: number;
  tags: string;
};
export type SlothRating = {
  slothId: string;
  userId: string;
  rate: number;
};

export type Suggestions = Suggestion[];
export type Suggestion = {
  id: string;
  description: string;
  image_url: string;
  userId: string;
  rating: number;
  ratings: UserRate[];
  createdAt: Date;
  status: SuggestionStatus;
};
export type SuggestionsRating = {
  suggestionId: string;
  userId: string;
  rate: number;
};

export type UserRate = {
  rate: number;
};

export type GameResults = GameResult[];
export type GameResult = {
  id?: string;
  gameId?: string;
  userId?: string;
  count: number;
  time: number;
  createdAt?: Date;
};

export type MemoryLevel = {
  level: string;
  n: number;
  gameId: string;
};

export type ErrorDescription = {
  code: string;
  message: string;
};

export type QueryStringOptions = {
  page?: string;
  limit?: string;
  order?: string;
  searchText?: string;
  filter?: string;
  userId?: string;
};

export type SelectOptions = {
  value: string;
  text: string;
};

export type TagCloud = Set<string>;

export type PageSettings = {
  currPage: number;
  perPage: number;
  searchText: string;
  selected: string[];
  sorting: string;
  checked?: string[];
};
