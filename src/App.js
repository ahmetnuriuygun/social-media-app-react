import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import AppRouter from "./router/AppRouter";
import CurrentUserContextProvider from "./context/CurrentUserContext";
import React, {useContext} from "react";
import {ThemeContext} from "./context/ThemeContext";
import UsersProvider from "./context/UsersContext";
import PostsProvider from "./context/PostsContext";


function App() {
  const [{theme,isDark},toggleTheme] = useContext(ThemeContext);

  console.log("theme",theme);
    return (
            <div className="App" style={{background:theme.backgroundColor,color:theme.color}}>
                    <UsersProvider>
                        <PostsProvider>
                            <CurrentUserContextProvider>
                                <AppRouter/>
                            </CurrentUserContextProvider>
                        </PostsProvider>
                    </UsersProvider>
            </div>

    );
}

export default App;
