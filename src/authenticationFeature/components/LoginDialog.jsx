import { useState } from "react";
import { useLogin } from "../useCases/useLogin";
import { useNavigate } from "react-router";
import { FaUser, FaLock } from "react-icons/fa";

const LoginDialog = () => {
  const login = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const result = await login(email, password);

    setIsLoading(false);
    if (result.success) {
      navigate("/"); // Close the dialog on successful login
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-700">Login</h2>
          <button
            onClick={()=>navigate("/")}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className={`w-full rounded-md py-2 text-white transition ${isLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <a
            href="/signup"
            className="block text-center text-sm text-blue-500 hover:underline"
          >
            Create an Account
          </a>

          <img
            src="https://user63758.clients-cdnnow.ru/storage/4482/7776/f7b04791530509.5e34000ec7162.png"
            alt="logo"
            className="mx-auto mt-4 h-14 w-14 object-contain"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;

