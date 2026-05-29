"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import SpriteText from "three-spritetext";
import { nodes as rawNodes, links as rawLinks } from "@/lib/knowledge-graph";
import type { GraphNode } from "@/lib/knowledge-graph";

// Force-graph touches WebGL / window — load it only on the client.
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

type FGNode = GraphNode & { x?: number; y?: number; z?: number };

function colorFor(node: GraphNode, dark: boolean): string {
  if (node.type === "domain") {
    return node.domain === "Quantum" ? "#B83A26" : dark ? "#C8BCA3" : "#9C8F73";
  }
  if (node.type === "log") {
    return dark ? "#F2EBD8" : "#1C1A17";
  }
  // concept
  if (node.domain === "Quantum") return "#D0685A";
  return dark ? "#B3A789" : "#6B6052";
}

function sizeFor(node: GraphNode): number {
  if (node.type === "domain") return 9;
  if (node.type === "log") return 6.5;
  return 4.5;
}

const TYPE_LABEL: Record<GraphNode["type"], string> = {
  domain: "Domain",
  log: "Log Entry",
  concept: "Knowledge Point",
};

export function KnowledgeGraph() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);

  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [selected, setSelected] = useState<GraphNode | null>(null);

  useEffect(() => setMounted(true), []);

  // Spread the layout out a bit more than the default so labels don't crowd.
  useEffect(() => {
    if (!mounted) return;
    let tries = 0;
    const id = setInterval(() => {
      const fg = fgRef.current;
      tries += 1;
      if (fg?.d3Force) {
        fg.d3Force("charge")?.strength(-180);
        fg.d3Force("link")?.distance(55);
        fg.d3ReheatSimulation?.();
        clearInterval(id);
      } else if (tries > 40) {
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, [mounted, size.w]);

  // Track container size for the canvas.
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mounted]);

  // Clone data so the force engine can mutate positions without touching the source.
  const graphData = useMemo(
    () => ({
      nodes: rawNodes.map((n) => ({ ...n })),
      links: rawLinks.map((l) => ({ ...l })),
    }),
    []
  );

  const makeNodeObject = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (n: any) => {
      const node = n as GraphNode;
      const sprite = new SpriteText(node.label);
      sprite.color = colorFor(node, dark);
      sprite.textHeight = sizeFor(node);
      sprite.fontFace = "Inter, Avenir Next, sans-serif";
      sprite.fontWeight = node.type === "concept" ? "400" : "700";
      // Breathing room inside the text canvas — without it three-spritetext
      // clips the tops of glyphs (E, B, D, etc. lose their crowns).
      sprite.padding = 4;
      // Don't let labels punch holes in things behind them.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mat = (sprite as any).material;
      if (mat) mat.depthWrite = false;
      return sprite;
    },
    [dark]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNodeClick = useCallback((n: any) => {
    const node = n as FGNode;
    setSelected(node);
    const fg = fgRef.current;
    if (fg && typeof node.x === "number") {
      const dist = 90;
      const h = Math.hypot(node.x ?? 0, node.y ?? 0, node.z ?? 0) || 1;
      const r = 1 + dist / h;
      fg.cameraPosition(
        { x: (node.x ?? 0) * r, y: (node.y ?? 0) * r, z: (node.z ?? 0) * r },
        node,
        1200
      );
    }
  }, []);

  const resetView = useCallback(() => {
    setSelected(null);
    fgRef.current?.zoomToFit(700, 60);
  }, []);

  // Which logs cover / contain the selected node (for the popup).
  const related = useMemo(() => {
    if (!selected) return [];
    const out: GraphNode[] = [];
    for (const l of rawLinks) {
      if (l.target === selected.id && (l.kind === "covers" || l.kind === "contains")) {
        const src = rawNodes.find((n) => n.id === l.source);
        if (src) out.push(src);
      }
      if (l.source === selected.id && l.kind === "contains") {
        const tgt = rawNodes.find((n) => n.id === l.target);
        if (tgt) out.push(tgt);
      }
    }
    return out;
  }, [selected]);

  const linkColor = dark ? "rgba(242,235,216,0.22)" : "rgba(28,26,23,0.18)";
  const bgColor = dark ? "#1C1A17" : "#FFFFFF";

  return (
    <div className="relative w-full overflow-hidden border border-foreground/15">
      <div ref={containerRef} className="h-[460px] md:h-[600px] w-full">
        {mounted && size.w > 0 && (
          <ForceGraph3D
            ref={fgRef}
            width={size.w}
            height={size.h}
            graphData={graphData}
            backgroundColor={bgColor}
            showNavInfo={false}
            nodeThreeObject={makeNodeObject}
            nodeThreeObjectExtend={false}
            nodeLabel={() => ""}
            onNodeClick={handleNodeClick}
            onBackgroundClick={() => setSelected(null)}
            linkColor={() => linkColor}
            linkWidth={0.6}
            linkOpacity={0.5}
            linkDirectionalArrowLength={3}
            linkDirectionalArrowRelPos={1}
            linkDirectionalArrowColor={() => linkColor}
            enableNodeDrag={true}
            onEngineStop={() => fgRef.current?.zoomToFit(500, 60)}
          />
        )}
      </div>

      {/* Hint + reset, top-left */}
      <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
        <span className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-taupe">
          Drag to rotate · Scroll to zoom · Click a node
        </span>
      </div>
      <button
        onClick={resetView}
        className="absolute right-3 top-3 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-foreground/70 border-b-2 border-foreground/30 pb-0.5 transition-colors hover:text-terracotta hover:border-terracotta"
      >
        Reset View
      </button>

      {/* Detail window — opens on node click */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm border border-foreground/20 bg-cream/95 dark:bg-brown/95 backdrop-blur-sm p-5 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-terracotta">
              {TYPE_LABEL[selected.type]}
              {selected.domain ? ` · ${selected.domain}` : ""}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="-mt-1 text-taupe hover:text-terracotta transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
            {selected.label}
          </h3>

          {selected.blurb && (
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{selected.blurb}</p>
          )}

          {selected.type === "log" && selected.slug && (
            <Link
              href={`/log/${selected.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-foreground border-b-2 border-foreground pb-0.5 transition-colors hover:text-terracotta hover:border-terracotta"
            >
              Read Entry →
            </Link>
          )}

          {selected.type !== "log" && related.length > 0 && (
            <div className="mt-4">
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-taupe mb-2">
                {selected.type === "domain" ? "Entries" : "Covered in"}
              </p>
              <ul className="flex flex-col gap-1.5">
                {related
                  .filter((r) => r.type === "log")
                  .map((r) => (
                    <li key={r.id}>
                      <Link
                        href={r.slug ? `/log/${r.slug}` : "#"}
                        className="font-display italic text-base text-foreground hover:text-terracotta transition-colors"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
