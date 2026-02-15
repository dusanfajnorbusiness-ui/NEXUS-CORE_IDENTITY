// js/dimensions/id08.js (v1.1 - Ingested Edition)
window.id08Data = {
  proContent: `... tvoj kód zhora ...`, // Ponechaj proContent ako statické info

  // Funkcia na dynamické načítanie fragmentov
  getLiveCodex: async function() {
    try {
      const response = await fetch('./js/data/codex/fragment_1.json');
      const fragment = await response.json();
      
      // Zoberieme prvých 20 riadkov z fragmentu ako ukážku
      const lines = fragment.data.slice(0, 20).map(line => 
        `<div class="flex gap-2 text-[8px] border-b border-[#F0F8FF]/5 py-0.5">
           <span class="opacity-30">SCAN_01 ></span> 
           <span class="truncate">${line}</span>
         </div>`
      ).join('');

      return lines;
    } catch (e) {
      return `<div class="text-[8px] opacity-40 italic uppercase text-center">[ DATA_STREAM_OFFLINE // WAITING_FOR_SYNC ]</div>`;
    }
  },

  premiumContent: `
    <div class="p-5 bg-black/80 border-2 border-[#F0F8FF] rounded-xl shadow-[0_0_25px_rgba(240,248,255,0.2)] relative overflow-hidden animate-in zoom-in-95 duration-700 min-h-[300px]">
      <div class="absolute top-0 right-0 bg-[#F0F8FF] text-black text-[7px] px-3 font-black py-0.5 uppercase tracking-tighter shadow-lg">Architect_Draft_Space</div>
      <h4 class="text-[#F0F8FF] font-black text-[11px] uppercase mb-3 italic tracking-tighter text-center">!! RAW_IDEA_STREAM !!</h4>
      
      <div id="codex-terminal" class="space-y-1 font-mono text-[#F0F8FF] h-48 overflow-y-auto custom-scrollbar">
         [ INITIALIZING_KNOWLEDGE_DUMP_SCAN... ]
      </div>

      <div class="mt-4 p-2 bg-[#F0F8FF]/5 border border-[#F0F8FF]/20 rounded text-center">
        <div class="text-[7px] text-[#F0F8FF] uppercase font-bold tracking-widest animate-pulse">Scanning_3.05GB_Codex</div>
      </div>
    </div>
  `
};