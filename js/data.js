// js/data.js - MASTER DATA HUB v5.6 (Strategy Sync)
window.nexusData = {
  config: {
    version: "NEXUS_CORE v5.6",
    client: "D. FAJNOR // ARCHITECT",
    lastSync: "2026-02-15",
    mrr_target: "150€",
  },

  // Certifikáty a zručnosti (v5.7 - Full Ingestion)
  skills: [
    // --- ITNETWORK NODE (8 certifikátov) ---
    { id: 1, name: "Microsoft Word pro pokročilé", issuer: "ITnetwork", category: "Office", path: "assets/certs/certifikatyITnetwork/Certifikat_Microsoft_Word_pro_pokrocile.pdf" },
    { id: 2, name: "Responzivní webdesign", issuer: "ITnetwork", category: "Dev", path: "assets/certs/certifikatyITnetwork/Certifikat_Responzivni_webdesign.pdf" },
    { id: 3, name: "Teorie algoritmů", issuer: "ITnetwork", category: "CompSci", path: "assets/certs/certifikatyITnetwork/Certifikat_Teorie_algoritmu.pdf" },
    { id: 4, name: "User Experience (UX)", issuer: "ITnetwork", category: "Design", path: "assets/certs/certifikatyITnetwork/Certifikat_User_Experience_UX.pdf" },
    { id: 5, name: "Webové stránky krok za krokem", issuer: "ITnetwork", category: "Dev", path: "assets/certs/certifikatyITnetwork/Certifikat_Webove_stranky_krok_za_krokem.pdf" },
    { id: 6, name: "Základní konstrukce C# .NET", issuer: "ITnetwork", category: "Dev", path: "assets/certs/certifikatyITnetwork/Certifikat_Zakladni_konstrukce_jazyka_C_.NET.pdf" },
    { id: 7, name: "Základy Microsoft Excel", issuer: "ITnetwork", category: "Office", path: "assets/certs/certifikatyITnetwork/Certifikat_Zaklady_Microsoft_Excel.pdf" },
    { id: 8, name: "Základy Microsoft Word", issuer: "ITnetwork", category: "Office", path: "assets/certs/certifikatyITnetwork/Certifikat_Zaklady_Microsoft_Word.pdf" },

    // --- SKILLMEA NODE (30 certifikátov) ---
    { id: 9, name: "Ako nájsť sebavedomie", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-najst-sebavedomie.pdf" },
    { id: 10, name: "Ako sa presadiť a byť úspešný", issuer: "Skillmea", category: "Soft-Skills", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-sa-presadit-a-byt-uspesny.pdf" },
    { id: 11, name: "Ako sa zbaviť trémy a strachov", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-sa-zbavit-tremy-a-strachov.pdf" },
    { id: 12, name: "C# pre začiatočníkov", issuer: "Skillmea", category: "Dev", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-c-pre-zaciatocnikov.pdf" },
    { id: 13, name: "CSS preprocesory (SASS)", issuer: "Skillmea", category: "Dev", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-css-preprocesory-sass.pdf" },
    { id: 14, name: "Debordelizácia hlavy", issuer: "Skillmea", category: "Workflow", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-debordelizacia-hlavy.pdf" },
    { id: 15, name: "Digitálna sloboda", issuer: "Skillmea", category: "Lifestyle", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-digitalna-sloboda.pdf" },
    { id: 16, name: "Efektívny Time Management", issuer: "Skillmea", category: "Workflow", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-efektivny-time-management.pdf" },
    { id: 17, name: "Financie v nadhlade", issuer: "Skillmea", category: "Finance", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-financie-a-financne-riadenie-v-nadhlade.pdf" },
    { id: 18, name: "Finančná gramotnosť v kocke", issuer: "Skillmea", category: "Finance", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-financna-gramotnost-v-kocke.pdf" },
    { id: 19, name: "Joga pre každého", issuer: "Skillmea", category: "Lifestyle", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-joga-pre-kazdeho-cviky-pre-zdrave-telo-dych-a-mysel.pdf" },
    { id: 20, name: "Kto mi kradne čas", issuer: "Skillmea", category: "Workflow", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-kto-mi-kradne-cas.pdf" },
    { id: 21, name: "Meditácia za 21 dní", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-meditacia-za-21-dni.pdf" },
    { id: 22, name: "Mindful Eating", issuer: "Skillmea", category: "Lifestyle", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-mindful-eating.pdf" },
    { id: 23, name: "Mindfulness I", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-mindfulness-i.pdf" },
    { id: 24, name: "Mindfulness II", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-mindfulness-ii.pdf" },
    { id: 25, name: "Od snov k cieľom", issuer: "Skillmea", category: "Soft-Skills", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-od-snov-k-cielom-alebo-koucovacie-principy-v-praxi.pdf" },
    { id: 26, name: "Osobná inventúra", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-osobna-inventura.pdf" },
    { id: 27, name: "Prečo sa v živote sabotujeme", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-preco-sa-v-zivote-sabotujeme.pdf" },
    { id: 28, name: "Reč tela - základy", issuer: "Skillmea", category: "Soft-Skills", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-rec-tela-zaklady.pdf" },
    { id: 29, name: "Sila podvedomej mysle", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-sila-podvedomej-mysle.pdf" },
    { id: 30, name: "Stabilné osobné financie", issuer: "Skillmea", category: "Finance", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-stabilne-osobne-financie.pdf" },
    { id: 31, name: "Todoist: Maximalizuj produktivitu", issuer: "Skillmea", category: "Workflow", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-todoist-maximalizuj-svoju-produktivitu.pdf" },
    { id: 32, name: "Sebavedomie cez hypnoterapiu", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-vybuduj-si-sebavedomie-pomocou-hypnoterapie.pdf" },
    { id: 33, name: "Vysoká škola sebamotivácie", issuer: "Skillmea", category: "Mindset", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-vysoka-skola-sebamotivacie.pdf" },
    { id: 34, name: "WebRebel 1 (HTML/CSS/JS)", issuer: "Skillmea", category: "Dev", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-webrebel-1-html-css-javascript.pdf" },
    { id: 35, name: "Základy komunikačných zručností", issuer: "Skillmea", category: "Soft-Skills", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-zaklady-komunikacnych-zrucnosti.pdf" },
    { id: 36, name: "Základy programovania a OOP", issuer: "Skillmea", category: "Dev", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-zaklady-programovania-a-oop.pdf" },
    { id: 37, name: "Zamestnanie vs Podnikanie", issuer: "Skillmea", category: "Business", path: "assets/certs/certifikatySkillmea/skillmea-certifikat-zamestnanie-vs-podnikanie.pdf" },
    { id: 38, name: "System Architect Core", issuer: "NEXUS", category: "Master", path: "#" }
  ],
  // Dimenzie a obsah (v5.3)
  dimensions: {
    "01": {
      name: "identity",
      tag: "| ID [eGo - superEgo] / Personal [UI SPACE]",
      color: "#39FF14",
      quote: "Keď som, tak som, viem, že som.",
      content: "Jadro, autenticita, 'Keď som, tak som.'",
    },
    "02": {
      name: "workFlow-leader",
      tag: "| process [management] / action [protocol]",
      color: "#FFEB3B",
      quote: "Efektivita v prítomnosti.",
      content: "Operatíva, výkon, denné úlohy. Dashboard v3.1 v akcii.",
    },
    "03": {
      name: "cash-engine",
      tag: "| fuel [liquidity] / flow [control]",
      color: "#FFD700",
      quote: "Peniaze sú palivo slobody.",
      content: "Správa toku peňazí a eliminácia dlhov.",
    },
    "04": {
      name: "revenue-architect",
      tag: "| system [design] / growth [scaling]",
      color: "#FFAA00",
      quote: "Projektovanie zisku.",
      content: "Budovanie biznis modelov a správa Access Keys (150€ MRR).",
    },
    "05": {
      name: "asset-matrix",
      tag: "| wealth [accumulation] / kiyosaki [mindset]",
      color: "#FF8C00",
      quote: "Tichý rast hodnôt.",
      content: "Dlhodobá stratégia, aktíva a ochrana majetku.",
    },
    "06": {
      name: "data-absorber",
      tag: "| ingestion [38_certs] / processor [knowledge]",
      color: "#BF00FF",
      quote: "Nasávanie vedomostí ako procesor.",
      content: "Spracovanie 38 certifikátov (ITnetwork/Skillmea) a OneNote dumpu.",
    },
    "07": {
      name: "skill-tree",
      tag: "| branching [expertize] / code [html_css_js]",
      color: "#8A2BE2",
      quote: "Vetvenie schopností.",
      content: "Profesionálny status a expertíza v SCSS Architecture.",
    },
    "08": {
      name: "empty-book",
      tag: "| knowledge [codex] / reader [ui space]",
      color: "#00FFFF",
      quote: "Čistá strana pre tvorbu.",
      content: "Absorpcia informácií. Osho, Ruiz, Tole.",
    },
    "09": {
      name: "sergeant-core",
      tag: "| combat [discipline] / media [yt_zombies]",
      color: "#FF003C",
      quote: "Disciplína v akcii.",
      content: "CoD Zombies, YouTube, eliminácia chaosu.",
    },
    "10": {
      name: "non-identity",
      tag: "| silence [god] / reset [base]",
      color: "#0044FF",
      quote: "Boh je Ticho.",
      content: "Reset, rodina, základňa a duchovný mier.",
    },
    "11": {
      name: "the-recovery",
      tag: "| legacy [manifest] / matrix [exit]",
      color: "#FFBF00",
      quote: "Cesta von z Matrixu.",
      content: "Prednášky o prekonaní schizofrénie a insomnie. MimoMysle.",
    }
  },
  // Užívateľské údaje a systémové nastavenia(v5.3)
  currentUser: {
    name: "D. FAJNOR",
    tier: "ARCHITECT",
    subscription: "LIFETIME_ACCESS",
    tier_level: 999,
  },
  // Užívateľské údaje a systémové nastavenia (v5.3)
  users: [
    { id: "001", name: "NEXUS-CORE_2Mb", tier: "ARCHITECT", status: "ONLINE" },
    { id: "102", name: "PREMIUM USER", tier: "PREMIUM", status: "OFFLINE" },
    { id: "205", name: "PRO USER", tier: "PRO", status: "ONLINE" },
    { id: "305", name: "GUEST_USER", tier: "FREE", status: "ONLINE" },
  ],
  // Systémové nastavenia a ciele (v5.3)
  system_config: {
    version: "1.3 (Safety & Performance Protocol)",
    security: {
      key_pro: "NEXUS-150-PRO",
      key_premium: "NEXUS-999-PREMIUM",
      key_admin: "NEXUS-OMEGA-OVRD",
    },
    mrr_target: "150€ (5 Users)",
    web_status: "LIVE",
  },
};
