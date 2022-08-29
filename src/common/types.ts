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

  getAll(filter: string, sorting: string): Promise<APIRequestResult<GetList<T>>>;

  getPage(page: number, limit: number, filter: string, sorting: string): Promise<APIRequestResult<GetList<T>>>;

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
  createdAt: number;
  tags: Tags;
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
  createdAt: Date;
  status: SuggestionStatus;
};
export type SuggestionsRating = {
  suggestionId: string;
  userId: string;
  rate: number;
};

export type MemoryLevel = {
  level: string;
  n: number;
};

export type ErrorDescription = {
  code: string;
  message: string;
};

export type Options = Record<string, string>;

export type SelectOptions = {
  value: string;
  text: string;
};

export type TagCloud = Set<string>;

type WhereFieldContains = {
  [keyof: string]: { contains: string; mode: string };
};
type WhereFieldEquals = {
  [keyof: string]: string;
};
export type WhereField = WhereFieldContains | WhereFieldEquals;

export type WhereFieldFilter = { OR: WhereField[] };

export type WhereFieldSome = { tags: { some: { value: { in: string[] } } } };
