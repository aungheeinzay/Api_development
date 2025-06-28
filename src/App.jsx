import {createBrowserRouter,BrowserRouter,RouterProvider} from 'react-router-dom'
import Main from './layout/Main';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Index from './pages/Index';
import Details from './pages/Details';

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
        element:<Create/>
      },
      {
        path:"/edit/:id",
        element:<Edit/>
      },
      {
        path:"/details/:id",
        element:<Details/>
      }
      
    ]
  }])
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
