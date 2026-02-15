// js/data.js - MASTER DATA HUB v5.3
window.nexusData = {
  config: {
    version: "NEXUS_CORE v5.3",
    client: "D. FAJNOR // ARCHITECT",
    lastSync: "2026-02-12",
  },

  // Certifikáty a zručnosti (v5.3)
  skills: [
    // --- ITNETWORK NODE ---
    {
      id: 1,
      name: "Microsoft Word pro pokročilé",
      issuer: "ITnetwork",
      category: "Office",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Microsoft_Word_pro_pokrocile.pdf",
    },
    {
      id: 2,
      name: "Responzivní webdesign",
      issuer: "ITnetwork",
      category: "Dev",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Responzivni_webdesign.pdf",
    },
    {
      id: 3,
      name: "Teorie algoritmů",
      issuer: "ITnetwork",
      category: "CompSci",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Teorie_algoritmu.pdf",
    },
    {
      id: 4,
      name: "User Experience (UX)",
      issuer: "ITnetwork",
      category: "Design",
      path: "assets/certs/certifikatyITnetwork/Certifikat_User_Experience_UX.pdf",
    },
    {
      id: 5,
      name: "Webové stránky krok za krokem",
      issuer: "ITnetwork",
      category: "Dev",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Webove_stranky_krok_za_krokem.pdf",
    },
    {
      id: 6,
      name: "Základní konstrukce C# .NET",
      issuer: "ITnetwork",
      category: "Dev",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Zakladni_konstrukce_jazyka_C_.NET.pdf",
    },
    {
      id: 7,
      name: "Základy Microsoft Excel",
      issuer: "ITnetwork",
      category: "Office",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Zaklady_Microsoft_Excel.pdf",
    },
    {
      id: 8,
      name: "Základy Microsoft Word",
      issuer: "ITnetwork",
      category: "Office",
      path: "assets/certs/certifikatyITnetwork/Certifikat_Zaklady_Microsoft_Word.pdf",
    },

    // --- SKILLMEA NODE ---
    {
      id: 9,
      name: "Ako nájsť sebavedomie",
      issuer: "Skillmea",
      category: "Mindset",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-najst-sebavedomie.pdf",
    },
    {
      id: 10,
      name: "Ako sa presadiť a byť úspešný",
      issuer: "Skillmea",
      category: "Soft-Skills",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-sa-presadit-a-byt-uspesny.pdf",
    },
    {
      id: 11,
      name: "Ako sa zbaviť trémy a strachov",
      issuer: "Skillmea",
      category: "Mindset",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-ako-sa-zbavit-tremy-a-strachov.pdf",
    },
    {
      id: 12,
      name: "C# pre začiatočníkov",
      issuer: "Skillmea",
      category: "Dev",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-c-pre-zaciatocnikov.pdf",
    },
    {
      id: 13,
      name: "CSS preprocesory (SASS)",
      issuer: "Skillmea",
      category: "Dev",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-css-preprocesory-sass.pdf",
    },
    {
      id: 14,
      name: "Debordelizácia hlavy",
      issuer: "Skillmea",
      category: "Workflow",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-debordelizacia-hlavy.pdf",
    },
    {
      id: 15,
      name: "Digitálna sloboda",
      issuer: "Skillmea",
      category: "Lifestyle",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-digitalna-sloboda.pdf",
    },
    {
      id: 16,
      name: "Efektívny Time Management",
      issuer: "Skillmea",
      category: "Workflow",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-efektivny-time-management.pdf",
    },
    {
      id: 17,
      name: "Financie v nadhlade",
      issuer: "Skillmea",
      category: "Finance",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-financie-a-financne-riadenie-v-nadhlade.pdf",
    },
    {
      id: 18,
      name: "Finančná gramotnosť",
      issuer: "Skillmea",
      category: "Finance",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-financna-gramotnost-v-kocke.pdf",
    },
    {
      id: 20,
      name: "WebRebel 1 (HTML/CSS/JS)",
      issuer: "Skillmea",
      category: "Dev",
      path: "assets/certs/certifikatySkillmea/skillmea-certifikat-webrebel-1-html-css-javascript.pdf",
    },
  ],

  // Dimenzie a obsah (v5.3)
  dimensions: {
    "01": {
      name: "identity<span class='text-[10px] opacity-50'>| ID [eGo superEgo]</span>",
      color: "#39FF14",
      quote: "Keď som, tak som, viem, že som.",
      content: "Jadro, autenticita, 'Keď som, tak som.'",
      proContent: window.id01Data?.proContent || "OFFLINE",
      premiumContent: window.id01Data?.premiumContent || "OFFLINE",
    },

    // --- START GRADIENT BLOCK ---
    "02": {
      name: "workFlow-leader",
      color: "#FFEB3B",
      quote: "Efektivita v prítomnosti.",
      content: "Operatíva, výkon, denné úlohy.",
      proContent: window.id02Data?.proContent || "OFFLINE",
      premiumContent: window.id02Data?.premiumContent || "OFFLINE",
    },
    "03": {
      name: "cash-engine",
      color: "#FFD700",
      quote: "Peniaze sú palivo slobody.",
      content: "Správa toku peňazí a dlhov.",
      proContent: window.id03Data?.proContent || "OFFLINE",
      premiumContent: window.id03Data?.premiumContent || "OFFLINE",
    },
    "04": {
      name: "revenue-architect",
      color: "#FFAA00",
      quote: "Projektovanie zisku.",
      content: "Budovanie systémov a predaj Access Key.",
      proContent: window.id04Data?.proContent || "OFFLINE",
      premiumContent: window.id04Data?.premiumContent || "OFFLINE",
    },
    "05": {
      name: "asset-matrix",
      color: "#FF8C00",
      quote: "Tichý rast hodnôt.",
      content: "Dlhodobá stratégia a 'Kiyosaki mindset'.",
      proContent: window.id05Data?.proContent || "OFFLINE",
      premiumContent: window.id05Data?.premiumContent || "OFFLINE",
    },
    // --- END GRADIENT BLOCK ---

    "06": {
      name: "data-absorber",
      color: "#BF00FF",
      quote: "Nasávanie vedomostí ako procesor.",
      content: "Spracovanie 38 certifikátov a vedomostí.",
      proContent: window.id06Data?.proContent || "OFFLINE",
      premiumContent: window.id06Data?.premiumContent || "OFFLINE",
    },
    "07": {
      name: "skill-tree",
      color: "#8A2BE2",
      quote: "Vetvenie schopností.",
      content: "Kariérny status a Skill Tree (HTML/CSS).",
      proContent: window.id07Data?.proContent || "OFFLINE",
      premiumContent: window.id07Data?.premiumContent || "OFFLINE",
    },
    "08": {
      name: "empty-book",
      color: "#00FFFF",
      quote: "Čistá strana pre tvorbu.",
      content: "Absorpcia informácií, 'Prijímací režim'.",
      proContent: window.id08Data?.proContent || "OFFLINE",
      premiumContent: window.id08Data?.premiumContent || "OFFLINE",
    },
    "09": {
      name: "sergeant-core",
      color: "#FF003C",
      quote: "Disciplína v akcii.",
      content: "CoD Zombies, YouTube, Akcia.",
      proContent: window.id09Data?.proContent || "OFFLINE",
      premiumContent: window.id09Data?.premiumContent || "OFFLINE",
    },
    10: {
      name: "non-identity",
      color: "#0044FF",
      quote: "Boh je Ticho.",
      content: "Ticho, Boh, Reset, Rodina, Základňa.",
      proContent: window.id10Data?.proContent || "OFFLINE",
      premiumContent: window.id10Data?.premiumContent || "OFFLINE",
    },
    11: {
      name: "the-recovery",
      color: "#FFBF00",
      quote: "Cesta von z Matrixu.",
      content: "Manifest Architekta. Ako von zo schizofrénie a insomnie.",
      proContent: window.id11Data?.proContent || "OFFLINE",
      premiumContent: window.id11Data?.premiumContent || "OFFLINE",
    },
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
    { id: "001", name: "D. FAJNOR", tier: "ARCHITECT", status: "ONLINE" },
    { id: "102", name: "SERGEANT_X", tier: "PREMIUM", status: "OFFLINE" },
    { id: "205", name: "GUEST_USER", tier: "FREE", status: "ONLINE" },
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
