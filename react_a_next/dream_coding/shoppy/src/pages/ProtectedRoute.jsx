import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContext";

export default function ProtectedRoute({ children, requiredAdmin }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  if (!user || (requiredAdmin && !user.isAdmin)) {
    navigate("/", { replace: true });
    return;
  }

  return children;
}
