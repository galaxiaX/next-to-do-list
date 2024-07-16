'use client';

import HomeTodoTask from '../home-todo-task';
import HomeTodoProgress from '../home-todo-progress';
import styles from './home-view.module.css';

const HomeView = () => {
  return (
    <main className={styles.main}>
      <section>
        <HomeTodoProgress />
        <HomeTodoTask />
      </section>
    </main>
  );
};

export default HomeView;
