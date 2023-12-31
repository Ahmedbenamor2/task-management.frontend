import "./App.css";
import FirstPage from "./components/FirstPage";
import HomePage from "./components/Home";
import Layout from "./components/Layout";
import Login, { action as loginAction } from "./login/Login";
import Signup, { action as signUpAction } from "./login/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import TasksPage from "./components/Tasks";
import AccountDetails from "./components/AccountDetails";
import TasksList from "./components/TasksList";
import { loader as tasksLoader } from "./loaders/tasksLoader";
import { loader as homeLoader } from "./loaders/homeLoader";
import { HoverProvider } from "./contexts/HoverContext";
//import AddProjectPopup from "./elements/AddProjectPopup";
import { action as addProjectAction } from './actions/addProject';
//import { LoadingProvider } from "./contexts/LoadingContext";
import ProjectPage from "./components/Project";
import { loader as projectLoader } from './loaders/projectLoader';
import AddTaskPopup from "./elements/AddTaskPopup";
import { action as addTaskAction } from './actions/addTask';
import { InfoProvider } from "./contexts/InfoContext";
import MainProject from "./elements/MainProject";
import {action as deleteAction} from './actions/deleteProject';
import TaskDetails from "./components/TaskDetails";
import ErrorPage from "./components/Error";
import {loader as taskLoader} from './loaders/taskLoader';
import {action as taskAction} from './actions/editDeleteTask';




const router = createBrowserRouter([
  {
    path: "/",errorElement:<ErrorPage/>, children: [
      { index: true, element: <FirstPage />},
      { path: "login", element: <Login />, action: loginAction },
      { path: "signup", element: <Signup />, action: signUpAction },
      {
        path: "home", element: <Layout />, loader: homeLoader, id: 'home', children: [
          {
            path: "", element: <HomePage />, children: [
              { path: ":projectId", element: <TasksList />, loader: tasksLoader, id: 'task-data' }
            ]
          },
          {
            path: "projects",element:<MainProject/>, children: [
              { index: true, element: <TasksPage />, action: addProjectAction },
              {
                path: ":projectId", element: <ProjectPage />, loader: projectLoader,action:deleteAction, children: [
                  { path: "add", element: <AddTaskPopup />, action: addTaskAction },
                  {path:":taskId",element:<TaskDetails/>,loader:taskLoader,action:taskAction}
                ]
              }
            ]
          },
          { path: "account", element: <AccountDetails /> },

        ]
      }
    ]
  },
]);

function App() {
  return <InfoProvider><HoverProvider><RouterProvider router={router} /></HoverProvider></InfoProvider>
}

export default App;
library.add(fab, fas, far);
