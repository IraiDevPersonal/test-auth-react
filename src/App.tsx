import { AuthProvider } from "./features/auth/context/Auth.provider";
import { AppRoutes } from "./routes";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
