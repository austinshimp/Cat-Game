import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="hero">
      <span className="eyebrow">Field Guide &amp; Trivia — Est. 2026</span>
      <h1>Seven specimens.
        <br />
        One catalog of big cats.</h1>
      <p className="lede">
        Browse a dossier on each of the world's big cats — lion, tiger, jaguar,
        leopard, snow leopard, cheetah, and cougar — then test what you've
        learned against the clock in the trivia hall.
      </p>
      <div className="hero-actions">
        <Link to="/guide" className="btn btn-solid">
          Browse the guide
        </Link>
        <Link to="/quiz" className="btn">
          Start trivia
        </Link>
      </div>
    </div>
  );
}
