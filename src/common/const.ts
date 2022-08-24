/* eslint-disable import/prefer-default-export */

import type { ErrorDescription } from './types';

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

// Users
export const DEFAULT_USER_AVATAR = './default-user.png';
export const AUTHORIZATION_IMG = './github.png';
export const AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize?client_id=12e65e35ba7755d60466';

// Memory Game
export const MEMORY_LEVELS = [
  {
    level: 'junior',
    n: 4,
  },
  {
    level: 'middle',
    n: 8,
  },
  {
    level: 'senior',
    n: 12,
  },
];
export const MEMORY_GAME_TIMEOUT = 1000;
export const MEMORY_GAME_COVER = './card-cover.png';
