// js/data.js
window.nexusData = {
  config: { /* tvoj config */ },
  skills: [ /* tvojich 38 certifikátov */ ],
  dimensions: {
    "01": {
      name: "identity",
      color: "#39FF14",
      quote: "Keď som, tak som, viem, že som.",
      content: "Transformácia: Hlas Poznania → Hlas Pravdy.",
      proContent: window.id01Data ? window.id01Data.proContent : "ID_01_OFFLINE"
    },
    "02": {
      name: "workflow-leader",
      color: "#FFD700",
      quote: "Efektivita v prítomnosti.",
      content: "Leadership ZorbaBudha Protocol.",
      proContent: window.id02Data ? window.id02Data.proContent : "ID_02_OFFLINE"
    },
    // OPAKUJ TENTO VZOR PRE 03 AŽ 10
    "10": {
      name: "non-identity",
      color: "#0044FF",
      quote: "Návrat k zdroju.",
      content: "Boh je Ticho.",
      proContent: window.id10Data ? window.id10Data.proContent : "ID_10_OFFLINE"
    }
  }
}; // Tu musí byť bodkočiarka