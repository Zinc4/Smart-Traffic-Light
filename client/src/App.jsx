import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import HospitalList from "./components/HospitalList";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import EmailVerify from "./pages/EmailVerify";

function App() {
  const user = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        {user && (
          <Route path="app" element={<AppLayout />}>
            <Route path="rs" element={<HospitalList />} />
          </Route>
        )}
        <Route path="admin" element={<Admin />} />
        <Route path="users/:id/verify/:token" element={<EmailVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
