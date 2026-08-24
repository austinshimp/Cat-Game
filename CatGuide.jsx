import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { SpecimenPlate } from "../components/SpecimenPlate";

export function CatGuide() {
  const [cats, setCats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .getCats()
      .then((data) => setCats(data.cats))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="state-message">Couldn't load the guide: {error}</p>;
  }

  if (!cats) {
    return <p className="state-message">Loading the catalog…</p>;
  }

  if (cats.length === 0) {
    return (
      <p className="state-message">
        No cats in the catalog yet — run <code>npm run seed</code> in the server
        folder to load the field guide data.
      </p>
    );
  }

  return (
    <div>
      <span className="eyebrow">The Catalog</span>
      <h2>Specimen Guide</h2>
      <div className="cat-grid" style={{ marginTop: 28 }}>
        {cats.map((cat, i) => (
          <Link key={cat._id} to={`/guide/${cat._id}`} className="cat-card">
            <SpecimenPlate
              image={cat.images?.[0]}
              accessionNumber={String(i + 1).padStart(2, "0")}
              status={cat.conservationStatus}
              alt={cat.commonName}
            />
            <span className="cat-card-name">{cat.commonName}</span>
            <span className="cat-card-sci">{cat.scientificName}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
