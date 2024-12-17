import { Notification } from "@/components/ui/Notification";
import { AuthProvider } from "@/features/auth/context/Auth.provider";
import { AppRoutes } from "@/routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Notification />
    </AuthProvider>
  );
}

export default App;
