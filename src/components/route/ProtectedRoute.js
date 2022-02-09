// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
//   return (
//     <>
//       {loading === false && (
//         <Routes>
//           <Route
//             {...rest}
//             render={(props) => {
//               if (isAuthenticated === false) {
//                 return <Navigate to="/login" />;
//               }
//               return <Component {...props} />;
//             }}
//           />
//         </Routes>
//       )}
//     </>
//   );
// };

// export default ProtectedRoute;

import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/userActions";

const ProtectedRoute = ({ children, isAdmin }) => {
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, loading]);

  if (loading) return <h1>loading...</h1>;

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
