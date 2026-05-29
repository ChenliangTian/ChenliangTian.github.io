/**
 * Knowledge graph data — the nodes and edges behind the 3D map on /log.
 *
 * HOW TO EXTEND (you'll maintain this file as you learn more):
 *   1. Add a node to `nodes`:
 *        - type 'domain'  → a top-level field (Quantum, AI, Networking …)
 *        - type 'log'     → one of your actual log posts; set `slug` to the
 *                           filename in content/logs (without .md) so the
 *                           popup can link to it
 *        - type 'concept' → a knowledge point (a single idea)
 *      Give every node a short `blurb` — it shows in the click popup.
 *   2. Connect them in `links` with a `kind`:
 *        - 'contains'  domain → log
 *        - 'covers'    log → concept
 *        - 'builds-on' concept → concept  (prerequisite / directional)
 *        - 'relates'   concept ↔ concept  (associative)
 *      `source` and `target` are node `id`s.
 *
 * The graph is fully data-driven: new nodes/edges appear automatically.
 */

export type NodeType = "domain" | "log" | "concept";
export type LinkKind = "contains" | "covers" | "builds-on" | "relates";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  domain?: string; // colour grouping; defaults from the domain it hangs off
  slug?: string; // log nodes → /log/<slug>
  blurb?: string; // shown in the click popup
}

export interface GraphLink {
  source: string;
  target: string;
  kind: LinkKind;
}

export const nodes: GraphNode[] = [
  // ── Domains ──────────────────────────────────────────────────────────────
  {
    id: "domain:quantum",
    label: "Quantum",
    type: "domain",
    domain: "Quantum",
    blurb:
      "Foundations of quantum information — states, entanglement, and the networks that will carry them.",
  },
  {
    id: "domain:ai",
    label: "AI",
    type: "domain",
    domain: "AI",
    blurb: "The hardware, models, and systems that modern machine learning runs on.",
  },

  // ── Logs ─────────────────────────────────────────────────────────────────
  {
    id: "log:density-matrices",
    label: "Quantum States & Density Matrices",
    type: "log",
    domain: "Quantum",
    slug: "quantum-states-density-matrices",
    blurb:
      "The mathematical toolkit for representing pure and mixed quantum states, and why coherence lives in the off-diagonal terms.",
  },
  {
    id: "log:entanglement",
    label: "Exploring Quantum Entanglement",
    type: "log",
    domain: "Quantum",
    slug: "sample-log",
    blurb: "Bell states and the correlations that no classical mixture can reproduce.",
  },
  {
    id: "log:decoherence",
    label: "Decoherence",
    type: "log",
    domain: "Quantum",
    slug: "decoherence",
    blurb:
      "How a coherent state loses its phase relationship — pure dephasing and the decay of the off-diagonal terms.",
  },
  {
    id: "log:ai-hardware",
    label: "AI Hardware & Model Fundamentals",
    type: "log",
    domain: "AI",
    slug: "ai-hardware-basics",
    blurb:
      "An overview of AI chips, the model lifecycle, frameworks, and how LLMs decode text.",
  },

  // ── Concepts: Quantum ──────────────────────────────────────────────────────
  {
    id: "c:state-vector",
    label: "State Vector |ψ⟩",
    type: "concept",
    domain: "Quantum",
    blurb: "Describes a single pure quantum state.",
  },
  {
    id: "c:bra-vector",
    label: "Bra Vector ⟨ψ|",
    type: "concept",
    domain: "Quantum",
    blurb: "The conjugate transpose of |ψ⟩.",
  },
  {
    id: "c:density-matrix",
    label: "Density Matrix ρ",
    type: "concept",
    domain: "Quantum",
    blurb:
      "Represents pure OR mixed states. Built from the outer product |ψ⟩⟨ψ| for a pure state.",
  },
  {
    id: "c:pure-vs-mixed",
    label: "Pure vs. Mixed",
    type: "concept",
    domain: "Quantum",
    blurb:
      "A state vector is always pure; a density matrix can also describe a statistical mixture.",
  },
  {
    id: "c:coherence",
    label: "Coherence (off-diagonal)",
    type: "concept",
    domain: "Quantum",
    blurb:
      "The off-diagonal terms of ρ encode the phase relationship between basis states. Their decay is decoherence.",
  },
  {
    id: "c:eigendecomposition",
    label: "Eigendecomposition",
    type: "concept",
    domain: "Quantum",
    blurb:
      "Diagonalizing ρ = Σ λᵢ|φᵢ⟩⟨φᵢ| rewrites it as a classical mixture of orthogonal states.",
  },
  {
    id: "c:entanglement",
    label: "Entanglement",
    type: "concept",
    domain: "Quantum",
    blurb:
      "Correlations between subsystems that no product state or classical mixture can reproduce.",
  },
  {
    id: "c:decoherence",
    label: "Decoherence",
    type: "concept",
    domain: "Quantum",
    blurb:
      "Loss of a stable phase relationship across an ensemble; the off-diagonal terms of ρ decay and the state drifts toward a classical mixture.",
  },
  {
    id: "c:dephasing",
    label: "Pure Dephasing (T₂)",
    type: "concept",
    domain: "Quantum",
    blurb:
      "Decoherence that suppresses coherences while leaving populations fixed: ρ₀₁(t) = ρ₀₁(0)·e^(−t/T₂).",
  },

  // ── Concepts: AI ───────────────────────────────────────────────────────────
  {
    id: "c:ai-chips",
    label: "AI Chips (GPU / TPU)",
    type: "concept",
    domain: "AI",
    blurb: "Massively parallel processors built for the matrix math behind deep learning.",
  },
  {
    id: "c:model-lifecycle",
    label: "Model Lifecycle",
    type: "concept",
    domain: "AI",
    blurb: "Training → fine-tuning → inference, and the trade-offs at each stage.",
  },
  {
    id: "c:frameworks",
    label: "Frameworks",
    type: "concept",
    domain: "AI",
    blurb: "PyTorch / TensorFlow and the abstractions that compile models down to the chip.",
  },
  {
    id: "c:llms",
    label: "LLMs",
    type: "concept",
    domain: "AI",
    blurb: "Large language models — autoregressive transformers that generate text token by token.",
  },
  {
    id: "c:decoding",
    label: "Decoding Parameters",
    type: "concept",
    domain: "AI",
    blurb: "Temperature, top-p, top-k — the knobs that shape how an LLM samples its next token.",
  },
];

export const links: GraphLink[] = [
  // Domain → logs
  { source: "domain:quantum", target: "log:density-matrices", kind: "contains" },
  { source: "domain:quantum", target: "log:entanglement", kind: "contains" },
  { source: "domain:quantum", target: "log:decoherence", kind: "contains" },
  { source: "domain:ai", target: "log:ai-hardware", kind: "contains" },

  // Log → concepts (covers)
  { source: "log:density-matrices", target: "c:state-vector", kind: "covers" },
  { source: "log:density-matrices", target: "c:bra-vector", kind: "covers" },
  { source: "log:density-matrices", target: "c:density-matrix", kind: "covers" },
  { source: "log:density-matrices", target: "c:pure-vs-mixed", kind: "covers" },
  { source: "log:density-matrices", target: "c:coherence", kind: "covers" },
  { source: "log:density-matrices", target: "c:eigendecomposition", kind: "covers" },
  { source: "log:entanglement", target: "c:entanglement", kind: "covers" },
  { source: "log:decoherence", target: "c:decoherence", kind: "covers" },
  { source: "log:decoherence", target: "c:dephasing", kind: "covers" },
  { source: "log:ai-hardware", target: "c:ai-chips", kind: "covers" },
  { source: "log:ai-hardware", target: "c:model-lifecycle", kind: "covers" },
  { source: "log:ai-hardware", target: "c:frameworks", kind: "covers" },
  { source: "log:ai-hardware", target: "c:llms", kind: "covers" },
  { source: "log:ai-hardware", target: "c:decoding", kind: "covers" },

  // Concept → concept (logical relationships)
  { source: "c:state-vector", target: "c:bra-vector", kind: "relates" },
  { source: "c:state-vector", target: "c:density-matrix", kind: "builds-on" },
  { source: "c:bra-vector", target: "c:density-matrix", kind: "builds-on" },
  { source: "c:density-matrix", target: "c:pure-vs-mixed", kind: "builds-on" },
  { source: "c:pure-vs-mixed", target: "c:coherence", kind: "relates" },
  { source: "c:density-matrix", target: "c:eigendecomposition", kind: "builds-on" },
  { source: "c:density-matrix", target: "c:entanglement", kind: "relates" },
  // Decoherence builds on coherence and acts on the density matrix
  { source: "c:coherence", target: "c:decoherence", kind: "builds-on" },
  { source: "c:decoherence", target: "c:dephasing", kind: "relates" },
  { source: "c:dephasing", target: "c:density-matrix", kind: "relates" },

  { source: "c:ai-chips", target: "c:llms", kind: "relates" },
  { source: "c:model-lifecycle", target: "c:frameworks", kind: "relates" },
  { source: "c:llms", target: "c:decoding", kind: "builds-on" },
  { source: "c:frameworks", target: "c:ai-chips", kind: "relates" },
];

/** Palette per node type / domain — consumed by the graph component. */
export const NODE_COLORS = {
  domainQuantum: "#B83A26", // terracotta
  domainAI: "#9C8F73", // deep taupe
  log: "#1C1A17", // ink (flips to cream in dark mode by the component)
  conceptQuantum: "#C0584A", // soft terracotta
  conceptAI: "#6B6052", // taupe
} as const;
