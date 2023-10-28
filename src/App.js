import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from "./router/AppRouter";
import AuthContextProvider from "./context/AuthContext";
import CurrentUserContextProvider from "./context/CurrentUserContext";


function App() {
    return (
        <div className="App">
            <AuthContextProvider>
                <CurrentUserContextProvider>
                    <AppRouter/>
                </CurrentUserContextProvider>
            </AuthContextProvider>
        </div>
    );
}

export default App;
