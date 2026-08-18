const TodoInfo = (props) => {
  const { totalTasks = 0, doneTasks = 0, onDeleteAllButtonClick } = props;

  const hasTasks = totalTasks > 0;

  return (
    <div className="todo__info">
      <div className="todo__total-tasks">
        Done {doneTasks} from {totalTasks}
      </div>
      {hasTasks && (
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={onDeleteAllButtonClick}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default TodoInfo;
