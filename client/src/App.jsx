import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 

import Layout from "./components/Layout"; 

import Login from "./pages/Login"; 
import Signup from "./pages/Signup"; 
import Dashboard from "./pages/Dashboard"; 
import CreateCourse from "./pages/CreateCourse"; 
import Students from "./pages/Students"; 
import StudentsInCourse from "./pages/StudentsInCourse"; 

function PrivateRoute({ children }) { 
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" />; 
} 

export default function App() { 
  return ( 
    <BrowserRouter> 
      <Routes> 
        
        {/* Layout wrapper */} 
        <Route path="/" element={<Layout />}> 
        
        {/* Public routes */} 
        <Route path="login" element={<Login />} /> 
        <Route path="signup" element={<Signup />} /> 
        
        {/* Private routes */} 
        <Route 
          path="dashboard" 
          element={ 
            <PrivateRoute>
               <Dashboard /> 
            </PrivateRoute> 
          } 
        /> 
        
        <Route 
          path="create-course" 
          element={ 
            <PrivateRoute> 
              <CreateCourse /> 
            </PrivateRoute> 
          } 
        /> 
        
        <Route 
          path="students" 
          element={ 
            <PrivateRoute> 
              <Students />
            </PrivateRoute>
            } 
          /> 
          
          <Route 
            path="students-in-course" 
            element={ 
              <PrivateRoute> 
                <StudentsInCourse /> 
              </PrivateRoute> 
            } 
          /> 
          
          {/* Default route */} 
          <Route path="*" element={<Navigate to="/login" />} /> 
          
        </Route> 
        
      </Routes> 
      
    </BrowserRouter> 
  ); 
}