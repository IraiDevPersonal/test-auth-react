import { Toaster } from "sonner";
import { AuthProvider } from "./features/auth/context/Auth.provider";
import { AppRoutes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
