import AuthProvider from './hoc/AuthProvider'
import RoutesProvider from './hoc/RoutesProvider'

export default function App() {
  return (
    <AuthProvider>
      <RoutesProvider></RoutesProvider>
    </AuthProvider>
    
  )
}
