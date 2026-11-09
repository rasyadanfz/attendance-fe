import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className="flex grow self-stretch">
      <div className="shrink min-w-50 pt-4">
        <Navbar />
      </div>
      <div className="grow px-6 bg-[#F5F5F5] pt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedLayout;
