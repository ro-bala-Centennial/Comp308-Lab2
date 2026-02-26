import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentsInCourse from "./pages/StudentsInCourse";
import CreateCourse from "./pages/CreateCourse";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students-in-course" element={<StudentsInCourse />} />
        <Route path="/create-course" element={<CreateCourse />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;