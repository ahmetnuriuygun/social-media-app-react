import React from "react";
import { useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import {LoginRegister} from "../Pages/LoginRegister";
import {Home} from "../Pages/Home";
import {POSTS_DATA, USER_DATA} from "../data/data";
import {Settings} from "../Pages/Settings";
import {Discover} from "../Pages/Discover";
import {CurrentUserContext} from "../context/CurrentUserContext";

const AppRouter = () => {
    const currentUser = useContext(CurrentUserContext)
    function PrivateRouter() {
        return currentUser ? <Outlet /> : <Navigate to="/home" replace />;
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/home" element={<PrivateRouter />}>
                    <Route path="/home" element={<Home posts={POSTS_DATA} users={USER_DATA} />} />
                </Route>
                <Route path="/settings" element={<PrivateRouter />}>
                    <Route path="/settings" element={<Settings />}/>
                </Route>
                <Route path="/discover" element={<PrivateRouter />}>
                    <Route path="/discover" element={<Discover />}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;