import LoginPage from "@/features/auth/pages/Login.page";
import DashboardPage from "@/features/dashboard/pages/Dashboard.page";
import OtherPage from "@/features/dashboard/pages/Other.page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedLayout, PublicLayout } from "./guards";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/other" element={<OtherPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
