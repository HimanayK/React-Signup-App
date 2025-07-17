import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router'
import Signup from './components/Signup/Signup.jsx'
import RootLayout from './layout/RootLayout.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Login from './components/Login/Login.jsx'
import { ToastContainer} from 'react-toastify'


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout/>}>
        <Route index element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
      </Route>
    )
  )
  return (
    <>
    <RouterProvider router={router} />
     <ToastContainer position="top-center" />
    </>
    
  )
}

export default App
