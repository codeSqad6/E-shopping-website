// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isAuth = useSelector((state) => state.auth.isAuthenticated);
//   return isAuth ? children : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const isAuth = useSelector((state) => state.auth.isAuthenticated);
//   return isAuth ? children : <Navigate to="/login" replace />;
// }
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return isAuth ? children : <Navigate to="/login" replace />;
}
