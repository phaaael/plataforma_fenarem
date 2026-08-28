import type { Exhibitor, MapLocation } from "@/types/map";

type InteractiveItem = Exhibitor | MapLocation;

function polygonPoints(hotspot: Exhibitor["hotspot"]) {
  const x = hotspot.x * 65;
  const y = hotspot.y * 45;
  const width = hotspot.width * 65;
  const height = hotspot.height * 45;
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const angle = (hotspot.rotation ?? 0) * Math.PI / 180;
  return [[x, y], [x + width, y], [x + width, y + height], [x, y]]
    .map(([pointX, pointY]) => {
      const dx = pointX - centerX;
      const dy = pointY - centerY;
      return `${centerX + dx * Math.cos(angle) - dy * Math.sin(angle)},${centerY + dx * Math.sin(angle) + dy * Math.cos(angle)}`;
    }).join(" ");
}

function activate(event: React.KeyboardEvent<SVGPolygonElement>, action: () => void) {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); action(); }
}

export function MapInteraction({ exhibitors, locations, selected, selectedLocation, onSelect, onLocation }: {
  exhibitors: Exhibitor[]; locations: MapLocation[]; selected: Exhibitor | null; selectedLocation: MapLocation | null;
  onSelect: (item: Exhibitor) => void; onLocation: (item: MapLocation) => void;
}) {
  const polygon = (item: InteractiveItem, className: string, action: () => void, label: string) => <polygon
    key={item.id} points={polygonPoints(item.hotspot)} role="button" tabIndex={0} aria-label={label}
    className={className} vectorEffect="non-scaling-stroke" pointerEvents="all"
    onPointerDown={(event) => { event.stopPropagation(); }}
    onPointerUp={(event) => { event.stopPropagation(); if (event.pointerType === "touch" || event.pointerType === "pen") action(); }}
    onClick={(event) => { event.stopPropagation(); action(); }}
    onKeyDown={(event) => activate(event, action)} />;
  return <g id="interaction">
    {exhibitors.map((item) => polygon(item, selected?.id === item.id ? "booth-hotspot selected" : "booth-hotspot", () => onSelect(item), `${item.name}, stand ${item.stand}`))}
    {locations.map((item) => polygon(item, selectedLocation?.id === item.id ? "facility-hotspot selected" : "facility-hotspot", () => onLocation(item), item.name))}
  </g>;
}
