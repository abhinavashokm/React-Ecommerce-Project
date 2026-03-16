import { useLocation } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundar";

export const RouteErrorBoundary = ({children, global=false}) => {
    const location = useLocation()
    return(
        <ErrorBoundary key={location.pathname} global={global}>
            {children}
        </ErrorBoundary>
    )
}