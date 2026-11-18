"use client";

import { useState } from "react";
import { integrations } from "@/data/integrations";
import CategoryNode from "./CategoryNode";
import VendorModal from "./VendorModal";
import { ShieldCheck, Network } from "lucide-react";

export default function IntegrationDiagram() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const totalVendors = integrations.reduce((total, item) => total + item.vendors.length, 0);

  return (
    <>
      <main className="integration-page">
        <header className="page-header">
          <div className="brand-mark"><ShieldCheck size={22} /></div>
          <div>
            <p className="eyebrow">SECURITY ECOSYSTEM</p>
            <h1>Integration <span>Network</span></h1>
            <p className="page-description">Explore connected security platforms and technology partners.</p>
          </div>
        </header>
        <section className="diagram-layout">
          <div className="diagram-panel">
            <div className="diagram-orbit orbit-one" />
            <div className="diagram-orbit orbit-two" />
            <div className="connector-lines" aria-hidden="true">
              {integrations.map((item, index) => <span key={item.id} className={`connector connector-${index}`} />)}
            </div>
            <div className="central-hub">
              <div className="hub-inner"><Network size={34} /><strong>SECURITY</strong><small>ECOSYSTEM</small></div>
            </div>
            {integrations.map((category, index) => (
              <CategoryNode key={category.id} category={category} index={index} onClick={setSelectedCategory} />
            ))}
            <p className="diagram-hint">SELECT A CATEGORY TO EXPLORE INTEGRATIONS</p>
          </div>
          <aside className="info-panel">
            <p className="eyebrow">DISCOVER THE ECOSYSTEM</p>
            <h2>One hub.<br /><span>Multiple capabilities.</span></h2>
            <p className="info-copy">Select a security category to explore its supported vendors and integration partners.</p>
            <div className="stats-grid">
              <div className="stat-card"><strong>{integrations.length}</strong><span>Security categories</span></div>
              <div className="stat-card"><strong>{totalVendors}</strong><span>Vendor entries</span></div>
            </div>
            <div className="category-list">
              {integrations.map((item) => (
                <button key={item.id} onClick={() => setSelectedCategory(item)}>
                  <span>{item.name}</span><span className="list-count">{item.vendors.length}</span>
                </button>
              ))}
            </div>
          </aside>
        </section>
        <footer className="page-footer">Interactive security integration directory</footer>
      </main>
      {selectedCategory && <VendorModal category={selectedCategory} onClose={() => setSelectedCategory(null)} />}
    </>
  );
}
