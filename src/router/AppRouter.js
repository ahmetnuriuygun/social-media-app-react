import React from "react";
import { useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {LoginRegister} from "../Pages/LoginRegister";
import {Home} from "../Pages/Home";

const AppRouter = () => {
    const { currentUser } = useContext(AuthContext);
    function PrivateRouter() {
        return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/home" element={<PrivateRouter />}>
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;