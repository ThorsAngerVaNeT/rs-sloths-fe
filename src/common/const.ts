/* eslint-disable import/prefer-default-export */

import type { ErrorDescription, MemoryLevel, SelectOptions } from './types';

// Services
export const BASE = 'http://localhost:3000'; // todo

// custom Errors
export const JSON_ERROR: ErrorDescription = { code: 'NOT_JSON', message: 'Response is not a JSON!' };

export const USERS_ERROR_GET_LIST: ErrorDescription = {
  code: 'USERS_GET_LIST',
  message: 'Failed to get list of users from server',
};
export const USERS_ERROR_GET: ErrorDescription = {
  code: 'USERS_GET',
  message: 'Failed to get user info from server',
};
export const USERS_ERROR_DEL: ErrorDescription = {
  code: 'USERS_DEL',
  message: 'Failed to delete user from server',
};
export const USERS_ERROR_CREATE: ErrorDescription = {
  code: 'USERS_CREATE',
  message: 'Failed to add user to server',
};
export const USERS_ERROR_UPD: ErrorDescription = {
  code: 'USERS_UPD',
  message: 'Failed to update user on server',
};

// Sorting
export const USER_SORTING: SelectOptions[] = [
  {
    value: JSON.stringify({ name: 'desc' }),
    text: 'sorting.name-',
  },
  {
    value: JSON.stringify({ name: 'asc' }),
    text: 'sorting.name+',
  },
  {
    value: JSON.stringify({ github: 'desc' }),
    text: 'sorting.github-',
  },
  {
    value: JSON.stringify({ github: 'asc' }),
    text: 'sorting.github+',
  },
  {
    value: JSON.stringify({ createdAt: 'desc' }),
    text: 'sorting.createdAt-',
  },
  {
    value: JSON.stringify({ createdAt: 'asc' }),
    text: 'sorting.createdAt+',
  },
];

export const SLOTH_SORTING: SelectOptions[] = [
  {
    value: JSON.stringify({ caption: 'desc' }),
    text: 'sorting.caption-',
  },
  {
    value: JSON.stringify({ caption: 'asc' }),
    text: 'sorting.caption+',
  },
  {
    value: JSON.stringify({ rating: 'desc' }),
    text: 'sorting.rating-',
  },
  {
    value: JSON.stringify({ rating: 'asc' }),
    text: 'sorting.rating+',
  },
  {
    value: JSON.stringify({ createdAt: 'desc' }),
    text: 'sorting.createdAt-',
  },
  {
    value: JSON.stringify({ createdAt: 'asc' }),
    text: 'sorting.createdAt+',
  },
];
export const SUGGESTION_SORTING: SelectOptions[] = [
  {
    value: JSON.stringify({ status: 'desc' }),
    text: 'sorting.status-',
  },
  {
    value: JSON.stringify({ status: 'asc' }),
    text: 'sorting.status+',
  },
  {
    value: JSON.stringify({ rating: 'desc' }),
    text: 'sorting.rating-',
  },
  {
    value: JSON.stringify({ rating: 'asc' }),
    text: 'sorting.rating+',
  },
  {
    value: JSON.stringify({ createdAt: 'desc' }),
    text: 'sorting.createdAt-',
  },
  {
    value: JSON.stringify({ createdAt: 'asc' }),
    text: 'sorting.createdAt+',
  },
];

// Pagination
export const PAGINATION_OPTIONS: number[] = [10, 15, 20, 1, 2];

// Users
export const DEFAULT_USER_AVATAR = './img/profile/default.svg';
export const AUTHORIZATION_IMG = './github.png';
export const AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize?client_id=12e65e35ba7755d60466';

// Memory Game
export const MEMORY_LEVELS: MemoryLevel[] = [
  {
    level: 'junior',
    n: 4,
    gameId: '36fdb508-80e4-4e0d-a6b8-78fe7e66a5d5',
  },
  {
    level: 'middle',
    n: 8,
    gameId: 'ca0305dc-9dab-4f36-84f1-45f8223818e0',
  },
  {
    level: 'senior',
    n: 12,
    gameId: '42df7648-5c56-4a66-a288-ec6acf8b18b0',
  },
];
export const MEMORY_GAME_TIMEOUT = 1000;
export const MEMORY_GAME_COVER = './card-cover.png';
export const MEMORY_GAME_WINNER = './winner1.png';

export const CATALOG_SLOTH_PREVIEW = './preview.svg';
