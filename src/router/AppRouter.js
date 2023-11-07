import React from "react";
import {useContext} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    Navigate,
} from "react-router-dom";
import {LoginRegister} from "../Pages/LoginRegister";
import {Home} from "../Pages/Home";
import {Settings} from "../Pages/Settings";
import {Discover} from "../Pages/Discover";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {Profile} from "../Pages/Profile";
import {Search} from "../Pages/Search";

const AppRouter = () => {
    const currentUser = useContext(CurrentUserContext)

    function PrivateRouter() {
        return currentUser ? <Outlet/> : <Navigate to="/home" replace/>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginRegister/>}/>

                <Route path="/home" element={<PrivateRouter/>}>
                    <Route path="/home" element={<Home/>}/>
                </Route>

                <Route path="/search/:value" element={<PrivateRouter/>}>
                    <Route path="/search/:value" element={<Search/>}/>
                </Route>

                <Route path="/settings/:id" element={<PrivateRouter/>}>
                    <Route path="/settings/:id" element={<Settings/>}/>
                </Route>

                <Route path="/discover" element={<PrivateRouter/>}>
                    <Route path="/discover" element={<Discover/>}/>
                </Route>

                <Route path="/profile/:id" element={<PrivateRouter/>}>
                    <Route path="/profile/:id" element={<Profile/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;