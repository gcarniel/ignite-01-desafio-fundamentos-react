import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PlusCircle, Question } from 'phosphor-react';

import { Header } from './components/Header';
import { Item, List } from './components/List';
import { ListEmpty } from './components/ListEmpty';
import { ListHeader } from './components/ListHeader';

import styles from './App.module.css';
import './globals.css';

export function App() {
  const [todo, setTodo] = useState<Item[]>([]);
  const [newTask, setNewTask] = useState('');
  const readedTasks = todo.filter((item) => item?.readAt).length;

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const existsTask = checkIfTheTaskExists(newTask);

    if (existsTask) {
      const result = confirm(
        'Já existe uma tarefa com essa descrição, deseja continuar?',
      );

      if (!result) {
        setNewTask('');
      }
    }

    const task = {
      id: uuidv4(),
      description: newTask,
      readAt: null,
    };

    setTodo([...todo, task]);
    setNewTask('');
  }

  function handleChangeTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleDeleteTask(taskId: string) {
    const tasksWithoutDeleted = todo.filter((task) => task.id !== taskId);
    setTodo(tasksWithoutDeleted);
  }

  function handleToggleTask(taskId: string) {
    const tasks = todo.map((task) => {
      if (task.id === taskId) {
        return { ...task, readAt: task.readAt ? null : new Date() };
      }
      return task;
    });
    setTodo(tasks);
  }

  function updateTasksInLocalStorage() {
    localStorage.setItem('todo-ignite', JSON.stringify(todo));
  }

  function checkIfTheTaskExists(description: string) {
    return todo?.some(
      (task) => task.description.toLowerCase() === description.toLowerCase(),
    );
  }

  useEffect(() => {
    const todoLocal = localStorage.getItem('todo-ignite');

    if (!todoLocal) return;
    setTodo(JSON.parse(todoLocal));
  }, []);

  useEffect(() => {
    if (!todo.length) return;
    updateTasksInLocalStorage();
  }, [todo]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <form className={styles.addTask} onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={newTask}
            onChange={handleChangeTask}
            required
          />
          <button type="submit">
            Criar
            <PlusCircle size={22} />
          </button>
        </form>

        <div className={styles.list}>
          <ListHeader tasks={todo.length} read={readedTasks} />
          {todo.length > 0 ? (
            <List
              items={todo}
              onDelete={handleDeleteTask}
              onToggle={handleToggleTask}
            />
          ) : (
            <ListEmpty />
          )}
        </div>
      </main>
    </div>
  );
}
