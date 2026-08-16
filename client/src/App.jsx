import HomePage from "./pages/HomePage/HomePage";

function App() {
  /*
    Temporary user value.

    null = guest/not logged in.

    Eventually the authentication system will provide the actual user.
  */
  const currentUser = null;

  function handleSignOut() {
    console.log("Sign out will be connected to authentication later.");
  }

  return (
    <HomePage
      user={currentUser}
      onSignOut={handleSignOut}
    />
  );
}

export default App;