"use client";

import { useMemo, useState } from "react";
import { Search, X, ShieldCheck } from "lucide-react";
import VendorLogo from "./VendorLogo";

export default function VendorModal({ category, onClose }) {
  const [query, setQuery] = useState("");
  const vendors = useMemo(
    () => category.vendors.filter((vendor) => vendor.toLowerCase().includes(query.toLowerCase())),
    [category.vendors, query]
  );

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="vendor-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vendor-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div className="modal-title-wrap">
            <span className="modal-icon"><ShieldCheck size={22} /></span>
            <div>
              <p className="eyebrow">INTEGRATION CATEGORY</p>
              <h2 id="vendor-modal-title">{category.name}</h2>
              <p className="vendor-count">{category.vendors.length} integrations available</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close modal"><X size={21} /></button>
        </div>

        <label className="vendor-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search vendors..." autoFocus />
        </label>

        {vendors.length ? (
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <div className="vendor-card" key={vendor}>
                <VendorLogo name={vendor} />
                <span>{vendor}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-state">No vendors match “{query}”.</p>
        )}
        <div className="modal-footer">Showing vendor names from the supplied integration list.</div>
      </section>
    </div>
  );
}
