import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from "./components/loading/index.jsx";

const Overview = lazy(() => import("./pages/overview/index.jsx"));
const Usage = lazy(() => import("./pages/usage/index.jsx"));
const Plans = lazy(() => import("./pages/plans/index.jsx"));
const Support = lazy(() => import("./pages/support/index.jsx"));

const AppRoutes = ({ shared }) => {
  const location = useLocation();
  return (
    <Suspense key={location.pathname} fallback={<Loading />}>
      <Routes location={location}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<Overview {...shared} />} />
        <Route path="/usage" element={<Usage {...shared} />} />
        <Route path="/plans" element={<Plans {...shared} />} />
        <Route path="/support" element={<Support {...shared} />} />
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
