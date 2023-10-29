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
import {POSTS_DATA, USER_DATA} from "../data/data";
import {Settings} from "../Pages/Settings";

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
                    <Route path="/home" element={<Home posts={POSTS_DATA} users={USER_DATA} />} />
                </Route>
                <Route path="/settings" element={<PrivateRouter />}>
                    <Route path="/settings" element={<Settings users={USER_DATA}/>}/>
                </Route>
                <Route path="/discover" element={<PrivateRouter />}>
                    <Route path="/discover" element={<Settings users={USER_DATA}/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;