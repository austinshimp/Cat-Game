// The recurring "specimen plate" motif: a framed photo with a corner
// accession tag and a conservation-status stamp, like a museum catalog card.
export function SpecimenPlate({ image, accessionNumber, status, alt }) {
  return (
    <div className="specimen-plate">
      {accessionNumber && (
        <span className="specimen-tag">No. {accessionNumber}</span>
      )}
      {status && (
        <span className="specimen-stamp" data-status={status}>
          {status
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </span>
      )}
      {image ? (
        <img src={image.url} alt={alt || image.caption || ""} loading="lazy" />
      ) : (
        <div className="state-message">No image on file</div>
      )}
    </div>
  );
}
