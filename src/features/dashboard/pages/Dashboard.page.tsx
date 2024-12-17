import { RouterLink } from "@/components/router";
import { Logout } from "@/features/auth/components/Logout";

const DashboardPage = () => {
  return (
    <main className="h-screen w-full grid place-content-center gap-3">
      <h1>Dashboard.page</h1>
      <div>
        <RouterLink
          to="/other"
          expand="/123"
          className="hover:underline hover:text-blue-500"
        >
          ir a otra pagina
        </RouterLink>
      </div>
      <Logout />
    </main>
  );
};

export default DashboardPage;
