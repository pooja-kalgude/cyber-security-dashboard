"use client";

import { useState } from "react";
import logoMap from "@/data/vendor-logo-map.json";

export default function VendorLogo({ name }) {
  const [failed, setFailed] = useState(false);
  const slug = logoMap[name];

  if (!slug || failed) {
    return <span className="vendor-logo-placeholder" aria-hidden="true">{name.slice(0, 1).toUpperCase()}</span>;
  }

  return (
    <span className="vendor-logo-wrap">
      <img
        className="vendor-logo-image"
        src={`/logos/${slug}.svg`}
        alt={`${name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
