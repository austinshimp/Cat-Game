import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { SpecimenPlate } from "../components/SpecimenPlate";

export function CatDetail() {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCat(null);
    api
      .getCat(id)
      .then((data) => setCat(data.cat))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p className="state-message">Couldn't load this specimen: {error}</p>;
  }

  if (!cat) {
    return <p className="state-message">Loading specimen…</p>;
  }

  const image = cat.images?.[0];

  return (
    <div>
      <Link to="/guide" className="eyebrow">
        ← Back to the guide
      </Link>

      <div className="detail-layout" style={{ marginTop: 24 }}>
        <div>
          <SpecimenPlate
            image={image}
            status={cat.conservationStatus}
            alt={cat.commonName}
          />
          {image?.caption && <p className="plate-caption">{image.caption}</p>}
        </div>

        <div>
          <h1>{cat.commonName}</h1>
          <p className="italic-name">{cat.scientificName}</p>
          <p>{cat.description}</p>

          <ul className="spec-list">
            <li>
              <span className="spec-label">Habitat</span>
              <span className="spec-value">{cat.habitat}</span>
            </li>
            <li>
              <span className="spec-label">Diet</span>
              <span className="spec-value">{cat.diet}</span>
            </li>
            <li>
              <span className="spec-label">Status</span>
              <span className="spec-value">{cat.conservationStatus}</span>
            </li>
          </ul>

          {cat.funFacts?.length > 0 && (
            <div className="marginalia">
              <h3>Field Notes</h3>
              <ul>
                {cat.funFacts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
