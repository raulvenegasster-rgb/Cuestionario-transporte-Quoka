
import { useMemo, useState } from "react";

type DimensionSpec = {
  length?: string;
  width?: string;
  thickness?: string;
  height?: string;
  depth?: string;
};

type ProductBadge = {
  label: string;
  tone:
    | "bg-emerald-100 text-emerald-800"
    | "bg-sky-100 text-sky-800"
    | "bg-amber-100 text-amber-800"
    | "border border-dashed border-neutral-300 text-neutral-500"
    | "bg-rose-100 text-rose-800";
};

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  subcategory?: string;
  price: number;
  description: string;
  dimensions: DimensionSpec;
  finish?: string;
  badges?: ProductBadge[];
  features?: string[];
  status?: "sold-out";
  tone: string;
};

type CartItem = {
  productId: string;
  quantity: number;
};

const catalogo: Product[] = [
  {
    id: "follaje-eucalyptus-247",
    name: "Eucalyptus 247",
    sku: "247",
    category: "Follaje artificial",
    price: 540,
    description: "Panel de follaje con textura densa y tonos verdes profundos.",
    dimensions: { length: "60 cm", width: "40 cm" },
    badges: [
      { label: "40% OFF", tone: "bg-emerald-100 text-emerald-800" },
      { label: "Best seller", tone: "bg-sky-100 text-sky-800" },
    ],
    tone: "from-emerald-200 via-emerald-100 to-emerald-300",
  },
  {
    id: "follaje-milan-308",
    name: "Milan 308",
    sku: "308",
    category: "Follaje artificial",
    price: 520,
    description: "Textura fina con follaje compacto que cubre perfectamente cualquier superficie vertical.",
    dimensions: { length: "60 cm", width: "40 cm" },
    badges: [
      { label: "40% OFF", tone: "bg-emerald-100 text-emerald-800" },
      { label: "Sold out", tone: "border border-dashed border-neutral-300 text-neutral-500" },
    ],
    status: "sold-out",
    tone: "from-emerald-300 via-lime-100 to-emerald-200",
  },
  {
    id: "follaje-milan-247",
    name: "Milan 247",
    sku: "247",
    category: "Follaje artificial",
    price: 520,
    description: "Panel Milan clásico con hojas amplias y tonos verdes vibrantes.",
    dimensions: { length: "60 cm", width: "40 cm" },
    badges: [{ label: "40% OFF", tone: "bg-emerald-100 text-emerald-800" }],
    tone: "from-lime-200 via-emerald-100 to-emerald-200",
  },
  {
    id: "follaje-aag-qdxu",
    name: "AAG-QDXU",
    sku: "AAG-QDXU",
    category: "Follaje artificial",
    price: 360,
    description: "Malla cúbica modular para crear volumen y cubrir columnas.",
    dimensions: { length: "25 cm", width: "25 cm", thickness: "30 mm" },
    badges: [{ label: "40% OFF", tone: "bg-emerald-100 text-emerald-800" }],
    tone: "from-emerald-100 via-lime-50 to-emerald-200",
  },
  {
    id: "lambrin-interior-6-kj001",
    name: "Lambrín Interior KJ-001",
    sku: "001",
    category: "Lambrín interior",
    subcategory: "6 secciones",
    price: 1380,
    description: "Revestimiento con acabado nogal cálido perfecto para salas de juntas y recepciones.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "1.8 cm" },
    finish: "Nogal cálido",
    tone: "from-amber-200 via-amber-100 to-orange-200",
  },
  {
    id: "lambrin-interior-6-kj003",
    name: "Lambrín Interior KJ-003",
    sku: "003",
    category: "Lambrín interior",
    subcategory: "6 secciones",
    price: 1380,
    description: "Acabado en roble claro de seis secciones que aporta luz y textura a cualquier muro.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "1.8 cm" },
    finish: "Roble claro",
    tone: "from-amber-100 via-yellow-50 to-orange-100",
  },
  {
    id: "lambrin-interior-6-kj007",
    name: "Lambrín Interior KJ-007",
    sku: "007",
    category: "Lambrín interior",
    subcategory: "6 secciones",
    price: 1420,
    description: "Acabado chocolate profundo ideal para ambientes ejecutivos.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "1.8 cm" },
    finish: "Chocolate intenso",
    tone: "from-orange-200 via-amber-200 to-stone-300",
  },
  {
    id: "lambrin-interior-6-kj009",
    name: "Lambrín Interior KJ-009",
    sku: "009",
    category: "Lambrín interior",
    subcategory: "6 secciones",
    price: 1420,
    description: "Lambrín negro mate que convierte cualquier muro en un statement contemporáneo.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "1.8 cm" },
    finish: "Negro mate",
    badges: [{ label: "Top interior designers", tone: "bg-sky-100 text-sky-800" }],
    tone: "from-neutral-700 via-neutral-900 to-slate-700",
  },
  {
    id: "lambrin-interior-6-kj012",
    name: "Lambrín Interior KJ-012",
    sku: "012",
    category: "Lambrín interior",
    subcategory: "6 secciones",
    price: 1380,
    description: "Lambrín tono hueso que aporta calidez minimalista y continuidad visual.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "1.8 cm" },
    finish: "Marfil cálido",
    tone: "from-stone-100 via-stone-50 to-amber-100",
  },
  {
    id: "lambrin-interior-6-kj013",
    name: "Lambrín Interior KJ-013",
    sku: "013",
    category: "Lambrín interior",
    subcategory: "6 secciones",
    price: 1450,
    description: "Lambrín grafito con microtextura que aporta profundidad y elegancia boutique.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "1.8 cm" },
    finish: "Grafito",
    tone: "from-slate-700 via-neutral-800 to-slate-900",
  },
  {
    id: "lambrin-interior-4-kj014",
    name: "Lambrín Interior KJ-014",
    sku: "014",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1260,
    description: "Lambrín roble dorado que suaviza y calienta espacios con estilo nórdico.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "1.8 cm" },
    finish: "Roble dorado",
    badges: [{ label: "Pre-orden", tone: "bg-amber-100 text-amber-800" }],
    tone: "from-amber-200 via-orange-100 to-amber-300",
  },
  {
    id: "lambrin-interior-4-kj015",
    name: "Lambrín Interior KJ-015",
    sku: "015",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1260,
    description: "Versión gris cálido ideal para conceptos modernos.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "1.8 cm" },
    finish: "Gris cálido",
    badges: [{ label: "Sold out", tone: "border border-dashed border-neutral-300 text-neutral-500" }],
    status: "sold-out",
    tone: "from-slate-200 via-neutral-200 to-stone-200",
  },
  {
    id: "lambrin-interior-4-kj018",
    name: "Lambrín Interior KJ-018",
    sku: "018",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1280,
    description: "Lambrín caramelo con vetas pronunciadas que generan dinamismo visual.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "1.8 cm" },
    finish: "Caramelo",
    tone: "from-orange-200 via-amber-200 to-orange-300",
  },
  {
    id: "lambrin-interior-4-kj019",
    name: "Lambrín Interior KJ-019",
    sku: "019",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1280,
    description: "Lambrín en roble envejecido que aporta carácter artesanal.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "1.8 cm" },
    finish: "Roble envejecido",
    tone: "from-stone-300 via-amber-100 to-stone-200",
  },
  {
    id: "lambrin-interior-4-kj021",
    name: "Lambrín Interior KJ-021",
    sku: "021",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1300,
    description: "Acabado cenizo oscuro con sello protector para lobbies y recepciones.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "1.8 cm" },
    finish: "Cenizo oscuro",
    badges: [{ label: "Sold out", tone: "border border-dashed border-neutral-300 text-neutral-500" }],
    status: "sold-out",
    tone: "from-neutral-500 via-slate-400 to-neutral-600",
  },
  {
    id: "lambrin-interior-4-kj048",
    name: "Lambrín Interior KJ-048",
    sku: "048",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1300,
    description: "Lambrín blanco nieve con vetas suaves para ambientes minimalistas.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "2.0 cm" },
    finish: "Blanco nieve",
    tone: "from-stone-100 via-stone-50 to-neutral-100",
  },
  {
    id: "lambrin-interior-4-kj023",
    name: "Lambrín Interior KJ-023",
    sku: "023",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1300,
    description: "Lambrín wengué profundo para crear contraste elegante.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "2.0 cm" },
    finish: "Wengué",
    tone: "from-neutral-700 via-neutral-600 to-neutral-800",
  },
  {
    id: "lambrin-interior-4-kj-p110",
    name: "Lambrín Interior KJ-P110",
    sku: "P110",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1320,
    description: "Acabado gris perlado con brillo suave para ambientes cosmopolitas.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "2.0 cm" },
    finish: "Gris perlado",
    tone: "from-slate-200 via-slate-100 to-slate-300",
  },
  {
    id: "lambrin-interior-4-kj112",
    name: "Lambrín Interior KJ-112",
    sku: "112",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1320,
    description: "Lambrín chocolate veteado que otorga carácter premium.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "2.0 cm" },
    finish: "Chocolate veteado",
    tone: "from-amber-300 via-amber-200 to-orange-300",
  },
  {
    id: "lambrin-interior-4-kj102",
    name: "Lambrín Interior KJ-102",
    sku: "102",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1320,
    description: "Lambrín gris humo con veta lineal moderna.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "2.0 cm" },
    finish: "Gris humo",
    tone: "from-slate-400 via-slate-300 to-slate-500",
  },
  {
    id: "lambrin-interior-4-kj110",
    name: "Lambrín Interior KJ-110",
    sku: "110",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1320,
    description: "Lambrín gris cálido con beta suave y textura ligeramente cepillada.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "2.0 cm" },
    finish: "Gris cálido",
    tone: "from-stone-200 via-stone-100 to-stone-300",
  },
  {
    id: "lambrin-interior-4-kj106",
    name: "Lambrín Interior KJ-106",
    sku: "106",
    category: "Lambrín interior",
    subcategory: "4 secciones",
    price: 1340,
    description: "Lambrín nogal oscuro con destellos cobrizos para ambientes cálidos.",
    dimensions: { length: "290 cm", width: "17 cm", thickness: "2.0 cm" },
    finish: "Nogal oscuro",
    tone: "from-amber-300 via-amber-200 to-orange-400",
  },
  {
    id: "esquinero-interior-esq01",
    name: "Esquinero Interior ESQ-01",
    sku: "ESQ-01",
    category: "Esquinero interior",
    price: 420,
    description: "Perfil esquinero negro mate para transiciones impecables.",
    dimensions: { length: "290 cm", width: "2.5 cm", thickness: "1.2 cm" },
    badges: [{ label: "New", tone: "bg-sky-100 text-sky-800" }],
    tone: "from-neutral-700 via-neutral-900 to-neutral-600",
  },
  {
    id: "esquinero-interior-esq02",
    name: "Esquinero Interior ESQ-02",
    sku: "ESQ-02",
    category: "Esquinero interior",
    price: 420,
    description: "Perfil esquinero tono madera que suaviza uniones con lambrines cálidos.",
    dimensions: { length: "290 cm", width: "2.5 cm", thickness: "1.2 cm" },
    badges: [{ label: "New", tone: "bg-sky-100 text-sky-800" }],
    tone: "from-amber-200 via-amber-100 to-orange-200",
  },
  {
    id: "esquinero-interior-esq03",
    name: "Esquinero Interior ESQ-03",
    sku: "ESQ-03",
    category: "Esquinero interior",
    price: 420,
    description: "Perfil chocolate que remata lambrines oscuros y superficies en contraste.",
    dimensions: { length: "290 cm", width: "2.5 cm", thickness: "1.2 cm" },
    tone: "from-amber-300 via-amber-200 to-orange-300",
  },
  {
    id: "esquinero-interior-esq05",
    name: "Esquinero Interior ESQ-05",
    sku: "ESQ-05",
    category: "Esquinero interior",
    price: 420,
    description: "Perfil esquinero naranja terracota para acentos vibrantes.",
    dimensions: { length: "290 cm", width: "2.5 cm", thickness: "1.2 cm" },
    tone: "from-orange-300 via-amber-200 to-orange-400",
  },
  {
    id: "esquinero-interior-esq08",
    name: "Esquinero Interior ESQ-08",
    sku: "ESQ-08",
    category: "Esquinero interior",
    price: 440,
    description: "Perfil aluminio cepillado con canto delicado para rematar lambrines claros.",
    dimensions: { length: "290 cm", width: "2.5 cm", thickness: "1.2 cm" },
    tone: "from-slate-200 via-slate-100 to-slate-300",
  },
  {
    id: "viga-interior-vig001",
    name: "Viga Interior VIG-001",
    sku: "VIG001",
    category: "Vigas & panel piedra",
    subcategory: "Vigas interiores",
    price: 2480,
    description: "Viga decorativa tono nogal que simula madera natural con peso ligero.",
    dimensions: { length: "190 cm", width: "10 cm", height: "10 cm" },
    tone: "from-amber-300 via-orange-200 to-amber-400",
  },
  {
    id: "viga-interior-vig003",
    name: "Viga Interior VIG-003",
    sku: "VIG003",
    category: "Vigas & panel piedra",
    subcategory: "Vigas interiores",
    price: 2480,
    description: "Viga acabado roble claro para diseños costeros y estilo mediterráneo.",
    dimensions: { length: "190 cm", width: "10 cm", height: "10 cm" },
    tone: "from-amber-100 via-amber-50 to-orange-100",
  },
  {
    id: "panel-piedra-mon001",
    name: "Panel Piedra PU MON-001",
    sku: "MON001",
    category: "Vigas & panel piedra",
    subcategory: "Panel piedra PU",
    price: 1890,
    description: "Panel piedra blanco con relieve pronunciado ideal para lobbies luminosos.",
    dimensions: { length: "120 cm", width: "60 cm", thickness: "5 cm" },
    tone: "from-stone-200 via-stone-100 to-neutral-200",
  },
  {
    id: "panel-piedra-mon003",
    name: "Panel Piedra PU MON-003",
    sku: "MON003",
    category: "Vigas & panel piedra",
    subcategory: "Panel piedra PU",
    price: 1890,
    description: "Panel piedra gris oscuro que aporta dramatismo y contraste.",
    dimensions: { length: "120 cm", width: "60 cm", thickness: "5.8 cm" },
    tone: "from-slate-500 via-slate-400 to-slate-600",
  },
  {
    id: "panel-piedra-mon001-58",
    name: "Panel Piedra PU MON-001 5.8",
    sku: "MON001-58",
    category: "Vigas & panel piedra",
    subcategory: "Panel piedra PU",
    price: 1890,
    description: "Versión de mayor relieve del panel blanco para composiciones volumétricas.",
    dimensions: { length: "120 cm", width: "60 cm", thickness: "5.8 cm" },
    tone: "from-stone-100 via-stone-50 to-neutral-200",
  },
  {
    id: "lambrin-exterior-kl100",
    name: "Lambrín Exterior KL-100",
    sku: "101",
    category: "Lambrín exterior & deck",
    subcategory: "Lambrín exterior",
    price: 1620,
    description: "Lambrín exterior acabado nogal oscuro con protección UV.",
    dimensions: { length: "290 cm", width: "19 cm", thickness: "2.0 cm" },
    tone: "from-amber-400 via-amber-300 to-orange-500",
  },
  {
    id: "lambrin-exterior-kl101",
    name: "Lambrín Exterior KL-101",
    sku: "102",
    category: "Lambrín exterior & deck",
    subcategory: "Lambrín exterior",
    price: 1620,
    description: "Lambrín exterior tono miel con veta pronunciada.",
    dimensions: { length: "290 cm", width: "19 cm", thickness: "2.0 cm" },
    tone: "from-amber-200 via-amber-100 to-orange-200",
  },
  {
    id: "deck-kl102",
    name: "Deck KL-102",
    sku: "103",
    category: "Lambrín exterior & deck",
    subcategory: "Deck",
    price: 1980,
    description: "Deck tono café profundo para terrazas de alto tránsito.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "2.5 cm" },
    tone: "from-stone-500 via-stone-400 to-stone-600",
  },
  {
    id: "deck-kl104",
    name: "Deck KL-104",
    sku: "104",
    category: "Lambrín exterior & deck",
    subcategory: "Deck",
    price: 1980,
    description: "Deck tono arena con diseño de veta suave.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "2.5 cm" },
    tone: "from-amber-100 via-yellow-50 to-amber-200",
  },
  {
    id: "deck-kl103",
    name: "Deck KL-103",
    sku: "105",
    category: "Lambrín exterior & deck",
    subcategory: "Deck",
    price: 1980,
    description: "Deck tono ébano con veta marcada para proyectos contemporáneos.",
    dimensions: { length: "290 cm", width: "15 cm", thickness: "2.5 cm" },
    tone: "from-neutral-600 via-neutral-700 to-neutral-800",
  },
  {
    id: "protector-esquinero-exterior",
    name: "Protector Esquinero Exterior",
    sku: "106",
    category: "Lambrín exterior & deck",
    subcategory: "Accesorios",
    price: 460,
    description: "Perfil protector para esquinas expuestas con acabado exterior resistente.",
    dimensions: { length: "290 cm", width: "5 cm", thickness: "2.0 cm" },
    tone: "from-stone-200 via-stone-100 to-stone-300",
  },
  {
    id: "panel-pvc-001",
    name: "Panel PVC Alto Brillo #001",
    sku: "001",
    category: "Panel PVC alto brillo",
    price: 1450,
    description: "Panel estilo mármol blanco con vetas grises de alto brillo.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-stone-100 via-stone-50 to-stone-200",
  },
  {
    id: "panel-pvc-002",
    name: "Panel PVC Alto Brillo #002",
    sku: "002",
    category: "Panel PVC alto brillo",
    price: 1450,
    description: "Panel blanco sólido para dar luminosidad extrema a muros y plafones.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-slate-50 via-white to-slate-100",
  },
  {
    id: "panel-pvc-003",
    name: "Panel PVC Alto Brillo #003",
    sku: "003",
    category: "Panel PVC alto brillo",
    price: 1480,
    description: "Panel negro absoluto de alto brillo para acentos dramáticos.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-neutral-700 via-neutral-900 to-neutral-700",
  },
  {
    id: "panel-pvc-007",
    name: "Panel PVC Alto Brillo #007",
    sku: "007",
    category: "Panel PVC alto brillo",
    price: 1480,
    description: "Panel mármol gris con vetas diagonales en alto brillo.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-slate-200 via-slate-100 to-slate-300",
  },
  {
    id: "panel-pvc-004",
    name: "Panel PVC Alto Brillo #004",
    sku: "004",
    category: "Panel PVC alto brillo",
    price: 1480,
    description: "Panel ónix blanco dorado con vetas dramáticas en alto brillo.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-amber-100 via-amber-50 to-amber-200",
  },
  {
    id: "panel-pvc-015",
    name: "Panel PVC Alto Brillo #015",
    sku: "015",
    category: "Panel PVC alto brillo",
    price: 1520,
    description: "Panel mármol crema con vetas doradas para espacios sofisticados.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-amber-200 via-amber-100 to-stone-100",
  },
  {
    id: "panel-pvc-cl",
    name: "Panel PVC Alto Brillo C-L",
    sku: "C-L",
    category: "Panel PVC alto brillo",
    price: 1520,
    description: "Panel ónix ámbar translúcido para efectos luminosos.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-amber-300 via-amber-200 to-orange-300",
  },
  {
    id: "panel-pvc-c16",
    name: "Panel PVC Alto Brillo C16",
    sku: "C16",
    category: "Panel PVC alto brillo",
    price: 1500,
    description: "Panel mosaico gris que aporta textura y brillo con patrón cuadriculado.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-slate-300 via-slate-200 to-slate-400",
  },
  {
    id: "panel-pvc-017",
    name: "Panel PVC Alto Brillo 017",
    sku: "017",
    category: "Panel PVC alto brillo",
    price: 1500,
    description: "Panel mármol gris medio con vetas suaves.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-slate-200 via-slate-100 to-slate-300",
  },
  {
    id: "panel-pvc-018",
    name: "Panel PVC Alto Brillo 018",
    sku: "018",
    category: "Panel PVC alto brillo",
    price: 1500,
    description: "Panel mármol gris azulado con profundidad y contraste.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-slate-400 via-slate-300 to-slate-500",
  },
  {
    id: "panel-pvc-025",
    name: "Panel PVC Alto Brillo 025",
    sku: "025",
    category: "Panel PVC alto brillo",
    price: 1480,
    description: "Panel blanco absoluto con brillo espejo para proyectos minimalistas.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-white via-slate-50 to-white",
  },
  {
    id: "panel-pvc-026",
    name: "Panel PVC Alto Brillo 026",
    sku: "026",
    category: "Panel PVC alto brillo",
    price: 1480,
    description: "Panel mármol blanco gris con vetas dramáticas.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-stone-200 via-stone-100 to-stone-300",
  },
  {
    id: "panel-pvc-c33",
    name: "Panel PVC Alto Brillo C33",
    sku: "C33",
    category: "Panel PVC alto brillo",
    price: 1500,
    description: "Panel madera dorada brillante para proyectos cálidos con personalidad.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-amber-300 via-amber-200 to-orange-300",
  },
  {
    id: "panel-pvc-037",
    name: "Panel PVC Alto Brillo 037",
    sku: "037",
    category: "Panel PVC alto brillo",
    price: 1500,
    description: "Panel madera ámbar claro con textura lineal brillante.",
    dimensions: { length: "280 cm", width: "122 cm", thickness: "0.3 cm" },
    tone: "from-amber-200 via-amber-100 to-orange-200",
  },
];

const defaultFeatures: Record<string, string[]> = {
  "Follaje artificial": [
    "Material con protección UV",
    "Sistema modular para instalación rápida",
    "Ideal para muros verdes, exhibidores y eventos",
  ],
  "Lambrín interior": [
    "Cuerpo ligero de instalación sencilla",
    "Ayuda al control acústico del espacio",
    "Compatible con perfilería oculta y accesorios Tepeyak",
  ],
  "Esquinero interior": [
    "Perfiles listos para rematar lambrines",
    "Acabados coordinados con la colección",
    "Instalación con adhesivo de montaje o tornillería",
  ],
  "Vigas & panel piedra": [
    "Acabados hiperrealistas en poliuretano ligero",
    "Resistentes a humedad y fácil limpieza",
    "Se instalan con adhesivo estructural o taquetes",
  ],
  "Lambrín exterior & deck": [
    "Protección UV de grado arquitectónico",
    "Superficie antiderrapante y de bajo mantenimiento",
    "Resisten lluvia, sol y cambios de temperatura",
  ],
  "Panel PVC alto brillo": [
    "Espesor 3 mm con superficie de alto brillo",
    "Formato 280 x 122 cm perfecto para grandes superficies",
    "Se instala con adhesivo de contacto y sellador perimetral",
  ],
};

const currencyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const lambrinVisualBySubtype: Record<string, { image: string; alt: string }> = {
  "6 secciones": {
    image: "/catalogo/lambrin-6.svg",
    alt: "Lambrín Tepeyak de seis secciones ilustrado",
  },
  "4 secciones": {
    image: "/catalogo/lambrin-4.svg",
    alt: "Lambrín Tepeyak de cuatro secciones ilustrado",
  },
};

const productVisualByCategory: Record<string, { image: string; alt: string }> = {
  "Follaje artificial": {
    image: "/catalogo/follaje.svg",
    alt: "Panel de follaje artificial del catálogo Tepeyak",
  },
  "Lambrín interior": {
    image: "/catalogo/lambrin-6.svg",
    alt: "Lambrín interior Tepeyak",
  },
  "Esquinero interior": {
    image: "/catalogo/esquinero.svg",
    alt: "Esquinero coordinado para lambrines Tepeyak",
  },
  "Vigas & panel piedra": {
    image: "/catalogo/vigas-piedra.svg",
    alt: "Vigas y paneles tipo piedra del catálogo Tepeyak",
  },
  "Lambrín exterior & deck": {
    image: "/catalogo/deck-exterior.svg",
    alt: "Lambrín y deck exterior Tepeyak",
  },
  "Panel PVC alto brillo": {
    image: "/catalogo/panel-pvc.svg",
    alt: "Panel PVC alto brillo Tepeyak",
  },
};

function resolveProductVisual(product: Product) {
  if (product.category === "Lambrín interior" && product.subcategory) {
    const visual = lambrinVisualBySubtype[product.subcategory];
    if (visual) {
      return visual;
    }
  }

  return (
    productVisualByCategory[product.category] ?? {
      image: "/catalogo/default.svg",
      alt: `Ilustración representativa de ${product.name} del catálogo Tepeyak`,
    }
  );
}

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  items: Array<CartItem & { product: Product }>;
  onUpdateQty: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div
      className={clsx(
        "fixed inset-y-0 right-0 z-40 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="text-lg font-semibold">Tu carrito</h2>
          <button
            onClick={onClose}
            className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
          >
            Cerrar
          </button>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <p className="text-sm text-neutral-500">
              Aún no has agregado productos. Explora el catálogo y agrega tus favoritos para solicitar cotización.
            </p>
          ) : (
            items.map((item) => {
              const visual = resolveProductVisual(item.product);
              return (
                <article key={item.productId} className="flex gap-4 rounded-2xl border border-neutral-200 p-4">
                  <figure className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <div
                      className={clsx(
                        "absolute inset-0 bg-gradient-to-br opacity-80",
                        item.product.tone
                      )}
                      aria-hidden
                    />
                    <img
                      src={visual.image}
                      alt={visual.alt}
                      className="relative h-full w-full object-cover"
                      loading="lazy"
                    />
                  </figure>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-neutral-800">{item.product.name}</h3>
                      <span className="text-sm font-medium text-neutral-500">SKU {item.product.sku}</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-500">{currencyFormatter.format(item.product.price)}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        className="h-8 w-8 rounded-full border border-neutral-300 text-lg leading-none text-neutral-700 hover:bg-neutral-100"
                        onClick={() => onUpdateQty(item.productId, Math.max(1, item.quantity - 1))}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <button
                        className="h-8 w-8 rounded-full border border-neutral-300 text-lg leading-none text-neutral-700 hover:bg-neutral-100"
                        onClick={() => onUpdateQty(item.productId, item.quantity + 1)}
                        aria-label="Incrementar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => onRemove(item.productId)}
                      className="text-sm font-medium text-rose-500 hover:text-rose-600"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </article>
              );
            })
          )}
        </div>
        <div className="border-t border-neutral-200 bg-neutral-50 px-6 py-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Subtotal</span>
            <span className="text-base font-semibold text-neutral-900">{currencyFormatter.format(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-neutral-500">
            El equipo comercial te contactará para confirmar existencias, tiempos de entrega y costos de envío.
          </p>
          <button className="mt-4 w-full rounded-full bg-neutral-900 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800">
            Solicitar cotización
          </button>
        </div>
      </div>
    </div>
  );
}

type ProductModalProps = {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
};

function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const features = product.features ?? defaultFeatures[product.category] ?? [];
  const visual = resolveProductVisual(product);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-black/50" aria-hidden onClick={onClose} />
      <article className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-[240px,1fr]">
          <figure className="relative overflow-hidden">
            <div className={clsx("absolute inset-0 bg-gradient-to-br", product.tone)} aria-hidden />
            <img
              src={visual.image}
              alt={visual.alt}
              className="relative h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 space-y-2 bg-black/40 p-6 text-white backdrop-blur">
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-[0.25em]">
                {product.category}
              </span>
              <h3 className="text-2xl font-semibold leading-tight">{product.name}</h3>
              <p className="text-sm text-white/80">SKU {product.sku}</p>
              <p className="text-sm text-white/80">
                {product.subcategory ? `${product.subcategory} · ` : ""}
                {currencyFormatter.format(product.price)}
              </p>
            </figcaption>
          </figure>
          <div className="p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="max-w-xl text-sm text-neutral-600">{product.description}</p>
              <button
                onClick={onClose}
                className="rounded-full border border-neutral-200 px-3 py-1 text-sm text-neutral-500 hover:bg-neutral-100"
              >
                Cerrar
              </button>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              {product.dimensions.length && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-neutral-400">Largo</dt>
                  <dd className="font-medium text-neutral-800">{product.dimensions.length}</dd>
                </div>
              )}
              {product.dimensions.width && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-neutral-400">Ancho</dt>
                  <dd className="font-medium text-neutral-800">{product.dimensions.width}</dd>
                </div>
              )}
              {product.dimensions.thickness && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-neutral-400">Espesor</dt>
                  <dd className="font-medium text-neutral-800">{product.dimensions.thickness}</dd>
                </div>
              )}
              {product.dimensions.height && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-neutral-400">Alto</dt>
                  <dd className="font-medium text-neutral-800">{product.dimensions.height}</dd>
                </div>
              )}
              {product.dimensions.depth && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-neutral-400">Profundidad</dt>
                  <dd className="font-medium text-neutral-800">{product.dimensions.depth}</dd>
                </div>
              )}
              {product.finish && (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-neutral-400">Acabado</dt>
                  <dd className="font-medium text-neutral-800">{product.finish}</dd>
                </div>
              )}
            </dl>
            {features.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-[0.2em] text-neutral-400">Detalles clave</h4>
                <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 text-neutral-400">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-200 pt-6">
              <div className="text-sm">
                <p className="font-semibold text-neutral-900">{currencyFormatter.format(product.price)}</p>
                <p className="text-neutral-500">Precios expresados por pieza antes de envío.</p>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.status === "sold-out"}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition",
                  product.status === "sold-out"
                    ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                )}
              >
                {product.status === "sold-out" ? "No disponible" : "Agregar al carrito"}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Hero() {
  return (
    <header
      className="relative overflow-hidden rounded-3xl border border-white/40 bg-neutral-900 px-8 py-14 text-white shadow-2xl"
      style={{ backgroundImage: "url('/Fondo.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-neutral-900/80" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_65%)]" aria-hidden />
      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]">
            Junio 2025 · Colección Villa Cerezo
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Experiencia showroom Villa Cerezo con recubrimientos premium <span className="text-amber-300">Tepeyak</span>
          </h1>
          <p className="text-base text-white/80 sm:text-lg">
            Somos la casa de diseño de Villa Cerezo en Saltillo. Explora el catálogo oficial, descubre los acabados Tepeyak
            disponibles y arma tu selección para recibir asesoría personalizada y una cotización inmediata.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                📍
              </span>
              Blvd. Nazario Ortiz Garza 835, El Olmo, 25280 Saltillo, Coah.
            </p>
            <p className="flex items-center gap-2">
              <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                📞
              </span>
              844-870-8183
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-6 text-sm text-white/80 backdrop-blur">
          <p className="text-xs uppercase tracking-widest text-white/60">Atención a proyectos</p>
          <p className="text-lg font-semibold text-white">Agenda una visita al showroom</p>
          <p>Envíos nacionales, asesoría personalizada y soporte postventa con expertos Villa Cerezo.</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <a
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-emerald-300"
              href="https://wa.me/528448708183"
              target="_blank"
              rel="noreferrer"
            >
              <span aria-hidden>💬</span>
              WhatsApp
            </a>
            <a
              className="inline-flex flex-1 items-center justify-center rounded-full bg-amber-300 px-5 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-amber-200"
              href="tel:528448708183"
            >
              Llamar ahora
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

type ProductCardProps = {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

function ProductCard({ product, onSelect, onAddToCart }: ProductCardProps) {
  const visual = resolveProductVisual(product);
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">{product.category}</span>
          <h3 className="mt-2 text-xl font-semibold text-neutral-900">{product.name}</h3>
          <p className="text-sm text-neutral-500">SKU {product.sku}</p>
          {product.subcategory && <p className="mt-1 text-xs font-medium text-neutral-400">{product.subcategory}</p>}
        </div>
        <figure className="relative h-20 w-20 overflow-hidden rounded-2xl">
          <div className={clsx("absolute inset-0 bg-gradient-to-br", product.tone)} aria-hidden />
          <img src={visual.image} alt={visual.alt} className="relative h-full w-full object-cover" loading="lazy" />
        </figure>
      </div>
      <p className="mt-4 flex-1 text-sm text-neutral-600">{product.description}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
          {currencyFormatter.format(product.price)}
        </span>
        {product.badges?.map((badge) => (
          <span key={badge.label} className={clsx("rounded-full px-3 py-1 text-xs font-semibold", badge.tone)}>
            {badge.label}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 text-sm">
        <button
          onClick={() => onSelect(product)}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-neutral-200 px-4 py-2 font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
        >
          Ver detalles
        </button>
        <button
          onClick={() => onAddToCart(product)}
          disabled={product.status === "sold-out"}
          className={clsx(
            "inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold transition",
            product.status === "sold-out"
              ? "cursor-not-allowed bg-neutral-200 text-neutral-500"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
          )}
        >
          {product.status === "sold-out" ? "Agotado" : "Agregar"}
        </button>
      </div>
    </article>
  );
}

export default function App() {
  const categories = useMemo(() => Array.from(new Set(catalogo.map((product) => product.category))), []);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = useMemo(
    () => catalogo.filter((product) => product.category === selectedCategory),
    [selectedCategory]
  );

  const selectedProduct = useMemo(
    () => catalogo.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId]
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = catalogo.find((product) => product.id === item.productId);
          if (!product) return null;
          return { ...item, product };
        })
        .filter((item): item is CartItem & { product: Product } => Boolean(item)),
    [cart]
  );

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function handleAddToCart(product: Product) {
    if (product.status === "sold-out") return;
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
    setIsCartOpen(true);
  }

  function handleUpdateQty(productId: string, quantity: number) {
    setCart((prev) => prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
  }

  function handleRemove(productId: string) {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-100 pb-20">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <img
              src="/villa-cerezo-logo.svg"
              alt="Villa Cerezo"
              className="h-14 w-auto rounded-2xl border border-neutral-200 bg-white p-2 shadow-sm"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">
                Villa Cerezo · Distribuidor oficial Tepeyak
              </p>
              <p className="text-lg font-semibold text-neutral-900">Tienda virtual · Catálogo 2025</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/528448708183"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-400"
            >
              <span aria-hidden>💬</span>
              WhatsApp
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-3 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-300"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
                🛒
              </span>
              Carrito
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-amber-300 px-1 text-xs font-semibold text-neutral-900">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-10">
          <Hero />
        </div>

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-neutral-900">Explora por categoría</h2>
            <p className="text-sm text-neutral-500">
              Selecciona un segmento para ver todos los productos disponibles inspirados en el catálogo Junio 2025.
            </p>
          </div>
          <nav className="mt-6 flex w-full gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={clsx(
                  "whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition",
                  selectedCategory === category
                    ? "bg-neutral-900 text-white shadow"
                    : "bg-white text-neutral-600 hover:bg-neutral-100"
                )}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(item) => setSelectedProductId(item.id)}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </section>

        <footer className="mt-16 rounded-3xl bg-white/70 p-8 text-sm text-neutral-500 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Contacto Villa Cerezo</p>
              <p className="mt-2 text-lg font-semibold text-neutral-900">hola@villacerezo.mx · 844-870-8183</p>
              <p className="mt-1 max-w-xl">
                Somos distribuidores oficiales Tepeyak en Coahuila. Cotizaciones personalizadas, proyectos especiales y
                asesoría integral para arquitectos, diseñadores y constructoras.
              </p>
            </div>
            <div className="flex gap-4 text-xs text-neutral-400">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>LinkedIn</span>
            </div>
          </div>
        </footer>
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
