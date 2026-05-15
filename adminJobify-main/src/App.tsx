import { useEffect, useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  const [isAuth, setIsAuth] =
    useState(false);

  useEffect(() => {
    const auth = localStorage.getItem(
      "admin-auth"
    );

    if (auth === "true") {
      setIsAuth(true);
    }
  }, []);

  return (
    <>
      {isAuth ? (
        <AdminDashboard />
      ) : (
        <AdminLogin
          onLogin={() => setIsAuth(true)}
        />
      )}
    </>
  );
}

export default App;