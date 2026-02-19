window.NEXUS_DATA = window.NEXUS_DATA || {};

window.NEXUS_DATA.ID01 = {
    // Čo vidí neprihlásený alebo FREE užívateľ
    free: `
        <div class="p-6 border border-white/20 bg-black/50 text-center">
            <h3 class="text-[#FF003C] text-xl font-bold mb-4">⚠ RESTRICTED AREA</h3>
            <p class="text-white/70 text-sm mb-4">Základné dáta o operátorovi. Pre detailný psychologický a taktický profil je vyžadovaná previerka úrovne PRO alebo vyššia.</p>
            <div class="text-[10px] text-white/50 border border-white/10 p-2 inline-block">
                NAME: DUŠAN FAJNOR<br>
                STATUS: ACTIVE
            </div>
        </div>
    `,
    
    // Čo vidí PRO užívateľ (Kód 111)
    pro: `
        <div class="p-6 border border-[#39FF14]/30 bg-[#39FF14]/5 text-left">
            <h3 class="text-[#39FF14] text-xl font-bold mb-4">🔓 PRO DATA UNLOCKED</h3>
            <p class="text-white/80 text-sm mb-4">Taktický profil operátora načítaný.</p>
            <ul class="text-xs text-white/60 space-y-2 font-mono">
                <li>> ŠPECIALIZÁCIA: UI/UX Architektúra</li>
                <li>> EFEKTIVITA: 94.2%</li>
                <li>> POSLEDNÁ MISIA: Projekt NEXUS (Úspešná integrácia)</li>
            </ul>
        </div>
    `,

    // Čo vidí PREMIUM užívateľ (Kód 999)
    premium: `
        <div class="p-6 border border-[#FFD700]/50 bg-[#FFD700]/10 text-left relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-[#FFD700] text-black text-[8px] font-black px-2 py-1">OMEGA CLEARANCE</div>
            <h3 class="text-[#FFD700] text-xl font-bold mb-4">👑 OMEGA MASTER PROFILE</h3>
            <p class="text-white text-sm mb-4">Kompletný nefiltrovaný prístup k systémovým logom.</p>
            <div class="grid grid-cols-2 gap-4 text-xs font-mono">
                <div class="p-2 border border-[#FFD700]/30 bg-black">
                    <span class="text-[#FFD700]">> SECURITY:</span> OMEGA LEVEL<br>
                    <span class="text-[#FFD700]">> OVERRIDE:</span> GRANTED
                </div>
                <div class="p-2 border border-[#FFD700]/30 bg-black">
                    <span class="text-[#FFD700]">> NEURAL LINK:</span> STABLE<br>
                    <span class="text-[#FFD700]">> CORE ACCESS:</span> 100%
                </div>
            </div>
        </div>
    `
};