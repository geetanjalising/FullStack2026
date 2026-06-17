import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./Pages/Context/ContextProvider";

const ProtectedRoute = ({ children }) => {
    const { account } = useContext(LoginContext);

    if (!account) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;