import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Купить молоко", isDone: false },
    { id: 2, title: "Сделать домашку", isDone: true },
    { id: 3, title: "Погулять с собакой", isDone: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  const deleteAllTasks = () => {
    const isConfirmed = confirm("Are you sure you want to delete all?");

    if (isConfirmed) {
      setTasks([]);
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isDone };
        }

        return task;
      }),
    );
  };

  const filterTasks = (query) => {
    console.log(`Поиск: ${query}`);
  };

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />
      <SearchTaskForm onSearchInput={filterTasks} />
      <TodoInfo
        totalTasks={tasks.length}
        doneTasks={tasks.filter((task) => task.isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <TodoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskComleteChange={toggleTaskComplete}
      />
    </div>
  );
};

export default Todo;
