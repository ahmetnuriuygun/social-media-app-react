import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import AppRouter from "./router/AppRouter";
import CurrentUserContextProvider from "./context/CurrentUserContext";
import React, {useContext} from "react";
import {ThemeContext} from "./context/ThemeContext";
import UsersProvider from "./context/UsersContext";
import PostsProvider from "./context/PostsContext";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



function App() {
  const [{theme}] = useContext(ThemeContext);

    return (
            <div className="App" style={{background:theme.backgroundColor,color:theme.color}}>
                    <UsersProvider>
                        <PostsProvider>
                            <CurrentUserContextProvider>
                                <AppRouter/>
                                <ToastContainer/>
                            </CurrentUserContextProvider>
                        </PostsProvider>
                    </UsersProvider>
            </div>

    );
}

export default App;
