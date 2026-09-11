import { useCallback, useRef, useState, useEffect, useMemo } from "react";
import tasksAPI from "../api/tasksAPI";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [disapearingTaskId, setDisapearingTaskId] = useState(null);
  const [apearingTaskId, setApearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all?");

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks).then(() => {
        setTasks([]);
      });
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId).then(() => {
        setDisapearingTaskId(taskId);
        setTimeout(() => {
          setTasks(tasks.filter((task) => task.id !== taskId));
          setDisapearingTaskId(null);
        }, 400);
      });
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone).then(() => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, isDone };
            }

            return task;
          }),
        );
      });
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask).then((addedTask) => {
      setTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTaskTitle("");
      setSearchQuery("");
      newTaskInputRef.current.focus();
      setApearingTaskId(addedTask.id);
      setTimeout(() => {
        setApearingTaskId(null);
      }, 400);
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI.getAll().then(setTasks);
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchQuery),
        )
      : null;
  }, [tasks, searchQuery]);

  return {
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
  };
};

export default useTasks;
