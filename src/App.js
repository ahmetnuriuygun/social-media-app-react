import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from "./router/AppRouter";
import AuthContextProvider from "./context/AuthContext";
import CurrentUserContextProvider from "./context/CurrentUserContext";
import React, {useContext} from "react";
import {ThemeContext} from "./context/ThemeContext";


function App() {
  const [{theme,isDark},toggleTheme] = useContext(ThemeContext);
  console.log("theme",theme);
    return (
            <div className="App" style={{background:theme.backgroundColor,color:theme.color}}>
                <AuthContextProvider>
                    <CurrentUserContextProvider>
                        <AppRouter/>
                    </CurrentUserContextProvider>
                </AuthContextProvider>
            </div>

    );
}

export default App;
