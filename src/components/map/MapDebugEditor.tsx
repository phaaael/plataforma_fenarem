"use client";

import { useEffect, useState } from "react";
import type { MapArea, MapPoint } from "@/data/fairMap";

const WIDTH = 6500;
const HEIGHT = 4500;

export function MapDebugEditor({ areas }: { areas: MapArea[] }) {
  const [areaId, setAreaId] = useState(areas[0]?.id ?? "new-area");
  const source = areas.find((area) => area.id === areaId);
  const [points, setPoints] = useState<MapPoint[]>(source?.points ?? []);
  const [mouse, setMouse] = useState<MapPoint>({ x: 0, y: 0 });
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => { setPoints(areas.find((area) => area.id === areaId)?.points ?? []); }, [areaId, areas]);
  const coordinates = (event: React.MouseEvent<SVGSVGElement> | React.PointerEvent<SVGSVGElement>): MapPoint => {
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return mouse;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    return { x: Math.round(Math.max(0, Math.min(WIDTH, point.x))), y: Math.round(Math.max(0, Math.min(HEIGHT, point.y))) };
  };
  const json = JSON.stringify({ id: areaId, points: points.map(({ x, y }) => [x, y]) }, null, 2);

  return <>
    <svg className="map-debug-layer" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="xMidYMid meet"
      onPointerMove={(event) => { const point = coordinates(event); setMouse(point); if (dragIndex !== null) setPoints((current) => current.map((item, index) => index === dragIndex ? point : item)); }}
      onPointerUp={() => setDragIndex(null)} onPointerCancel={() => setDragIndex(null)}
      onClick={(event) => { if (event.target !== event.currentTarget || points.length >= 4) return; setPoints((current) => [...current, coordinates(event)]); }}>
      <polygon points={points.map(({ x, y }) => `${x},${y}`).join(" ")} className="debug-polygon" vectorEffect="non-scaling-stroke" />
      {points.map((point, index) => <g key={index} className="debug-vertex" onPointerDown={(event) => { event.stopPropagation(); setDragIndex(index); event.currentTarget.setPointerCapture(event.pointerId); }}>
        <circle cx={point.x} cy={point.y} r={24} vectorEffect="non-scaling-stroke" />
        <text x={point.x + 32} y={point.y - 24}>P{index + 1}</text>
      </g>)}
    </svg>
    <div className="map-debug-panel" onPointerDown={(event) => event.stopPropagation()}>
      <b>MAP DEBUG</b><span>Mouse: {mouse.x}, {mouse.y}</span>
      <label>Área<select value={areaId} onChange={(event) => setAreaId(event.target.value)}>{areas.map((area) => <option key={area.id} value={area.id}>{area.id} · {area.name}</option>)}<option value="new-area">novo polígono</option></select></label>
      {points.map((point, index) => <span key={index}>P{index + 1}: {point.x}, {point.y}</span>)}
      <div><button onClick={() => setPoints([])}>LIMPAR</button><button onClick={() => navigator.clipboard.writeText(json)}>COPIAR JSON</button></div>
      <small>Clique para criar até 4 pontos. Arraste cada vértice para ajuste fino.</small>
    </div>
  </>;
}
