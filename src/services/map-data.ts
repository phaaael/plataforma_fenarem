import { locations } from "@/data/locations";
import { kiosks } from "@/data/kiosks";
import { stands } from "@/data/fairMap";
import type { Exhibitor } from "@/types/map";

const exhibitors: Exhibitor[] = stands.map((area) => {
  const xs=area.points.map(point=>point.x/65),ys=area.points.map(point=>point.y/45);
  return {id:area.companyId??area.id,name:area.name,stand:area.code??area.id,category:"Expositor FENAREM",description:null,logo:null,websiteUrl:null,catalogUrl:area.catalogUrl??null,instagramUrl:null,whatsappUrl:null,catalogMode:"external",aliases:[],hotspot:{x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)}};
});

export const getExhibitors = () => exhibitors;
export const getLocations = () => locations;
export const getKiosks = () => kiosks;
