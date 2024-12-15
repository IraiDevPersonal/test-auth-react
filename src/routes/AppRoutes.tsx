import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PublicLayout, ProtectedLayout } from ".";
import { AuthValidationLayout } from "./AuthValidationLayout";
import { LocalStorageAdapter } from "@/config/local-storage.adapter";
import { Suspense } from "react";
import { AuthService } from "@/features/auth/services/auth.service";
import { AuthFallback } from "@/features/auth/components/AuthFallback";
import LoginPage from "@/features/auth/pages/Login.page";
import DashboardPage from "@/features/dashboard/pages/Dashboard.page";
import OtherPage from "@/features/dashboard/pages/Other.page";

const ls = new LocalStorageAdapter("token");
const authService = new AuthService(ls);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<AuthFallback />}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthValidationLayout renewUser={authService.renewUser()} />
            }
          >
            {/* PUBLIC ROUTES */}
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            {/* PROTECTED ROUTES */}
            <Route element={<ProtectedLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/other" element={<OtherPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
