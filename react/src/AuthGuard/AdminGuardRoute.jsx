import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminGuardRoute = ({ component: Component }, ...rest) => {
    const isAdmin = useSelector((state) => state.admin.isAdmin);
    return (
        <Route
            {...rest}
            render={(props) => {
                return isAdmin === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                );

            }}
        />
    )
};

export default AdminGuardRoute;