import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Container from 'react-bootstrap/Container';

//Components
import MainNavigator from './components/MainNavigator';
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
import AllProducts from "./pages/Products/AllProducts";
import MyProducts from "./pages/Products/MyProducts";
import AddProduct from "./pages/Products/AddProduct";
import Sport from "./pages/Products/Types/Sport";
import Electronics from "./pages/Products/Types/Electronics";
import Fashion from "./pages/Products/Types/Fashion";
import Furniture from "./pages/Products/Types/Furniture";
import Other from "./pages/Products/Types/Other";
import Contact from "./pages/Contact";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import FavoriteProducts from "./pages/FavoriteProducts";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <Router>
      <MainNavigator />
      <ToastContainer />
      <Container>
        <main>
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/updatePwd' exact component={UpdatePwd} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/' exact component={Home} />
            <Route path='/products' exact component={AllProducts} />
            <Route path='/sport' exact component={Sport} />
            <Route path='/electronics' exact component={Electronics} />
            <Route path='/fashion' exact component={Fashion} />
            <Route path='/furniture' exact component={Furniture} />
            <Route path='/other' exact component={Other} />
            <AuthGuardRoute path='/myProducts' exact component={MyProducts} />
            <AuthGuardRoute path='/addProduct' exact component={AddProduct} />
            <Route path='/contact' exact component={Contact} />
            <AuthGuardRoute path='/profile' exact component={Profile} />
            <AuthGuardRoute path='/favorite' exact component={FavoriteProducts} />
            <AdminGuardRoute path='/users' exact component={Users} />
            <Route path='/privacyPolicy' exact component={PrivacyPolicy} />
            <Redirect to='/' />
          </Switch>
        </main>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
