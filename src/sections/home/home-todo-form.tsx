import { TodoContext } from '@/contexts/todo-context';
import { useContext, useState } from 'react';
import styles from './view/home-view.module.css';
import { v4 as uuid } from 'uuid';
import { createTodo, updateTodo } from '@/api/todo';
import { TodoType } from '@/types/todo';

type Props = {
  showButton?: boolean;
  initialTask?: TodoType;
  callback?: () => void;
};

const HomeTodoForm = ({ showButton, initialTask, callback }: Props) => {
  const { triggerFetchTodo } = useContext(TodoContext);

  const [task, setTask] = useState(initialTask?.title);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!task) return;
    if (initialTask?.id) {
      await updateTodo({ ...initialTask, title: task });
      triggerFetchTodo();
      if (callback) callback();
    } else {
      const taskData = { id: uuid(), title: task, completed: false };
      await createTodo(taskData);
      triggerFetchTodo();
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={task}
        onChange={ev => setTask(ev.target.value)}
        placeholder='Add your todo...'
        type='text'
      />

      {showButton && <button type='submit'>Save</button>}
    </form>
  );
};

export default HomeTodoForm;
