import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="h-screen flex justify-center items-center relative">
      <Outlet />
    </div>
  );
}

export default RootLayout;
