import {createBrowserRouter,BrowserRouter,RouterProvider} from 'react-router-dom'
import Main from './layout/Main';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Index from './pages/Index';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import isLogin from './utils/isLogin';

const App = () => {
  const router = createBrowserRouter([{
    path:"/",
    element:<Main/>,
    children:[
      {
        index:true,
        element:<Index/>
      },
      {
        path:"/create",
        element:<Create/>,
        loader:isLogin
      },
      {
        path:"/edit/:noteId",
        element:<Edit/>,
        loader:isLogin
      },
      {
        path:"/details/:noteId",
        element:<Details/>,
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/login",
        element:<Login/>
      }
      
    ]
  }])
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
