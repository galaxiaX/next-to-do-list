'use client';

import { FilterType, TodoType } from '@/types/todo';
import { createContext } from 'react';

type TodoContextProps = {
  todoList: TodoType[];
  setTodoList: (todoList: TodoType[]) => void;
  filteredTodoList: TodoType[];
  completedTasks: number;
  progressInPercentageMemo: number;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  showFilter: boolean;
  setShowFilter: (showFilter: boolean) => void;
  toggleFilter: () => void;
  handleSelectFilter: (filter: FilterType) => void;
  triggerFetchTodo: () => void;
};

export const TodoContext = createContext({} as TodoContextProps);
