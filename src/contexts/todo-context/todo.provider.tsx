'use client';

import { useEffect, useMemo, useState } from 'react';
import { TodoContext } from './todo-context';
import { FilterType, TodoType } from '@/types/todo';
import { FilterOptions } from '@/assets/data';
import { getAllTodo } from '@/api/todo';

type Props = {
  children: React.ReactNode;
};

export const TodoProvider = ({ children }: Props) => {
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [activeFilter, setActiveFilter] = useState(FilterOptions[0].value);
  const [showFilter, setShowFilter] = useState(false);

  const completedTasks = todoList.filter(todo => todo.completed).length;

  const progressInPercentageMemo = useMemo(
    () => Math.round((completedTasks / todoList.length) * 100) || 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todoList]
  );

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleSelectFilter = (filter: FilterType) => {
    setActiveFilter(filter);
    setShowFilter(false);
  };

  const filteredTodoList = useMemo(() => {
    switch (activeFilter) {
      case 'completed':
        return todoList.filter(todo => todo.completed);
      case 'active':
        return todoList.filter(todo => !todo.completed);
      default:
        return todoList;
    }
  }, [activeFilter, todoList]);

  const triggerFetchTodo = () => setTriggerFetch(true);

  const memoizedValue = useMemo(
    () => ({
      todoList,
      setTodoList,
      filteredTodoList,
      completedTasks,
      progressInPercentageMemo,
      activeFilter,
      setActiveFilter,
      showFilter,
      setShowFilter,
      toggleFilter,
      handleSelectFilter,
      triggerFetchTodo
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todoList, activeFilter, showFilter]
  );

  const handleGetTodoList = async () => {
    try {
      const res = await getAllTodo();
      if (Array.isArray(res)) {
        setTodoList(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (triggerFetch) {
      handleGetTodoList();
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  return (
    <TodoContext.Provider value={memoizedValue}>
      {children}
    </TodoContext.Provider>
  );
};
