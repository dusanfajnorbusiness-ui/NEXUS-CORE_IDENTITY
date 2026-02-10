// js/data.js - MASTER DATA HUB
window.nexusData = {
  config: { 
    version: "NEXUS_CORE v5.2", 
    client: "D. FAJNOR // ARCHITECT",
    lastSync: "2026-02-10"
  },
  
  // Zoznam certifikátov - mapované na tvoju reálnu štruktúru v assets/certs/
  skills: [
    { id: 1, name: "C# .NET Konstrukce", issuer: "ITnetwork", category: "Dev", date: "2024" },
    { id: 2, name: "Teorie Algoritmů", issuer: "ITnetwork", category: "Computer Science", date: "2024" },
    { id: 3, name: "Todoist Mastery", issuer: "Skillmea", category: "Workflow", date: "2024" },
    { id: 4, name: "Debordelizácia hlavy", issuer: "Skillmea", category: "Mindset", date: "2024" }
    // Tu môžeš doplniť zvyšných 34 podľa potreby...
  ],

  dimensions: {
    "01": {
      name: "identity",
      color: "#39FF14",
      quote: "Keď som, tak som, viem, že som.",
      content: "Transformácia: Hlas Poznania → Hlas Pravdy. Jadro tvojho operačného systému.",
      proContent: window.id01Data?.proContent || "ID_01_PRO_OFFLINE",
      premiumContent: window.id01Data?.premiumContent || "ID_01_PREM_OFFLINE",
    },
    "02": {
      name: "workFlow-leader",
      color: "#FFD700",
      quote: "Efektivita v prítomnosti.",
      content: "Leadership ZorbaBudha Protocol. Synchronizácia externého mozgu a ticha.",
      proContent: window.id02Data?.proContent || "ID_02_PRO_OFFLINE",
      premiumContent: window.id02Data?.premiumContent || "ID_02_PREM_OFFLINE",
    },
    "03": {
      name: "cash-engine",
      color: "#00BFFF",
      quote: "Peniaze sú palivo slobody.",
      content: "Asset-Matrix & Cashflow Logic. Architektúra tvojej finančnej nezávislosti.",
      proContent: window.id03Data?.proContent || "ID_03_PRO_OFFLINE",
      premiumContent: window.id03Data?.premiumContent || "ID_03_PREM_OFFLINE",
    },
    "04": {
      name: "revenue-architect",
      color: "#FF8C00",
      quote: "Projektovanie zisku.",
      content: "Knowledge-as-a-Service (KaaS) Model. Premena vedomostí na digitálny produkt.",
      proContent: window.id04Data?.proContent || "ID_04_PRO_OFFLINE",
      premiumContent: window.id04Data?.premiumContent || "ID_04_PREM_OFFLINE",
    },
    "05": {
      name: "asset-matrix",
      color: "#8A2BE2",
      quote: "Tichý rast hodnôt.",
      content: "Investičná sieť a akumulácia. Mapa tvojho bohatstva v digitálnom veku.",
      proContent: window.id05Data?.proContent || "ID_05_PRO_OFFLINE",
      premiumContent: window.id05Data?.premiumContent || "ID_05_PREM_OFFLINE",
    },
    "06": {
      name: "data-absorber",
      color: "#ADFF2F",
      quote: "Nasávanie vedomostí ako procesor.",
      content: "Štúdium a spracovanie extraktov. Neurálne spracovanie 350+ kníh.",
      proContent: window.id06Data?.proContent || "ID_06_PRO_OFFLINE",
      premiumContent: window.id06Data?.premiumContent || "ID_06_PREM_OFFLINE",
    },
    "07": {
      name: "skill-tree",
      color: "#00FF7F",
      quote: "Vetvenie schopností.",
      content: "Profesionálny rast od roku 2021. Overená certifikovaná základňa kompetencií.",
      proContent: window.id07Data?.proContent || "ID_07_PRO_OFFLINE",
      premiumContent: window.id07Data?.premiumContent || "ID_07_PREM_OFFLINE",
    },
    "08": {
      name: "empty-book",
      color: "#F0F8FF",
      quote: "Čistá strana pre tvorbu.",
      content: "Priestor pre nové idey. Tabula Rasa pre tvoje architektonické náčrty.",
      proContent: window.id08Data?.proContent || "ID_08_PRO_OFFLINE",
      premiumContent: window.id08Data?.premiumContent || "ID_08_PREM_OFFLINE",
    },
    "09": {
      name: "sergeant-core",
      color: "#FF4500",
      quote: "Disciplína v akcii.",
      content: "Bojový režim: CoDM / Zombies. Prenos herných reflexov do reálneho sveta.",
      proContent: window.id09Data?.proContent || "ID_09_PRO_OFFLINE",
      premiumContent: window.id09Data?.premiumContent || "ID_09_PREM_OFFLINE",
    },
    "10": {
      name: "non-identity",
      color: "#0044FF",
      quote: "Boh je Ticho.",
      content: "Návrat k zdroju. Bod nula tvojho vedomia bez formy a filtrov.",
      proContent: window.id10Data?.proContent || "ID_10_PRO_OFFLINE",
      premiumContent: window.id10Data?.premiumContent || "ID_10_PREM_OFFLINE",
    }
  }
};