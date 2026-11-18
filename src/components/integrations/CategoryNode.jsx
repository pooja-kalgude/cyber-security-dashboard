"use client";

import { Cloud, Mail, Network, Server, Shield, Siren, Radar, Workflow } from "lucide-react";

const iconMap = {
  "threat-intelligence": Radar,
  cspm: Cloud,
  "email-security": Mail,
  cnapp: Shield,
  "it-operations": Server,
  soar: Workflow,
  siem: Siren,
  "cloud-security": Network,
};

export default function CategoryNode({ category, index, onClick }) {
  const Icon = iconMap[category.id] || Shield;
  return (
    <button className={`category-node node-${index}`} onClick={() => onClick(category)}>
      <span className="category-icon"><Icon size={22} strokeWidth={1.8} /></span>
      <span className="category-name">{category.name}</span>
      <span className="category-total">{category.vendors.length} vendors</span>
    </button>
  );
}
