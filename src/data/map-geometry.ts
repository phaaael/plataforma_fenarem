import type { BoothGeometry } from "@/types/venue-map";

export const boothGeometry:BoothGeometry[]=[
 {id:"stand-schneider",stand:"A01",exhibitorId:"schneider",logo:"/brands/schneider-electric.svg",x:450,y:1600,width:260,height:215},
 {id:"stand-3m",stand:"C03",exhibitorId:"3m",logo:"/brands/3m.svg",x:2480,y:1900,width:330,height:270},
 {id:"stand-abb",stand:"C05",exhibitorId:"abb",logo:"/brands/abb.svg",x:2260,y:2080,width:330,height:270},
 {id:"stand-weg",stand:"D08",exhibitorId:"weg",logo:"/brands/weg.svg",x:2350,y:3610,width:330,height:265},
];

export const hallOutline="M45 55H705V80H775V245H840V785H610V870H45Z";
export const corridors=[
 {x:55,y:242,width:660,height:28},{x:55,y:407,width:660,height:28},{x:55,y:572,width:660,height:28},{x:55,y:735,width:555,height:30},
 {x:62,y:92,width:28,height:650},{x:286,y:92,width:30,height:650},{x:602,y:92,width:30,height:650},
];
