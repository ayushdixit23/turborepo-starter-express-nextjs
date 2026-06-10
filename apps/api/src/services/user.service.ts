type CreateUserInput = {
  name?: string;
  email: string;
};

type UpdateUserInput = {
  name?: string;
  email?: string;
};

export const createUser = (input: CreateUserInput) => {
  return {
    id: Math.floor(Math.random() * 1000),
    name: input.name ?? 'John Doe',
    email: input.email,
    createdAt: new Date().toISOString(),
  };
};

export const updateUser = (id: number, input: UpdateUserInput) => {
  return {
    id,
    name: input.name ?? 'Updated Name',
    email: input.email ?? 'updated@example.com',
    updatedAt: new Date().toISOString(),
  };
};

export const deleteUser = (id: number) => {
  return {
    deleted: true,
    id,
  };
};
