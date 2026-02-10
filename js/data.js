window.nexusData = {
  config: {
    user: "DUŠAN FAJNOR",
    alias: "GENERAL SERGEANT",
    version: "5.0-MODULAR",
  },
  skills: [
    // ... tu nechaj svoj zoznam 38 certifikátov, ktoré si mi poslal ...
    { id: "ITN-01", name: "User Experience (UX)", issuer: "ITnetwork", path: "assets/certs/certifikatyITnetwork/Certifikat_User_Experience_UX.pdf", category: "Design" },
    // (ostatné certifikáty ponechať)
  ],
  dimensions: {
    dimensions: {
  "01": {
    name: "identity",
    color: "#39FF14",
    role: "Personal Architecture",
    content: "Transformácia: Hlas Poznania → Hlas Pravdy. Eliminácia programov bežnej mysle. Budovanie MimoMysle.",
    quote: "Keď som, tak som, viem, že som.",
    // TOTO JE KĽÚČOVÁ ZMENA:
    proContent: window.id01Data ? window.id01Data.proContent : null
  },
    "02": {
      name: "workflow-leader", color: "#FFD700",
      content: "Leadership ZorbaBudha Protocol. Optimalizácia Outlook & Todoist.",
      quote: "Efektivita v prítomnosti.",
      proContent: window.id02Content
    },
    "03": {
      name: "cash-engine", color: "#FFAA00", role: "Wealth Management",
      content: "Kiyosaki mindset. Aktíva vs. Pasíva. Budovanie finančnej pevnosti.",
      quote: "Peniaze sú energia.",
      proContent: window.id03Content
    },
    "04": {
      name: "revenue-architect", color: "#E0A800", role: "System Scalability",
      content: "Revenue Model: Access Key (150€). Zero Friction predaj vedomostnej syntézy.",
      quote: "Systém pracuje za teba.",
      proContent: "LOAD_PAYWALL_MODULE" 
    },
    "05": {
      name: "asset-matrix", color: "#D4AF37", role: "Asset Allocation",
      content: "Dlhodobá hodnota. Alokácia kapitálu: 50% Aktíva, 30% Rezerva, 20% Rozvoj.",
      quote: "Budúcnosť je v číslach.",
      proContent: window.id05Content
    },
    "06": {
      name: "data-absorber", color: "#BF00FF", role: "Knowledge Archive",
      content: "38 Certifikátov: ITnetwork (UX, Algoritmy, C#), Skillmea (WebRebel).",
      quote: "Neustály upgrade.",
      proContent: window.id06Content
    },
    "07": {
      name: "skill-tree", color: "#8A2BE2", role: "Expert Status",
      content: "Systémové budovanie expertného statusu cez 38 certifikovaných modulov.",
      quote: "Upgrade nikdy nekončí.",
      proContent: window.id07Content
    },
    "08": {
      name: "library-vault", color: "#00FFFF", role: "Synthetic Library",
      content: "Vedomostný archív 350 zväzkov. Odomknite kľúčom.",
      quote: "Knihy sú potrava pre ducha.",
      proContent: "LOAD_LIBRARY_MODULE"
    },
    "09": {
      name: "sergeant-core", color: "#FF003C", role: "Combat Mode",
      content: "Zombie Sergeant (CoD Zombies stratégia) & General Sergeant (YouTube).",
      quote: "Mission Start.",
      proContent: window.id09Content
    },
    "10": {
      name: "non-identity", color: "#0044FF", role: "Base Reset",
      content: "Boh je Ticho. Návrat k zdroju. Odpojenie od všetkých identít.",
      quote: "Návrat k zdroju.",
      proContent: window.id10Content
    }
  }
};