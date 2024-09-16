import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoginContext } from "../../context/LoginContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const context = useContext(LoginContext);
    const location = useLocation();

    if(!context || context.login !== "logado") {
        return <Navigate to={'/login'} state={{ from: location}} replace/>
    }

    return <>{children}</>
}