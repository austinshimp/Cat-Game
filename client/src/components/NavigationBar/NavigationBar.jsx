import "./NavigationBar.css";

function NavigationBar({
  user = null,
  onSignOut = () => {},
}) {
  return (
    <header className="navigation-bar">
      <a href="/" className="nav-logo">
        Big Cat Game
      </a>

      <nav className="main-nav">
        <a href="/">Home</a>
        <a href="/information">Big Cats</a>
        <a href="/trivia">Trivia</a>
        <a href="/about">About</a>
      </nav>

      <div className="nav-account-area">
        {user ? (
          <>
            <div className="nav-user-info">
              <div className="nav-profile-icon">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${user.username} profile`}
                  />
                ) : (
                  user.username.charAt(0).toUpperCase()
                )}
              </div>

              <span>{user.username}</span>
            </div>

            <button
              className="nav-text-button"
              onClick={onSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <a
              href="/account?mode=login"
              className="nav-text-button"
            >
              Sign In
            </a>

            <a
              href="/account?mode=register"
              className="nav-account-button"
            >
              Create Account
            </a>
          </>
        )}
      </div>
    </header>
  );
}

export default NavigationBar;