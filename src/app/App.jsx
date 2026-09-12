import Router from "./routing/Router";
import TasksPage from "@/pages/TasksPage";
import TaskPage from "@/pages/TaskPage";
import "./styles";

const App = () => {
  const routes = {
    "/": TasksPage,
    "/tasks/:id": TaskPage,
    "*": () => <div>404 Page Not Found</div>,
  }
  
  return (
    <Router routes={routes} />
  );
};

export default App;
