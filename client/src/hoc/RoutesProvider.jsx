import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import Login from '../components/login/login'
import ChatPage from '../components/chat/chatPage'
export default function RoutesProvider({children}) {
  const routes = <>
                  <Route path='/' element={<Navigate to='/login' replace/>}></Route>
                  <Route path='/login' element={<Login/>}></Route>
                  <Route path='/chat' element={<ChatPage/>}></Route>
                </>
  const router = createBrowserRouter(createRoutesFromElements(routes))
  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  )
}
