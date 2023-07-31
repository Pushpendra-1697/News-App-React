import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import PrivateRoute from '../Components/PrivateRoute';
import Everything from '../Components/Everything';
import TopHeadlines from '../Components/TopHeadlines';

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }></Route>
        <Route path='/every' element={<Everything />}></Route>
        <Route path='/tophead' element={<TopHeadlines />}></Route>
      </Routes>
    </div>
  );
}

export default AllRoutes;
