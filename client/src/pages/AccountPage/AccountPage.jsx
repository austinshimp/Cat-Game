import { useState } from "react";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

import {
  registerUser,
  loginUser,
} from "../../services/authService";

import "./AccountPage.css";

function AccountPage({
  user = null,
  onAuthenticated = () => {},
  onSignOut = () => {},
}) {
  const params = new URLSearchParams(window.location.search);

  const initialMode =
    params.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = useState(initialMode);

  const [loginForm, setLoginForm] = useState({
    identifier: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function switchMode(newMode) {
    setMode(newMode);
    setMessage("");
  }

  function updateLogin(event) {
    const { name, value } = event.target;

    setLoginForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function updateRegister(event) {
    const { name, value } = event.target;

    setRegisterForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleLogin(event) {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = await loginUser({
        identifier: loginForm.identifier,
        password: loginForm.password,
      });

      onAuthenticated(data.user);

      window.location.assign("/");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();

    setMessage("");

    if (
      registerForm.password !==
      registerForm.confirmPassword
    ) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        email: registerForm.email,
        username: registerForm.username,
        password: registerForm.password,
      });

      onAuthenticated(data.user);

      window.location.assign("/");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="account-page">
      <NavigationBar
        user={user}
        onSignOut={onSignOut}
      />

      <main className="account-main">
        <section className="account-introduction">
          <p className="account-kicker">
            Big Cat Trivia
          </p>

          <h1>
            Learn.
            <br />
            Test your knowledge.
          </h1>

          <p>
            Create an account to participate in trivia,
            save your high score, and compete for a place
            on the leaderboard.
          </p>
        </section>

        <section className="account-panel">
          <div className="account-tabs">
            <button
              type="button"
              className={mode === "login" ? "active" : ""}
              onClick={() => switchMode("login")}
            >
              Sign In
            </button>

            <button
              type="button"
              className={mode === "register" ? "active" : ""}
              onClick={() => switchMode("register")}
            >
              Create Account
            </button>
          </div>

          {mode === "login" ? (
            <form
              className="account-form"
              onSubmit={handleLogin}
            >
              <div className="form-heading">
                <h2>Welcome back</h2>
                <p>
                  Sign in to continue to Big Cat Trivia.
                </p>
              </div>

              <label>
                Username or Email

                <input
                  type="text"
                  name="identifier"
                  value={loginForm.identifier}
                  onChange={updateLogin}
                  autoComplete="username"
                  required
                />
              </label>

              <label>
                Password

                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={updateLogin}
                  autoComplete="current-password"
                  required
                />
              </label>

              {message && (
                <p className="form-message">
                  {message}
                </p>
              )}

              <button
                className="submit-account"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form
              className="account-form"
              onSubmit={handleRegister}
            >
              <div className="form-heading">
                <h2>Create your account</h2>

                <p>
                  Join the trivia leaderboard and save your
                  high score.
                </p>
              </div>

              <label>
                Email

                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={updateRegister}
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Username

                <input
                  type="text"
                  name="username"
                  value={registerForm.username}
                  onChange={updateRegister}
                  autoComplete="username"
                  required
                />
              </label>

              <label>
                Password

                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={updateRegister}
                  autoComplete="new-password"
                  required
                />
              </label>

              <label>
                Confirm Password

                <input
                  type="password"
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                  onChange={updateRegister}
                  autoComplete="new-password"
                  required
                />
              </label>

              {message && (
                <p className="form-message">
                  {message}
                </p>
              )}

              <button
                className="submit-account"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

export default AccountPage;