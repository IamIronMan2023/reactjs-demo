import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import EmployeeEdit from "./pages/Employee/EmployeeEdit";
import EmployeeList from "./pages/Employee/EmployeeList";
import EmployeeView from "./pages/Employee/EmployeeView";
import EmployeeCreate from "./pages/Employee/EmployeeCreate";
import Login from "./pages/Login/Login";
import AuthProvider from "./contexts/AuthContext";
import SecureRoute from "./SecureRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<SecureRoute />}>
            <Route path="/" element={<EmployeeList />}></Route>
            <Route path="/employee/:id" element={<EmployeeView />}></Route>
            <Route path="/employee/edit/:id" element={<EmployeeEdit />}></Route>
            <Route path="/employee/new" element={<EmployeeCreate />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
