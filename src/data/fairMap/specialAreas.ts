import type { MapArea } from "./types";

export const specialAreas: MapArea[] = [
  // O lounge não possui moldura impressa; este perímetro acompanha somente o
  // conjunto de mesas e poltronas, sem invadir os stands e corredores vizinhos.
  { id: "lounge", name: "Lounge", type: "lounge", precision: "verified", points: [{ x: 2040, y: 2910 }, { x: 2380, y: 2670 }, { x: 2745, y: 2885 }, { x: 2680, y: 3070 }, { x: 2490, y: 3210 }, { x: 2200, y: 3200 }] },
  // A retirada acompanha a fileira diagonal de balcões laranja impressa na planta.
  { id: "vouchers", name: "Retirada de Vouchers", type: "voucher", precision: "verified", points: [{ x: 2675, y: 1000 }, { x: 2760, y: 940 }, { x: 3080, y: 1395 }, { x: 2995, y: 1455 }] },
  // As duas rodadas ficam restritas aos conjuntos de mesas/cadeiras, sem cobrir stands.
  { id: "negocios", name: "Rodada de Negócios", type: "business", precision: "verified", points: [{ x: 1170, y: 1021 }, { x: 1590, y: 724 }, { x: 1630, y: 850 }, { x: 1210, y: 1146 }] },
  // A planta possui dois pontos distintos de consulta de cupons.
  { id: "consulta-superior", name: "Consulta de Cupons", type: "coupon", precision: "verified", points: [{ x: 2055, y: 925 }, { x: 2225, y: 925 }, { x: 2225, y: 1100 }, { x: 2055, y: 1100 }] },
  { id: "consulta", name: "Consulta de Cupons", type: "coupon", precision: "verified", points: [{ x: 1850, y: 3035 }, { x: 2090, y: 3035 }, { x: 2090, y: 3225 }, { x: 1850, y: 3225 }] },
  { id: "banheiros", name: "Banheiros", type: "bathroom", precision: "verified", points: [{ x: 3427, y: 1189 }, { x: 3869, y: 1822 }, { x: 3677, y: 1957 }, { x: 3234, y: 1324 }] },
  { id: "restaurante", name: "Restaurante", type: "restaurant", precision: "verified", points: [{ x: 4607, y: 4043 }, { x: 6364, y: 4043 }, { x: 6364, y: 4467 }, { x: 4607, y: 4467 }] },
  { id: "credenciamento", name: "Credenciamento", type: "credential", precision: "verified", points: [{ x: 3934, y: 2536 }, { x: 3967, y: 2585 }, { x: 3518, y: 2896 }, { x: 3486, y: 2846 }] },
  { id: "elevadores", name: "Elevadores", type: "elevator", precision: "verified", points: [{ x: 4580, y: 3715 }, { x: 4780, y: 3715 }, { x: 4780, y: 3860 }, { x: 4580, y: 3860 }] },
  { id: "acesso", name: "Acesso Principal", type: "entrance", precision: "verified", points: [{ x: 3865, y: 3260 }, { x: 4215, y: 3260 }, { x: 4215, y: 3400 }, { x: 3865, y: 3400 }] },
  { id: "palco", name: "Palco", type: "stage", precision: "verified", points: [{ x: 1986, y: 3622 }, { x: 2195, y: 3921 }, { x: 2049, y: 4023 }, { x: 1840, y: 3725 }] },
  { id: "area-exposicao", name: "Área de Exposição", type: "exhibition", precision: "verified", points: [{ x: 2197, y: 3985 }, { x: 2276, y: 4098 }, { x: 2158, y: 4180 }, { x: 2079, y: 4067 }] },
  { id: "negocios-inferior", name: "Rodada de Negócios — Área Inferior", type: "business", precision: "verified", points: [{ x: 2380, y: 4140 }, { x: 3300, y: 4140 }, { x: 3300, y: 4470 }, { x: 2380, y: 4470 }] },
];
