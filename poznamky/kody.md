```js
// js/data.js
const nexusData = {
  config: {
    user: "DUŠAN FAJNOR",
    alias: "GENERAL SERGEANT",
    version: "3.3-PRO-CONTENT",
  },
  // Nová sekcia pre tvoje certifikáty
  skills: [
    // ITNETWORK (8 certifikátov)
    {
      id: "ITN-01",
      name: "User Experience (UX)",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_User_Experience_UX.pdf",
      category: "Design",
    },
    {
      id: "ITN-02",
      name: "Teorie algoritmů",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Teorie_algoritmu.pdf",
      category: "CS",
    },
    {
      id: "ITN-03",
      name: "Základní konstrukce C# .NET",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Zakladni_konstrukce_jazyka_C_.NET.pdf",
      category: "Dev",
    },
    {
      id: "ITN-04",
      name: "Responzivní webdesign",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Responzivni_webdesign.pdf",
      category: "Web",
    },
    {
      id: "ITN-05",
      name: "Webové stránky krok za krokem",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Webove_stranky_krok_za_krokem.pdf",
      category: "Web",
    },
    {
      id: "ITN-06",
      name: "Microsoft Excel - Základy",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Zaklady_Microsoft_Excel.pdf",
      category: "Office",
    },
    {
      id: "ITN-07",
      name: "Microsoft Word - Základy",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Zaklady_Microsoft_Word.pdf",
      category: "Office",
    },
    {
      id: "ITN-08",
      name: "Microsoft Word - Pokročilý",
      issuer: "ITnetwork",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Microsoft_Word_pro_pokrocile.pdf",
      category: "Office",
    },

    // SKILLMEA - TOP VÝBER (29 certifikátov)
    {
      id: "SM-01",
      name: "CSS Preprocesory (SASS)",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-css-preprocesory-sass.pdf",
      category: "Web",
    },
    {
      id: "SM-02",
      name: "Webrebel 1 (HTML, CSS, JS)",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-webrebel-1-html-css-javascript.pdf",
      category: "Web",
    },
    {
      id: "SM-03",
      name: "Debordelizácia hlavy",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-debordelizacia-hlavy.pdf",
      category: "Mindset",
    },
    {
      id: "SM-04",
      name: "Todoist: Maximalizuj produktivitu",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-todoist-maximalizuj-svoju-produktivitu.pdf",
      category: "Productivity",
    },
    {
      id: "SM-05",
      name: "Sila podvedomej mysle",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-sila-podvedomej-mysle.pdf",
      category: "Mindset",
    },
    {
      id: "SM-06",
      name: "Základy komunikačných zručností",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-zaklady-komunikacnych-zrucnosti.pdf",
      category: "Soft-Skills",
    },
    {
      id: "SM-07",
      name: "Zamestnanie vs. Podnikanie",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-zamestnanie-vs-podnikanie.pdf",
      category: "Finance",
    },
    {
      id: "SM-08",
      name: "Základy programovania a OOP",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-zaklady-programovania-a-oop.pdf",
      category: "Dev",
    },
    {
      id: "SM-09",
      name: "Vysoká škola sebamotivácie",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-vysoka-skola-sebamotivacie.pdf",
      category: "Mindset",
    },
    {
      id: "SM-10",
      name: "Vybuduj si sebavedomie - Hypnoterapia",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-vybuduj-si-sebavedomie-pomocou-hypnoterapie.pdf",
      category: "Mindset",
    },
    {
      id: "SM-11",
      name: "Stabilné osobné financie",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-stabilne-osobne-financie.pdf",
      category: "Finance",
    },
    {
      id: "SM-12",
      name: "Prečo sa v živote sabotujeme",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-preco-sa-v-zivote-sabotujeme.pdf",
      category: "Mindset",
    },
    {
      id: "SM-13",
      name: "Osobná inventúra",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-osobna-inventura.pdf",
      category: "Mindset",
    },
    {
      id: "SM-14",
      name: "Koučovacie princípy v praxi",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-od-snov-k-cielom-alebo-koucovacie-principy-v-praxi.pdf",
      category: "Mindset",
    },
    {
      id: "SM-15",
      name: "Mindful Eating",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-mindful-eating.pdf",
      category: "Mindset",
    },
    {
      id: "SM-16",
      name: "Meditácia za 21 dní",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-meditacia-za-21-dni.pdf",
      category: "Mindset",
    },
    {
      id: "SM-17",
      name: "Kto mi kradne čas",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-kto-mi-kradne-cas.pdf",
      category: "Productivity",
    },
    {
      id: "SM-18",
      name: "Finančná gramotnosť v kocke",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-financna-gramotnost-v-kocke.pdf",
      category: "Finance",
    },
    {
      id: "SM-19",
      name: "Digitálna sloboda",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-digitalna-sloboda.pdf",
      category: "Productivity",
    },
    {
      id: "SM-20",
      name: "Ako sa zbaviť trémy a strachov",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-sa-zbavit-tremy-a-strachov.pdf",
      category: "Soft-Skills",
    },
    {
      id: "SM-21",
      name: "Ako sa presadiť a byť úspešný",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-sa-presadit-a-byt-uspesny.pdf",
      category: "Soft-Skills",
    },
    {
      id: "SM-22",
      name: "Ako nájsť sebavedomie",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-najst-sebavedomie.pdf",
      category: "Mindset",
    },
    {
      id: "SM-23",
      name: "Mindfulness I",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-mindfulness-i.pdf",
      category: "Mindset",
    },
    {
      id: "SM-24",
      name: "Mindfulness II",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-mindfulness-ii.pdf",
      category: "Mindset",
    },
    {
      id: "SM-25",
      name: "Joga pre každého",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-joga-pre-kazdeho-cviky-pre-zdrave-telo-dych-a-mysel.pdf",
      category: "Mindset",
    },
    {
      id: "SM-26",
      name: "Efektívny Time Management",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-efektivny-time-management.pdf",
      category: "Productivity",
    },
    {
      id: "SM-27",
      name: "Financie a riadenie v nadhlade",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-financie-a-financne-riadenie-v-nadhlade.pdf",
      category: "Finance",
    },
    {
      id: "SM-28",
      name: "C# pre začiatočníkov",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-c-pre-zaciatocnikov.pdf",
      category: "Dev",
    },
    {
      id: "SM-29",
      name: "Reč tela - Základy",
      issuer: "Skillmea",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-rec-tela-zaklady.pdf",
      category: "Soft-Skills",
    },
  ],
  // js/data.js -> sekcia dimensions

  // js/data.js -> sekcia dimensions

  dimensions: {
    "01": {
      name: "identity",
      color: "#39FF14",
      role: "Personal Architecture",
      content: "Transformácia: Hlas Poznania → Hlas Pravdy. Eliminácia programov bežnej mysle. Budovanie MimoMysle.",
      quote: "Keď som, tak som, viem, že som."
      // proContent tu NESMIE byť, aby ID_01 bolo čisté
    },
    "02": {
      name: "workflow-leader",
      color: "#FFD700",
      content:
        "Leadership ZorbaBudha Protocol. Optimalizácia Outlook & Todoist.",
      quote: "Efektivita v prítomnosti.",
      proContent: (
        <div className="space-y-4 text-xs font-mono text-left">
          <p className="text-white/80">[ ARCHITECT_STRATEGY ]</p>
          <ul className="list-disc pl-4 space-y-2 opacity-70">
            <li>Inbox Zero: Spracovanie e-mailov ako toku energie.</li>
            <li>Todoist Mapping: Hierarchia úloh podľa energie.</li>
            <li>Digitálna sloboda: Minimalizácia notifikácií.</li>
          </ul>
          <a
            href="https://dusanfajnorbusiness-ui.github.io/Nexus_OS_Final31/"
            target="_blank"
            className="text-[#FFD700] underline uppercase mt-4 block"
          >
            OPEN_PROJECT_HUB_FINAL31 {"→"}
          </a>
        </div>
      ),
    },
    "03": {
      name: "cash-engine",
      color: "#FFAA00",
      role: "Wealth Management",
      content:
        "Kiyosaki mindset. Aktíva vs. Pasíva. Budovanie finančnej pevnosti.",
      quote: "Peniaze sú energia.",
      proContent: (
        <div className="space-y-4 text-xs font-mono text-left">
          <p className="text-white/80">[ FINANCIAL_ALGORITHM ]</p>
          <ul className="list-disc pl-4 space-y-2 opacity-70">
            <li>Cashflow Mastery: Príjmy {"\u003E"} Výdavky.</li>
            <li>
              Diferenciácia: Rozlíšenie medzi "zlým dlhom" a strategickým
              záväzkom.
            </li>
            <li>Debt Defragmentation: Protokol na konsolidáciu pasív.</li>
          </ul>
        </div>
      ),
    },
    "04": {
    name: "revenue-architect",
    color: "#E0A800",
    role: "System Scalability",
    content: "Revenue Model: Access Key (150€). Zero Friction predaj vedomostnej syntézy.",
    quote: "Systém pracuje za teba.",
    proContent: "LOAD_PAYWALL_MODULE" // TENTO TRIGGER OPRAVÍ TÚ CHYBU V ID_04
  },
    "05": {
      name: "asset-matrix",
      color: "#D4AF37",
      role: "Asset Allocation",
      content:
        "Dlhodobá hodnota. Alokácia kapitálu: 50% Aktíva, 30% Rezerva, 20% Rozvoj.",
      quote: "Budúcnosť je v číslach.",
      proContent: (
        <div className="space-y-4 text-xs font-mono text-left">
          <p className="text-white/80">[ ASSET_DISTRIBUTION_V1 ]</p>
          <div className="grid grid-cols-2 gap-4 border border-white/10 p-4 rounded bg-black/20">
            <div>50% Strategické Aktíva</div>
            <div>30% Likvidná Rezerva</div>
            <div>20% Systémový Rozvoj</div>
          </div>
        </div>
      ),
    },
    "06": {
      name: "data-absorber",
      color: "#BF00FF",
      role: "Knowledge Archive",
      content:
        "38 Certifikátov: ITnetwork (UX, Algoritmy, C#), Skillmea (WebRebel).",
      quote: "Neustály upgrade.",
      proContent: (
        <div className="space-y-4 text-xs font-mono text-left">
          <p className="text-white/80">[ LEARNING_ALGORITHM ]</p>
          <ul className="list-disc pl-4 space-y-2 opacity-70">
            <li>Sémantické učenie: Pochopenie významu slov.</li>
            <li>
              Systemické znalosti: Prepájanie matematických a duchovných prvkov.
            </li>
            <li>Explictné ukladanie: Transformácia vedomostí do systémov.</li>
          </ul>
        </div>
      ),
    },
    "07": {
      name: "skill-tree",
      color: "#8A2BE2",
      role: "Expert Status",
      content:
        "Systémové budovanie expertného statusu cez 38 certifikovaných modulov.",
      quote: "Upgrade nikdy nekončí.",
      proContent: (
        <div className="p-4 border border-purple-500/20 bg-purple-500/5 rounded text-left">
          <p className="text-[10px] uppercase tracking-widest text-purple-400 mb-2 font-black">
            Verified_Skills_Matrix
          </p>
          <p className="text-xs opacity-70 italic">
            Filtrujem kľúčové IT a Soft-skill certifikáty pre najvyššiu
            dôveryhodnosť.
          </p>
        </div>
      ),
    },
    "08": {
      name: "library-vault",
      color: "#00FFFF",
      role: "Synthetic Library",
      content: "Vedomostný archív 350 zväzkov. Odomknite kľúčom.",
      quote: "Knihy sú potrava pre ducha.",
      proContent: "LOAD_LIBRARY_MODULE",
    },
    "09": {
      name: "sergeant-core",
      color: "#FF003C",
      role: "Combat Mode",
      content:
        "Zombie Sergeant (CoD Zombies stratégia) & General Sergeant (YouTube).",
      quote: "Mission Start.",
      proContent: (
        <div className="space-y-6 text-xs font-mono text-left">
          <p className="text-white/80">[ STRATEGIC_COMBAT_LOG ]</p>
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded">
            <p className="mb-2">
              YouTube Content Creation: Tvorba videonahrávok od leta 2024.
            </p>
            <p className="opacity-60 italic">
              Zameranie: Herná prosperita a disciplína.
            </p>
          </div>
        </div>
      ),
    },
    "10": {
      name: "non-identity",
      color: "#0044FF",
      role: "Base Reset",
      content: "Boh je Ticho. Návrat k zdroju. Odpojenie od všetkých identít.",
      quote: "Návrat k zdroju."
      // proContent tu NESMIE byť, aby ID_10 bolo čisté
    }
  },
};
------------------------------------------------------------------

const { useState } = React;

// 1. MODUL: Library Display (Bez interného zamykania, o to sa postará DimensionWrapper)
const LibraryVault = () => {
  const authors = [
    {
      name: "OSHO",
      books: ["Nezávislá mysl", "Žiť podľa vlastných pravidiel"],
      color: "#00FFFF",
      synthesis:
        "Skutočná sloboda je sloboda byť sám sebou. MimoMysel je kľúč.",
    },
    {
      name: "DON MIGUEL RUIZ",
      books: ["Štyri dohody", "Hlas Poznania"],
      color: "#FF00FF",
      synthesis: "Tvoje slovo je tvoj nástroj stvorenia. Svet je sen.",
    },
    {
      name: "R. KIYOSAKI",
      books: ["Bohatý otec", "Cashflow kvadrant"],
      color: "#FFAA00",
      synthesis: "Finančná inteligencia je schopnosť rozlíšiť aktíva od pasív.",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6">
      {authors.map((a, i) => (
        <div
          key={i}
          className="p-6 bg-white/[0.03] border border-white/10 rounded-xl"
        >
          <h4
            className="font-black mb-2 tracking-tighter uppercase italic text-lg"
            style={{ color: a.color }}
          >
            {a.name}
          </h4>
          <p
            className="text-sm mb-4 text-white/90 italic border-l-2 pl-4"
            style={{ borderColor: a.color }}
          >
            {a.synthesis}
          </p>
        </div>
      ))}
    </div>
  );
};

// 2. MODUL: Gatekeeper (Strážca prístupu)
const DimensionWrapper = ({ id, children, proContent, color }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [key, setKey] = useState("");

  // Ak nie je proContent (ID 01, 10), systém vykreslí len FREE časť
  if (!proContent)
    return <div className="dimension-free-zone text-left">{children}</div>;

  return (
    <div className="space-y-4">
      {" "}
      {/* Znížený spacing z 12 na 4 */}
      <div className="dimension-free-zone text-left">{children}</div>
      {!unlocked ? (
        // Kompaktný Lock Box s Radarovou Dynamikou
        <div className="relative p-2 border border-dashed border-white/10 rounded-lg bg-black/60 mt-2 overflow-hidden max-w-sm">
          {/* 📡 RADAROVÝ VIZUÁL V POZADÍ */}
          <div className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none">
            <div
              className="radar-circle"
              style={{ borderColor: color, color: color }}
            ></div>
            <div
              className="radar-circle delay-1"
              style={{ borderColor: color, color: color }}
            ></div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-3 px-3 py-1">
            <div className="flex flex-col">
              <span
                className="text-[7px] font-mono tracking-[0.3em] opacity-50 uppercase italic"
                style={{ color: color }}
              >
                [ KEY_REQ ]
              </span>
            </div>

            <div className="flex items-center gap-2 flex-grow max-w-[180px]">
              <input
                type="password"
                placeholder="..."
                className="bg-transparent border-b border-white/10 text-center p-1 outline-none font-mono text-[10px] w-full focus:border-white/40 transition-all"
                onChange={(e) => setKey(e.target.value)}
              />
              <button
                onClick={() =>
                  key === "NEXUS-150-PRO" ? setUnlocked(true) : alert("DENIED")
                }
                className="px-4 py-1 text-[9px] font-black uppercase tracking-tighter transition-all hover:brightness-125 active:scale-95 shadow-lg"
                style={{ backgroundColor: color, color: "#000" }}
              >
                {" "}
                Verify{" "}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Odomknutý obsah (Zostáva zachovaný podľa tvojho vkladu)
        <div className="animate-in fade-in pt-4 mt-4 border-t border-white/10 text-left">
          <div
            className="text-[8px] font-mono mb-3 uppercase tracking-widest italic opacity-40"
            style={{ color: color }}
          >
            [ PRO_STREAM_ACTIVE ]
          </div>
          <div className="pro-content-area text-xs leading-normal">
            {proContent === "LOAD_LIBRARY_MODULE" ? (
              <LibraryVault />
            ) : proContent === "LOAD_PAYWALL_MODULE" ? (
              <PaywallModule />
            ) : (
              proContent
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 3. CORE: App Component
const App = () => {
  const [activeID, setActiveID] = useState("01");

  // POISTKA: Ak data.js zlyhá, systém nespadne
  if (!window.nexusData)
    return (
      <div className="p-20 text-red-500 font-mono">
        CRITICAL_ERROR: DATA_NODE_OFFLINE
      </div>
    );

  const current =
    window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];

  return (
    <div
      className="min-h-screen p-8 md:p-20 transition-all duration-700"
      style={{ borderLeft: `6px solid ${current.color}` }}
    >
      {/* HUD: Identity Badge */}
      <div className="fixed top-8 right-8 flex items-center gap-3 bg-black/80 p-3 px-5 rounded-full border border-white/10 z-50">
        <span
          className="text-[10px] font-mono tracking-widest"
          style={{ color: current.color }}
        >
          {window.nexusData.config.alias}
        </span>
        <div
          className="w-2.5 h-2.5 rounded-full pulse"
          style={{ backgroundColor: current.color }}
        />
      </div>

      <header className="mb-16">
        <div className="text-[10px] font-mono tracking-[0.4em] mb-4 opacity-40 uppercase">
          Protocol // {activeID}
        </div>
        <h1
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
          style={{ color: current.color }}
        >
          {current.name}
        </h1>
        <p className="mt-6 text-xl italic opacity-50 max-w-2xl">
          "{current.quote}"
        </p>
      </header>

      {/* Navigácia: 10 Dimenzií */}
      <nav className="flex flex-wrap gap-2 mb-20">
        {Object.keys(window.nexusData.dimensions)
          .sort((a, b) => a - b)
          .map((id) => (
            <button
              key={id}
              onClick={() => setActiveID(id)}
              className={`px-5 py-3 font-mono text-xs border transition-all ${activeID === id ? "scale-105" : "opacity-40"}`}
              style={{
                borderColor: window.nexusData.dimensions[id].color,
                color:
                  activeID === id
                    ? "#000"
                    : window.nexusData.dimensions[id].color,
                backgroundColor:
                  activeID === id
                    ? window.nexusData.dimensions[id].color
                    : "transparent",
              }}
            >
              {" "}
              ID_{id}{" "}
            </button>
          ))}
      </nav>

      <main className="max-w-4xl">
        <div className="p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md relative rounded-r-xl">
          <div
            className="absolute top-0 left-0 w-1.5 h-full"
            style={{ backgroundColor: current.color }}
          />
          <DimensionWrapper
            id={activeID}
            color={current.color}
            proContent={current.proContent}
          >
            {activeID === "07" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                {window.nexusData.skills.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 border border-white/5 bg-white/[0.02] rounded-lg"
                  >
                    <div className="text-[8px] opacity-30 font-mono uppercase mb-2">
                      {cert.issuer} // {cert.category}
                    </div>
                    <div className="text-xs font-bold uppercase">
                      {cert.name}
                    </div>
                    <a
                      href={cert.path}
                      target="_blank"
                      className="mt-3 block text-[9px] text-cyan-500/60 hover:text-cyan-400 font-mono underline uppercase"
                    >
                      Open_Document →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-2xl md:text-3xl font-light text-white/90 uppercase leading-snug">
                {current.content}
              </p>
            )}
            {current.link && (
              <a
                href={current.link}
                target="_blank"
                className="mt-6 block text-xs underline font-mono"
                style={{ color: current.color }}
              >
                OPEN_EXTERNAL_HUB →
              </a>
            )}
          </DimensionWrapper>
        </div>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```
