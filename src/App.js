import './App.css';
import {Route, Routes} from "react-router";
import UsersList from "./Pages/UsersList/UsersList";
import User from "./Pages/User/User";
import Auth from "./Pages/Auth/Auth";
import Notfound from "./Pages/Notfound/Notfound";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="userslist" element={<UsersList />} />
                <Route path="user/:id" element={<User />} />
                <Route path="notfound" element={<Notfound />} />
            </Routes>
    </div>
  );
}

export default App;
