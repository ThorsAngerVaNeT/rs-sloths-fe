/* eslint-disable import/prefer-default-export */
export const getAllSloths = {
  ok: true,
  status: 200,
  data: [
    {
      id: 1,
      name: 'sloth1',
    },
    {
      id: 2,
      name: 'sloth2',
    },
    {
      id: 3,
      name: 'sloth3',
    },
  ],
  headers: 3,
};

export const getByIdSloth = {
  ok: true,
  status: 200,
  data: {
    id: 1,
    name: 'sloth1',
  },
  headers: '',
};

export const getDeleteSloth = {
  ok: true,
  status: 204,
  data: {},
  headers: '',
};
