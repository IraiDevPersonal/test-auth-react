import AuthProvider from "@/features/auth/stores/AuthProvider";
import { Notification } from "@/components/ui/Notification";
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
