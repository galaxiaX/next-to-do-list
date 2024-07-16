import { TodoContext } from '@/contexts/todo-context';
import { useContext } from 'react';
import styles from './view/home-view.module.css';

const HomeTodoProgress = () => {
  const { completedTasks, progressInPercentageMemo } = useContext(TodoContext);

  return (
    <div className={styles.progress}>
      <p>Progress</p>

      <div>
        <div style={{ width: `${progressInPercentageMemo}%` }}></div>
      </div>

      <span>{completedTasks.toLocaleString()} completed</span>
    </div>
  );
};

export default HomeTodoProgress;
