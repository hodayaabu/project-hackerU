import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuardRoute = ({ component: Component }, ...rest) => {

    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const isLoggedIn = localStorage.getItem('loggedIn');

    return (
        <Route
            {...rest}
            render={(props) => {
                return loggedIn || isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                );

            }}
        />
    )
};

export default AuthGuardRoute;