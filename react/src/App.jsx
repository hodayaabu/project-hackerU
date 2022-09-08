import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

//Components
import Navigator from './components/Navigator';
import Footer from "./components/Footer";

//Guards
import AuthGuardRoute from "./AuthGuard/AuthGuardRoute";
import AdminGuardRoute from "./AuthGuard/AdminGuardRoute";

//Pages
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import UpdatePwd from "./pages/UpdatePwd";
import Signup from "./pages/Signup";
import Home from './pages/Home';
import AllCards from "./pages/Cards/AllCards";
import MyCards from "./pages/Cards/MyCards";
import AddCard from "./pages/Cards/AddCard";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import FavoriteCards from "./pages/FavoriteCards";

const App = () => {
  return (
    <Router>
      <Navigator />
      <ToastContainer />
      <main>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/updatePwd' exact component={UpdatePwd} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/' exact component={Home} />
          <Route path='/cards' exact component={AllCards} />
          <AuthGuardRoute path='/myCards' exact component={MyCards} />
          <AuthGuardRoute path='/addCard' exact component={AddCard} />
          <Route path='/contact' exact component={Contact} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/favorite' exact component={FavoriteCards} />
          <AdminGuardRoute path='/users' exact component={Users} />
          <Redirect to='/' />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
