import { NavLink } from "react-router-dom";

export function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav-brand">
        Big Cat Field Guide
      </NavLink>
      <ul className="nav-links">
        <li>
          <NavLink to="/guide" className={({ isActive }) => (isActive ? "active" : "")}>
            Guide
          </NavLink>
        </li>
        <li>
          <NavLink to="/quiz" className={({ isActive }) => (isActive ? "active" : "")}>
            Trivia
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Leaderboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
