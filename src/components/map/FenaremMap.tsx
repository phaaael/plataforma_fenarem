"use client";

import { useMemo } from "react";
import type { Exhibitor, MapLocation } from "@/types/map";
import { specialAreas, stands, type MapArea } from "@/data/fairMap";
import { MapDebugEditor } from "./MapDebugEditor";
import { MapInteraction } from "./MapInteraction";
import { StandPolygon } from "./StandPolygon";

const MAP_IMAGE_SIZE = { width: 8000, height: 4500 };
const MAP_VIEWBOX = { width: 8000, height: 4500 };
const hiddenLocationIds = new Set(["deposito", "escada-rolante"]);

export function FenaremMap({ exhibitors, locations, selected, selectedLocation, onSelect, onLocation, onArea, mapDebug = false }: {
  exhibitors: Exhibitor[]; locations: MapLocation[]; selected: Exhibitor | null; selectedLocation: MapLocation | null;
  onSelect: (item: Exhibitor) => void; onLocation: (item: MapLocation) => void; onArea: (area: MapArea) => void; mapDebug?: boolean;
}) {

  const areas = useMemo(() => [...stands, ...specialAreas], []);
  const selectedAreaId = selected ? areas.find((area) => area.companyId === selected.id || area.id === selected.id || area.code === selected.stand)?.id : selectedLocation?.id;
  const exactCompanyIds = new Set(areas.filter((area)=>area.type==="stand").map((area) => area.companyId??area.id));
  const exactLocationIds = new Set(areas.filter((area) => !area.companyId).map((area) => area.id));
  const legacyExhibitors = exhibitors.filter((item) => !exactCompanyIds.has(item.id));
  const legacyLocations = locations.filter((item) => !exactLocationIds.has(item.id) && !hiddenLocationIds.has(item.id));
  const score = (point:{x:number;y:number}, hotspot:Exhibitor["hotspot"]) => {
    const cx=(hotspot.x+hotspot.width/2)*65,cy=(hotspot.y+hotspot.height/2)*45,angle=-(hotspot.rotation??0)*Math.PI/180;
    const dx=point.x-cx,dy=point.y-cy,rx=dx*Math.cos(angle)-dy*Math.sin(angle),ry=dx*Math.sin(angle)+dy*Math.cos(angle);
    const nx=Math.abs(rx)/(hotspot.width*65/2),ny=Math.abs(ry)/(hotspot.height*45/2);return nx<=1&&ny<=1?nx*nx+ny*ny:Infinity;
  };
  const pickLegacy = (event:React.MouseEvent<SVGSVGElement>) => {
    const matrix=event.currentTarget.getScreenCTM();if(!matrix)return;
    const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse());
    const stand=legacyExhibitors.map(item=>({item,value:score(point,item.hotspot)})).filter(item=>Number.isFinite(item.value)).sort((a,b)=>a.value-b.value)[0];
    if(stand){onSelect(stand.item);return;}
    const location=legacyLocations.map(item=>({item,value:score(point,item.hotspot)})).filter(item=>Number.isFinite(item.value)).sort((a,b)=>a.value-b.value)[0];
    if(location)onLocation(location.item);
  };
  return <div className="map-document">
    <svg className="fenarem-map-overlay" viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`} preserveAspectRatio="xMidYMid meet" aria-label="Planta oficial interativa da FENAREM" onClick={pickLegacy}>
      <image href="/reference/fenarem-reference.svg" x="0" y="0" width={MAP_IMAGE_SIZE.width} height={MAP_IMAGE_SIZE.height} preserveAspectRatio="xMinYMin meet" />
      <MapInteraction exhibitors={legacyExhibitors} locations={legacyLocations} selected={selected} selectedLocation={selectedLocation} onSelect={onSelect} onLocation={onLocation}/>
      {areas.map((area) => <StandPolygon key={area.id} area={area} selected={selectedAreaId === area.id} onSelect={onArea} />)}
    </svg>
    {mapDebug && <MapDebugEditor areas={areas} />}
  </div>;
}
