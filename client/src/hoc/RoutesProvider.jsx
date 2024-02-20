import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import ChatPage from '../components/chat/chatPage'
import LoginPage from '../components/auth/loginPage'
import SignUpPage from '../components/auth/signUpPage'
import EditPage from '../components/edit/editPage'
import RequireAuth from './RequireAuth'
export default function RoutesProvider({children}) {
  const routes = <>
                    <Route path='/' element={<Navigate to='/login' replace/>}></Route>
                    <Route path='/login' element={<LoginPage/>}></Route>
                    <Route path='/signup' element={<SignUpPage/>}></Route>
                    <Route path='/chat' element={
                      <RequireAuth>
                        <ChatPage/>
                      </RequireAuth>
                    }>
                    </Route>
                    <Route path='/edit' element={
                      <RequireAuth>
                        <EditPage/>
                      </RequireAuth>
                    }>
                    </Route>
                </>
  const router = createBrowserRouter(createRoutesFromElements(routes))
  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  )
}
