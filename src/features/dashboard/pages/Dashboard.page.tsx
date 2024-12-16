import { Logout } from "@/features/auth/components/Logout";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <main className="h-screen w-full grid place-content-center gap-3">
      <h1>Dashboard.page</h1>
      <div>
        <Link to="/other" className="hover:underline hover:text-blue-500">
          ir a otra pagina
        </Link>
      </div>
      <Logout />
    </main>
  );
};

export default DashboardPage;
