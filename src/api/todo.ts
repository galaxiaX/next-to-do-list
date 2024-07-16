import { BASE_API } from '@/config-global';
import { TodoType } from '@/types/todo';
import { axiosReq, endpoints } from '@/utils/axios';

export const getAllTodo = async () => {
  const url = BASE_API + endpoints.todo.root;
  const res = await axiosReq.get<TodoType[]>(url);

  return res;
};

export const createTodo = async (todo: TodoType) => {
  const url = BASE_API + endpoints.todo.root;
  const res = await axiosReq.post(url, todo);

  return res;
};

export const updateTodo = async (todo: TodoType) => {
  const { id, ...rest } = todo;
  const url = BASE_API + endpoints.todo.action(todo?.id || '');
  const res = await axiosReq.put(url, rest);

  return res;
};

export const deleteTodo = async (todoId: string) => {
  const url = BASE_API + endpoints.todo.action(todoId);
  const res = await axiosReq.delete(url);

  return res;
};
