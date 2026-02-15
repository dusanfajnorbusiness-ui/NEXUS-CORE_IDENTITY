// js/dimensions/id08.js (v1.2 - Heavy Stream Edition)
window.id08Data = {
  proContent: `
    <div class="p-4 border-l-2 border-[#00FFFF]/30 bg-[#00FFFF]/5 mb-6">
      <h3 class="text-[#00FFFF] font-bold uppercase text-xs mb-2 tracking-widest">Codex_Protocol_Active</h3>
      <p class="text-[10px] opacity-70 leading-relaxed">
        Systém úspešne identifikoval 17,102 riadkov surových dát. 
        Prebieha dešifrovanie OneNote štruktúry a mapovanie časových osí.
      </p>
    </div>
  `,

  premiumContent: `
    <div class="p-5 bg-black/90 border-2 border-[#00FFFF] rounded-xl shadow-[0_0_40px_rgba(0,255,255,0.15)] relative overflow-hidden animate-in zoom-in-95 duration-700 min-h-[600px] flex flex-col">
      <div class="absolute top-0 right-0 bg-[#00FFFF] text-black text-[7px] px-3 font-black py-0.5 uppercase tracking-tighter">Architect_Deep_Scan_v2</div>
      
      <div class="flex justify-between items-center mb-4 border-b border-[#00FFFF]/20 pb-2">
        <h4 class="text-[#00FFFF] font-black text-[11px] uppercase italic tracking-tighter animate-pulse">
          !! RAW_DATA_DECRYPTOR [CONNECTED] !!
        </h4>
        <div class="text-[8px] font-mono text-[#00FFFF]/50">LINES: 17102 // SYNC_STATUS: OK</div>
      </div>
      
      {/* TERMINÁL S AUTO-SCROLLOM A PEVNOU VÝŠKOU */}
      <div id="codex-terminal" class="flex-grow space-y-1 font-mono text-[#00FFFF] h-[450px] overflow-y-auto custom-scrollbar p-3 bg-black/60 rounded border border-white/5 text-left">
          [ WAITING_FOR_DECRYPTION_KEY... ]
      </div>

      <div class="mt-4 grid grid-cols-3 gap-2 opacity-40">
        <div class="text-[7px] uppercase font-bold border-r border-white/10">Buffer: 972KB</div>
        <div class="text-[7px] uppercase font-bold border-r border-white/10 text-center">Process: Idle</div>
        <div class="text-[7px] uppercase font-bold text-right">Node: Trnava_Station</div>
      </div>
    </div>
  `
};