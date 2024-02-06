import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import ChatPage from '../components/chat/chatPage'
import LoginPage from '../components/auth/loginPage'
export default function RoutesProvider({children}) {
  const routes = <>
                  <Route path='/' element={<Navigate to='/login' replace/>}></Route>
                  <Route path='/login' element={<LoginPage/>}></Route>
                  <Route path='/chat' element={<ChatPage/>}></Route>
                </>
  const router = createBrowserRouter(createRoutesFromElements(routes))
  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  )
}
