import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppRouter from "./router/AppRouter";
import AuthContextProvider from "./context/AuthContext";


function App() {
    return (
        <div className="App">
            <AuthContextProvider>
                <AppRouter/>
            </AuthContextProvider>
        </div>
    );
}

export default App;
