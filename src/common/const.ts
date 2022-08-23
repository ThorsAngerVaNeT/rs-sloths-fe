/* eslint-disable import/prefer-default-export */
// Services
export const BASE = 'http://localhost:3000'; // todo

export const JSON_ERROR = 'Response is not a JSON!';
export const JSON_ERROR_CODE = 'NOT_JSON';

// Users
export const DEFAULT_USER_AVATAR = './default-user.png';

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
