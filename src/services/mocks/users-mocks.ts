/* eslint-disable import/prefer-default-export */
export const getAllUsers = {
  ok: true,
  status: 200,
  data: [
    {
      id: 1,
      name: 'user1',
      email: 'user1@gmail.com',
    },
    {
      id: 2,
      name: 'user2',
      email: 'user2@gmail.com',
    },
    {
      id: 3,
      name: 'user3',
      email: 'user3@gmail.com',
    },
  ],
  headers: 3,
};

export const getByIdUser = {
  ok: true,
  status: 200,
  data: {
    id: 1,
    name: 'user1',
    email: 'user1@gmail.com',
  },
  headers: '',
};

export const getDeleteUser = {
  ok: true,
  status: 200,
  data: {},
  headers: '',
};
