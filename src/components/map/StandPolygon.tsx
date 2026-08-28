import type { MapArea } from "@/data/fairMap";

const pointString = (area: MapArea) => area.points.map(({ x, y }) => `${x},${y}`).join(" ");

export function StandPolygon({ area, selected, onSelect }: { area: MapArea; selected: boolean; onSelect: (area: MapArea) => void }) {
  const activate = () => onSelect(area);
  return <polygon
    points={pointString(area)}
    className={`map-area-polygon${selected ? " selected" : ""}`}
    role="button"
    tabIndex={0}
    aria-label={`${area.name}${area.code ? `, stand ${area.code}` : ""}`}
    vectorEffect="non-scaling-stroke"
    onPointerDown={(event) => { event.stopPropagation(); }}
    onPointerUp={(event) => { event.stopPropagation(); if (event.pointerType === "touch" || event.pointerType === "pen") activate(); }}
    onClick={(event) => { event.stopPropagation(); activate(); }}
    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); activate(); } }}
  ><title>{area.code ? `Stand ${area.code} — ${area.name}` : area.name}</title></polygon>;
}
