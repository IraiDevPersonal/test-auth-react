import { Logout } from "@/features/auth/components/Logout";
import { Link } from "react-router-dom";

const OtherPage = () => {
  return (
    <main className="h-screen w-full grid place-content-center gap-3">
      <h1>Other.page</h1>
      <div>
        <Link to="/" className="hover:underline hover:text-blue-500">
          ir a Dashboard
        </Link>
      </div>
      <Logout />
    </main>
  );
};

export default OtherPage;
