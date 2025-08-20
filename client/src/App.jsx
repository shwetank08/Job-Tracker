import Header from './components/Header';
import {Outlet, useLocation} from 'react-router-dom'
const App = () => {

  const location = useLocation();

  const hidePaths = ['/signin', '/signup'];

  const shouldHeaderDisplay = !hidePaths.includes(location.pathname);

  return(
    <>
      {shouldHeaderDisplay && <Header/>}
      <Outlet/>
    </>
  )
}

export default App;