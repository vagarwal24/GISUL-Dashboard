import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import Index from "./router/index";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminLogin from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/ForgotPassword";

function App() {
  const data = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  return (
    <Router>
      <div className="grid grid-cols-10 gap-0 bg-gray-50">
        <div  className="grid col-span-2">
          {data !== null ? <Sidebar handleLogout={handleLogout} /> : null}
        </div>
    
          {data !== null ? (
            <>
             <div  className="grid col-span-8 mx-2 bg-gray-90 ">
              {/* <Search /> */}
              <Index />
              </div>
            </>
          ) : (
            <div  className="grid col-span-12 mx-2 bg-gray-90 ">
            <Routes >
              <Route path="/" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/*"
                element={<Link to="/" replace />}
              />
            </Routes>
            </div>
          )}
        
      </div>
    </Router>
  );
}

export default App;
