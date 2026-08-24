import { useEffect, useState } from "react";
import { api } from "../lib/api";

export function Leaderboard() {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getLeaderboard(10)
      .then((data) => setScores(data.scores))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <span className="eyebrow">The Ledger</span>
      <h2>Leaderboard</h2>

      {error && <p className="state-message">Couldn't load scores: {error}</p>}
      {!error && !scores && <p className="state-message">Loading scores…</p>}
      {scores?.length === 0 && (
        <p className="state-message">No scores recorded yet — be the first.</p>
      )}

      {scores?.length > 0 && (
        <table className="ledger">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Points</th>
              <th>Correct</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={s._id}>
                <td>{i + 1}</td>
                <td>{s.user?.username ?? "Unknown"}</td>
                <td>{s.points}</td>
                <td>
                  {s.correctAnswers} / {s.totalQuestions}
                </td>
                <td>{s.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
