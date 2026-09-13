import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    filteredTasks,
    deleteTask,
    toggleTaskComplete,
    deleteAllTasks,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    disapearingTaskId,
    apearingTaskId,
  } = useTasks();

  const { firstIncompleteTaskId, firstIncompleteTaskRef } =
    useIncompleteTaskScroll(tasks);

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      deleteTask,
      toggleTaskComplete,
      deleteAllTasks,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disapearingTaskId,
      apearingTaskId,
      firstIncompleteTaskId,
      firstIncompleteTaskRef,
    }),
    [
      tasks,
      filteredTasks,
      deleteTask,
      toggleTaskComplete,
      deleteAllTasks,
      newTaskTitle,
      setNewTaskTitle,
      searchQuery,
      setSearchQuery,
      newTaskInputRef,
      addTask,
      disapearingTaskId,
      apearingTaskId,
      firstIncompleteTaskId,
      firstIncompleteTaskRef,
    ],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
