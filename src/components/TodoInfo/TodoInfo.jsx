import { memo, useContext, useMemo } from "react";
import { TasksContext } from "../../context/TasksContext";

const TodoInfo = (props) => {
  const {styles} = props;
  const { tasks, deleteAllTasks } = useContext(TasksContext);

  const totalTasks = tasks.length;
  const hasTasks = totalTasks > 0;

  const doneTasksCount = useMemo(() => {
    return tasks.filter((task) => task.isDone).length;
  }, [tasks]);

  return (
    <div className={styles.info}>
      <div className={styles.totalTasks}>
        Done {doneTasksCount} from {totalTasks}
      </div>
      {hasTasks && (
        <button
          className={styles.deleteAllButton}
          type="button"
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
