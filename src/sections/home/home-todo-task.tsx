import { useContext } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import TodoCard from './home-todo-card';
import { TodoContext } from '@/contexts/todo-context';
import HomeTodoForm from './home-todo-form';
import { FilterOptions } from '@/assets/data';
import styles from './view/home-view.module.css';

const HomeTodoTask = () => {
  const {
    filteredTodoList,
    activeFilter,
    showFilter,
    toggleFilter,
    handleSelectFilter
  } = useContext(TodoContext);

  return (
    <div
      className={styles.task}
      style={{ overflowY: filteredTodoList.length >= 3 ? 'hidden' : 'visible' }}
    >
      <div className={styles.title}>
        <p>Tasks</p>

        <div>
          <button onClick={toggleFilter}>
            <p>
              {FilterOptions.find(option => option.value === activeFilter)
                ?.label || ''}
            </p>

            <span style={showFilter ? { transform: 'scaleY(-1)' } : undefined}>
              <FaChevronDown size={12} />
            </span>
          </button>

          {showFilter && (
            <div className={styles.filter}>
              {FilterOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectFilter(option.value)}
                  style={{
                    color:
                      option.value === activeFilter ? '#FFFFFF' : '#2E2E2E',
                    backgroundColor:
                      option.value === activeFilter ? '#585292' : '#FFFFFF'
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        className={styles.list}
        style={{
          overflowY: filteredTodoList.length >= 3 ? 'auto' : 'visible'
        }}
      >
        {filteredTodoList.map((todo, index) => (
          <TodoCard key={index} todo={todo} />
        ))}

        <HomeTodoForm />
      </div>
    </div>
  );
};

export default HomeTodoTask;
