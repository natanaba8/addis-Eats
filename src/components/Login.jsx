import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from?.pathname || "/menu";

  function handleLogin() {
    login();
    navigate(destination, { replace: true });
  }

  return (
    <main>
      <h2>Sign in to continue</h2>
      <button onClick={handleLogin}>Continue as guest</button>
    </main>
  );
}

export default Login;