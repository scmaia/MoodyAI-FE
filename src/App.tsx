import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./contexts/user-context";
import { api } from "./utils/apiUtils";
import "./App.scss";
import Nav from "./Components/Nav/Nav";
import Main from "./pages/Main/Main";
import LogIn from "./pages/Users/LogIn";
import SignUp from "./pages/Users/SignUp";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({username: '', userId: ''});

  useEffect(() => {
    let token = sessionStorage.getItem('authToken');
    if (token) {
      api.getUser(token, onUserAPIResponse, onUserAPIError);
    } else {
      // server is pinged in case it is asleep due to inactivity
      api.ping();
    }
  }, [isLoggedIn]);

  const onUserAPIResponse = (apiResponse: any) => {
    setUser({ 
      username: apiResponse.username,
      userId: apiResponse.id,
    });
    setIsLoggedIn(true);
  };

  const onUserAPIError = (error: any) => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path='/login' element={<LogIn setUserLoggedIn={setIsLoggedIn} />} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/*' element={<p>Page not found</p>} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
