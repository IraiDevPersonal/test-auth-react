import { RouterLink } from "@/components/router";
import { Logout } from "@/features/auth/components/Logout";
import { useParams } from "react-router-dom";

const OtherPage = () => {
  const { id } = useParams();
  return (
    <main className="h-screen w-full grid place-content-center gap-3">
      <h1>Other.page {id}</h1>
      <div>
        <RouterLink to="/" className="hover:underline hover:text-blue-500">
          ir a Dashboard
        </RouterLink>
      </div>
      <Logout />
    </main>
  );
};

export default OtherPage;
