import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css'; // For Ant Design v5+
import HomePage from './pages/HomePage';
import Login  from './pages/Login.js';
import Register from './pages/Register.js';
import  {useSelector} from 'react-redux';
import  {Spinner}  from 'react-bootstrap';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import  {ApplyDoctor}  from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import '@ant-design/v5-patch-for-react-19';
import  Users  from './pages/admin/Users';
import  {Doctors}  from './pages/admin/Doctors';

function App() {
  const loading = useSelector(state => state.alert?.loading);

  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/apply-doctor" 
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admin/user" 
              element={
                <ProtectedRoute>
                  <Users></Users>
                </ProtectedRoute>
              } 
            />

             <Route 
              path="/admin/doctors" 
              element={
                <ProtectedRoute>
                  <Doctors></Doctors>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />

            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />

            <Route 
              path="/notification" 
              element={
                <ProtectedRoute>
                  <NotificationPage></NotificationPage>
                </ProtectedRoute>
              } 
            />


          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
