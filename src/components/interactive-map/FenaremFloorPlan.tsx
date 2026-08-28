"use client";

import type { Exhibitor, MapLocation } from "@/types/map";

const brands = [
 "SCHNEIDER","Soprano","Pado","MEIF","Stam","Tramontina","Enerbras","Foxlux","Decorlux","Taschi","Lorenzetti","OPL","Viqua","Rocco",
 "ILUMI","Steck","3M","ABB","Tigre","Metrotel","Luzarte","G-light","Avant","Ourolux","Exatron","GIMAWA","Mec-Tronic","Lukma","Sika",
 "Intelbras","Wago","Silvana","Eletec","Azurra","JNG","Force Line","Exbom","Perlex","Norton","Chemie","Soprano","Germerplast","Iquine",
 "Alumbra","Docol","G20","Compel","Plastilit","Tekbond","Sil","MRO","WEG","Pluzie","Exatron","Kian"
];

function boothPosition(index:number){
 const columns=6; const col=index%columns; const row=Math.floor(index/columns);
 return {x:178+col*105,y:170+row*72,w:96,h:62};
}

export function FenaremFloorPlan({exhibitors,selected,onSelect}:{exhibitors:Exhibitor[];selected:Exhibitor|null;onSelect:(item:Exhibitor)=>void;onLocation:(item:MapLocation)=>void}){
 const known:Record<string,Exhibitor|undefined>={WEG:exhibitors.find(e=>e.id==="weg"),ABB:exhibitors.find(e=>e.id==="abb"),"3M":exhibitors.find(e=>e.id==="3m")};
 return <svg className="floor-plan" viewBox="0 0 1100 920" role="img" aria-label="Planta interativa da FENAREM">
  <defs><filter id="floorShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="12" floodOpacity=".12"/></filter></defs>
  <g className="venue" filter="url(#floorShadow)">
   <path d="M90 110H820L975 255V760H770V875H90Z" fill="#fff" stroke="#545454" strokeWidth="4"/>
   <path d="M820 110v145h155" fill="none" stroke="#545454" strokeWidth="4"/>
   <rect x="823" y="260" width="152" height="120" fill="#ed651c" stroke="#545454" strokeWidth="3"/><text x="899" y="322" className="area-label white">BANHEIROS</text>
   <rect x="770" y="760" width="205" height="115" fill="#ed651c" stroke="#545454" strokeWidth="3" onClick={()=>{}}/><text x="872" y="821" className="area-label white">RESTAURANTE</text>
   <path d="M695 640h110v235H695z" fill="#eee" stroke="#555" strokeWidth="3"/><path d="M705 665h40v185h-40m50-185h40v185h-40" fill="#aaa" stroke="#777" strokeWidth="2"/><text x="750" y="630" className="orange-label">ACESSO</text><text transform="translate(678 810) rotate(-90)" className="orange-label">ESCADA ROLANTE</text>
   <rect x="610" y="510" width="190" height="105" fill="#fff" stroke="#777" strokeWidth="2"/><text x="705" y="554" className="orange-label">DEPÓSITO DE</text><text x="705" y="575" className="orange-label">EXPOSITORES</text>
   <rect x="610" y="620" width="190" height="42" fill="#fff" stroke="#777" strokeWidth="2"/><text x="705" y="647" className="orange-label">CREDENCIAMENTO</text>
   <rect x="100" y="115" width="700" height="45" fill="#fafafa" stroke="#aaa"/><text x="450" y="143" className="orange-label">RODADA DE NEGÓCIOS</text>
   {brands.map((brand,index)=>{const p=boothPosition(index); const item=brand==="WEG"?{id:"weg",name:"WEG"}:brand==="ABB"?{id:"abb",name:"ABB"}:brand==="3M"?{id:"3m",name:"3M"}:null; const isActive=item&&selected?.id===item.id; return <g key={`${brand}-${index}`} className={`vector-booth ${isActive?"selected":""}`} role={item?"button":undefined} tabIndex={item?0:undefined} onClick={()=>{if(item){const match=(known[brand]??null); if(match)onSelect(match)}}}>
    <rect x={p.x} y={p.y} width={p.w} height={p.h}/><text x={p.x+p.w/2} y={p.y+26} className={`brand brand-${brand.replace(/[^a-z0-9]/gi,"").toLowerCase()}`}>{brand}</text><text x={p.x+8} y={p.y+54} className="stand-number">{String(index+1).padStart(2,"0")}</text>
   </g>})}
   <g className="lounge-zone"><text x="490" y="790" className="orange-label">LOUNGE</text>{[0,1,2,3,4,5].map(i=><circle key={i} cx={450+(i%3)*55} cy={820+Math.floor(i/3)*42} r="15" fill="#c9c1b4"/>)}<rect x="505" y="812" width="38" height="38" transform="rotate(45 524 831)" fill="#3c3c3c"/></g>
   <g className="you-here"><path d="M133 735a20 20 0 1 0 40 0c0-24-20-40-20-40s-20 16-20 40" fill="#ed651c"/><circle cx="153" cy="731" r="7" fill="#fff"/><text x="153" y="780" className="orange-label">VOCÊ ESTÁ AQUI</text></g>
   <g><rect x="100" y="800" width="95" height="65" fill="#ed651c"/><text x="147" y="837" className="area-label white">PALCO</text></g>
   <text x="430" y="895" className="orange-label">RODADA DE NEGÓCIOS</text>
  </g>
  <g className="fenarem-signature" transform="translate(20 790)"><path d="M18 0v70L53 35zm72 0v70L55 35zM18 0h72L54 35zm0 70h72L54 36z" fill="#ed651c"/><text x="105" y="45">FENAREM</text><text x="106" y="65" className="fenarem-subtitle">FEIRA DE NEGÓCIOS ANUAL DA REDE ELÉTRICA E MAXXIREDE</text><text x="105" y="91" className="fenarem-edition">2ª Edição</text></g>
 </svg>
}
