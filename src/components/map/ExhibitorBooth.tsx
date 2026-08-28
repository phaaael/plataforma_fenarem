import type { BoothGeometry } from "@/types/venue-map";
import { BrandLogo } from "./BrandLogo";
export function ExhibitorBooth({booth}:{booth:BoothGeometry}){return <g className="booth-geometry"><rect x={booth.x} y={booth.y} width={booth.width} height={booth.height}/>{booth.logo&&<BrandLogo src={booth.logo} alt={`Logo do stand ${booth.stand}`} x={booth.x} y={booth.y} width={booth.width} height={booth.height}/>}<text x={booth.x+4} y={booth.y+booth.height-4}>{booth.stand}</text></g>}
