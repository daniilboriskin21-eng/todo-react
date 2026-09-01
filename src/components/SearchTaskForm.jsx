import Field from "./Field";

const SearchTaskForm = (props) => {
  const { searchQuery, setSearchQuery } = props;

  return (
    <form className="todo__form">
      <Field
        className="todo__field"
        label="Search task"
        id="search-task"
        type="search"
        value={searchQuery}
        onInput={(event) => setSearchQuery(event.target.value)}
      />
    </form>
  );
};

export default SearchTaskForm;
