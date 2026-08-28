export interface MapRect { x:number; y:number; width:number; height:number; rotation?:number }
export interface BoothGeometry extends MapRect { id:string; stand:string; exhibitorId?:string; logo?:string }
export interface FacilityGeometry extends MapRect { id:string; label:string; kind:string; fill?:string }
