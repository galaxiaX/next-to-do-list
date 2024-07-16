export type TodoType = {
  id: string;
  title: string;
  completed: boolean;
};

export type FilterType = 'all' | 'completed' | 'active';

export type FilterOptionsType = { label: string; value: FilterType };
