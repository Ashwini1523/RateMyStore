import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import StoreList from "./components/StoreList";
import AdminDashboard from "./components/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";
import StoreDashboard from "./components/StoreDashboard";
import Home from './pages/Home'
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/stores" element={<StoreList />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/sown" element={<StoreDashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
