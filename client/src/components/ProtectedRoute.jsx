import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'

const ProtectedRoute = () => {
    const {user, loading} = useAuth();

  if(loading){
    return <div>Loading...</div>
  }

  if(!user){
    return <Navigate to="/signin" replace/>
  }

  return <Outlet/>
}

export default ProtectedRoute