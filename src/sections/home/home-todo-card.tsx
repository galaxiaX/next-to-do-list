import { TodoContext } from '@/contexts/todo-context';
import { TodoType } from '@/types/todo';
import { useContext, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { MdMoreHoriz } from 'react-icons/md';
import HomeTodoForm from './home-todo-form';
import styles from './view/home-view.module.css';
import { deleteTodo, updateTodo } from '@/api/todo';

type Props = {
  todo: TodoType;
};

const TodoCard = ({ todo }: Props) => {
  const { triggerFetchTodo } = useContext(TodoContext);

  const [showEditTask, setShowEditTask] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => setShowOptions(!showOptions);
  const closeOptions = () => setShowOptions(false);

  const closeEditTask = () => setShowEditTask(false);

  const handleCheckTask = async () => {
    try {
      await updateTodo({ ...todo, completed: !todo.completed });
      triggerFetchTodo();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTodo(todo.id);
      triggerFetchTodo();
      closeOptions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = () => {
    setShowEditTask(true);
    closeOptions();
  };

  return (
    <>
      {showEditTask ? (
        <HomeTodoForm showButton initialTask={todo} callback={closeEditTask} />
      ) : (
        <div className={styles.card}>
          <div>
            <button
              onClick={handleCheckTask}
              style={{
                backgroundColor: todo.completed ? '#585292' : '#FFFFFF'
              }}
            >
              <IoMdCheckmark color='#FFFFFF' />
            </button>

            <p
              style={{
                color: todo.completed ? '#A9A9A9' : '#2E2E2E',
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
            >
              {todo.title}
            </p>
          </div>

          <div className={styles.more}>
            <button onClick={toggleOptions}>
              <MdMoreHoriz />
            </button>

            {showOptions && (
              <div>
                <button onClick={handleEditTask}>Edit</button>
                <button onClick={handleDeleteTask}>Delete</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TodoCard;
