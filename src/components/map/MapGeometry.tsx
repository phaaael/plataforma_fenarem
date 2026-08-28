import { boothGeometry, corridors, hallOutline } from "@/data/map-geometry";
import { ExhibitorBooth } from "./ExhibitorBooth";
export function MapGeometry(){return <g id="geometry"><path className="hall-outline" d={hallOutline}/>{corridors.map((c,i)=><rect key={i} className="corridor" {...c}/>)}{boothGeometry.map(b=><ExhibitorBooth booth={b} key={b.id}/>)}</g>}
