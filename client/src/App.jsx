import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage/HomePage";
import AccountPage from "./pages/AccountPage/AccountPage";

import {
  getCurrentUser,
  logoutUser,
} from "./services/authService";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function restoreSession() {
      try {
        const data = await getCurrentUser();

        setCurrentUser(data.user);
      } catch {
        setCurrentUser(null);
      }
    }

    restoreSession();
  }, []);

  async function handleSignOut() {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    } finally {
      setCurrentUser(null);

      window.location.assign("/");
    }
  }

  const currentPath = window.location.pathname;

  if (currentPath === "/account") {
    return (
      <AccountPage
        user={currentUser}
        onAuthenticated={setCurrentUser}
        onSignOut={handleSignOut}
      />
    );
  }

  return (
    <HomePage
      user={currentUser}
      onSignOut={handleSignOut}
    />
  );
}

export default App;