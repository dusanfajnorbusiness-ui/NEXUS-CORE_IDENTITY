/* --- NEXUS DATA ARCHIVE: ID08 (LIBRARY) --- */
/* Obsahuje hierarchicky triedené texty pre Reader UI Space */

window.NEXUS_DATA = window.NEXUS_DATA || {};

// =============================================================================
// 1. ZLATÝ FOND (PRO KNIŽNICA - Pekne naformátovaná)
// =============================================================================
const SHARED_LIBRARY_CONTENT = `
    <div class="p-6 bg-cyan-950/20 border-l-4 border-cyan-500 mb-12">
        <h3 class="text-cyan-400 font-bold uppercase tracking-widest">Master Library [ONLINE]</h3>
        <p class="text-[10px] text-white/50 font-mono italic">Synchronizované dáta z OneNote Archívu v2.2</p>
    </div>

    <div class="mb-16 bg-gradient-to-r from-cyan-900/20 to-transparent p-6 rounded-l-xl border-l-4 border-[#00FFFF] animate-in slide-in-from-left duration-700">
        <h3 class="text-sm font-black text-[#00FFFF] uppercase mb-4 tracking-widest flex items-center gap-2">
            <span class="animate-pulse">●</span> Active Data Stream (Reading Now)
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] text-white/80 font-mono">
            <div>1. Robert T. Kiyosaki - Príbehy úspešných</div>
            <div>2. Osho - Žiť podľa vlastných pravidiel</div>
            <div>3. Don Miguel Ruiz - Štyri dohody</div>
            <div>4. Don Miguel Ruiz - Múdrosť z knihy majstrovstvo lásky</div>
            <div>5. Osho - O strachu</div>
            <div>6. Walter Isaacson - Einstein, jeho život a vesmír</div>
            <div>7. C.G. Jung - Výbor z díla I</div>
            <div>8. Kurt Tepperwein - Duchovné zákony</div>
            <div class="text-[#00FFFF]/50 italic">... a ďalších 30 titulov v procese.</div>
        </div>
    </div>

    <div class="mb-20 space-y-12">
        <div>
            <h3 class="text-lg font-black text-white uppercase mb-4 flex items-center gap-3 border-b border-yellow-500/30 pb-2">
                <span class="text-yellow-500">💰</span> Billionaire & Success Protocol
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-yellow-500/30 transition-colors">
                    <div class="flex justify-between mb-2"><span class="font-bold text-yellow-500 text-xs">TECH TITANS</span><span class="text-[9px] bg-white/10 px-1 rounded">Jobs/Musk/Bezos/Gates</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 space-y-1">
                        <div>Steve Jobs (Isaacson)</div><div>Elon Musk (Vance)</div><div>Nespútaný Amazon (Bezos)</div><div>Byznys rychlostí myšlenky (Gates)</div><div>Já, Steve</div><div>Mysli jako Zuckerberg</div>
                    </div>
                </div>
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-yellow-500/30 transition-colors">
                    <div class="flex justify-between mb-2"><span class="font-bold text-yellow-500 text-xs">INVESTORS & TRUMP</span><span class="text-[9px] bg-white/10 px-1 rounded">Buffett/Trump/Soros</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 space-y-1">
                        <div>Sněhová koule (Buffett)</div><div>Tao Warrena Buffetta</div><div>Umění udělat dohodu (Trump)</div><div>Mysli jako miliardář (Trump)</div><div>Nové paradigma (Soros)</div>
                    </div>
                </div>
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-yellow-500/30 transition-colors">
                    <div class="flex justify-between mb-2"><span class="font-bold text-yellow-500 text-xs">CLASSIC MENTORS</span><span class="text-[9px] bg-white/10 px-1 rounded">Kiyosaki/Hill/Tracy</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 space-y-1">
                        <div>Bohatý otec, chudobný otec</div><div>Cashflow kvadrant</div><div>Mysli a zbohatni</div><div>Žiadne výhovorky! (Tracy)</div><div>Najprv zjedzte žabu</div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3 class="text-lg font-black text-white uppercase mb-4 flex items-center gap-3 border-b border-[#BF00FF]/30 pb-2">
                <span class="text-[#BF00FF]">🧘</span> Spirituality & Eastern Wisdom
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-[#BF00FF]/30 transition-colors col-span-1 md:col-span-2">
                    <div class="flex justify-between mb-2"><span class="font-bold text-[#BF00FF] text-xs">OSHO</span><span class="text-[9px] bg-white/10 px-1 rounded">89 Titulov</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 grid grid-cols-2 gap-2">
                        <div>Odvaha</div><div>Intuícia</div><div>Kreativita</div><div>Radosť</div><div>Sloboda</div><div>Inteligencia</div><div>Kniha o egu</div><div>Tantra</div><div>Zen tarot</div><div>O ženách/mužoch</div><div>Meditácia</div><div>+ 78 ďalších...</div>
                    </div>
                </div>
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-[#BF00FF]/30 transition-colors">
                    <div class="flex justify-between mb-2"><span class="font-bold text-[#BF00FF] text-xs">RUIZ & TOLLE</span><span class="text-[9px] bg-white/10 px-1 rounded">Masters</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 space-y-1">
                        <div>Štyri dohody</div><div>Piata dohoda</div><div>Hlas Poznania</div><div>Majstrovstvo lásky</div><div>Sila prítomného okamihu</div><div>Nová Zem</div><div>Reč ticha</div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <h3 class="text-lg font-black text-white uppercase mb-4 flex items-center gap-3 border-b border-[#00FFFF]/30 pb-2">
                <span class="text-[#00FFFF]">🧠</span> Psychology & Health Matrix
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-[#00FFFF]/30 transition-colors">
                    <div class="flex justify-between mb-2"><span class="font-bold text-[#00FFFF] text-xs">JUNG & FREUD</span><span class="text-[9px] bg-white/10 px-1 rounded">Psychoanalysis</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 space-y-1">
                        <div>Červená kniha</div><div>Archetypy a nevědomí</div><div>Člověk a duše</div><div>Výklad snov (Freud)</div><div>Totem a tabu</div><div>Ego a Id</div>
                    </div>
                </div>
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-[#00FFFF]/30 transition-colors">
                    <div class="flex justify-between mb-2"><span class="font-bold text-[#00FFFF] text-xs">TEPPERWEIN & MURPHY</span><span class="text-[9px] bg-white/10 px-1 rounded">Mind & Health</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 space-y-1">
                        <div>Moc nášho podvedomia</div><div>Cesta ku šťastiu</div><div>Duchovné zákony</div><div>Kríza ako šanca</div><div>Omladzujúce odkyslenie</div><div>Prečo je toľko vzťahov chorých</div>
                    </div>
                </div>
                <div class="bg-white/[0.02] border border-white/10 rounded-lg p-4 hover:border-[#00FFFF]/30 transition-colors">
                    <div class="flex justify-between mb-2"><span class="font-bold text-[#00FFFF] text-xs">ENERGY & ESOTERIC</span><span class="text-[9px] bg-white/10 px-1 rounded">Chia/Cayce/Newton</span></div>
                    <div class="h-32 overflow-y-auto custom-scrollbar text-[9px] text-white/60 space-y-1">
                        <div>Multiorgasmický muž/žena</div><div>Liečivé tao</div><div>Putovanie duší (Newton)</div><div>Tajomstvo kroniky Akáša (Cayce)</div><div>Čchi-kung</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-16 p-6 border border-white/5 bg-black rounded-xl opacity-60 hover:opacity-100 transition-opacity">
        <h4 class="text-xs font-bold text-gray-500 uppercase mb-4 tracking-widest border-b border-gray-800 pb-2">
            🛠️ Review Template Protocol
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[9px] font-mono text-gray-400">
            <div><strong class="text-[#39FF14]">TOP ONE</strong><br/>Transformácia cesty praxe na kráľovskú cestu.</div>
            <div><strong class="text-yellow-500">TOP TWO</strong><br/>Dopomohla z 3/4. Rozširuje slovnú zásobu.</div>
            <div><strong class="text-red-500">TOP LAST</strong><br/>Strata času. Nedala nič. Nedocitaná.</div>
        </div>
    </div>

    <div class="mt-24 pt-12 border-t-2 border-[#BF00FF]/50 relative">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-[#BF00FF] font-black tracking-widest text-lg uppercase">
            GNOSTIC LEXICON
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div class="bg-gradient-to-br from-[#BF00FF]/10 to-transparent border border-[#BF00FF]/20 rounded-xl p-6">
                <h4 class="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                    <span class="w-2 h-2 bg-[#BF00FF] rounded-full animate-pulse"></span>CORE DEFINITIONS
                </h4>
                <div class="space-y-3 text-[10px] text-white/80 font-mono">
                    <div class="flex gap-2"><span class="text-[#BF00FF] font-bold min-w-[80px]">INTUÍCIA:</span><span class="opacity-70">Funkcia srdca. Vidí to, čo je.</span></div>
                    <div class="flex gap-2"><span class="text-[#BF00FF] font-bold min-w-[80px]">INTELEKT:</span><span class="opacity-70">Funkcia hlavy. V strede vedomia je slepý.</span></div>
                </div>
            </div>
            </div>
    </div>

    <div class="mt-24 pt-12 border-t-2 border-white/50 relative">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-white font-black tracking-widest text-lg uppercase">OMEGA ARCHIVE</div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all group">
                <h4 class="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2"><span class="text-xl">🕊️</span> HOVORY S BOHOM</h4>
                <div class="space-y-4 text-[10px] text-white/80 font-mono leading-relaxed">
                    <details class="group/item"><summary class="cursor-pointer text-white hover:underline font-bold mb-1">Božia Trojica</summary><ul class="list-disc pl-4 space-y-1 opacity-70"><li>1. To, čo dáva vzniknúť (Myšlienka).</li><li>2. To, čo vzniká (Slovo).</li><li>3. To, čo je (Čin).</li></ul></details>
                </div>
            </div>
            <div class="bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all group">
                <h4 class="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2"><span class="text-xl">🌌</span> VELKOLEPÝ PLÁN</h4>
                <div class="space-y-4 text-[10px] text-white/80 font-mono leading-relaxed">
                    <details class="group/item"><summary class="cursor-pointer text-white hover:underline font-bold mb-1">M-Teória</summary><p class="pl-4 border-l border-white/30">Kandidát na finálnu teóriu vesmíru. 11 dimenzií.</p></details>
                </div>
            </div>
        </div>
    </div>
`;

// =============================================================================
// 2. PREMIUM INTERAKTÍVNE NÁSTROJE (Testy, Cvičenia, Diskusia)
// =============================================================================
const PREMIUM_TOOLKIT = `
<div class="mt-24 border-t border-[#FFD700]/30 pt-12">
    
    <div class="flex items-center gap-4 mb-12">
        <div class="w-12 h-1 bg-[#FFD700]"></div>
        <h2 class="text-2xl font-black text-white uppercase tracking-tighter">
            OMEGA <span class="text-[#FFD700]">WORKSHOP</span>
        </h2>
        <div class="text-[10px] text-white/40 font-mono border border-white/10 px-2 py-1 rounded">
            INTERACTIVE_MODE: ACTIVE
        </div>
    </div>

    <div class="mb-16 p-1 bg-gradient-to-r from-[#FFD700] to-transparent rounded-xl">
        <div class="bg-black p-6 rounded-xl border border-[#FFD700]/20">
            <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-[#FFD700] font-bold uppercase text-lg">💰 TEST: Cashflow Mentalita</h3>
                    <p class="text-[10px] text-white/60 font-mono">Vyhodnoť svoje rozhodovanie v 3 krokoch.</p>
                </div>
                <div class="text-2xl opacity-50">⚖️</div>
            </div>

            <div class="space-y-4 font-mono text-xs">
                <div class="p-4 border border-white/10 rounded hover:bg-white/5 transition-colors">
                    <p class="text-white mb-3 font-bold">1. Dostal si nečakaných 1000€. Čo urobíš?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <button class="text-left px-3 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded">A) Kúpim si pasívum.</button>
                        <button class="text-left px-3 py-2 border border-[#39FF14]/30 text-[#39FF14] hover:bg-[#39FF14]/10 rounded">B) Investujem do aktív.</button>
                    </div>
                </div>
                <div class="p-4 border border-white/10 rounded hover:bg-white/5 transition-colors">
                    <p class="text-white mb-3 font-bold">2. Čo je tvoj dom?</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <button class="text-left px-3 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded">A) Aktívum.</button>
                        <button class="text-left px-3 py-2 border border-[#39FF14]/30 text-[#39FF14] hover:bg-[#39FF14]/10 rounded">B) Pasívum.</button>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 text-center">
                <button class="px-6 py-2 bg-[#FFD700] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all">VYHODNOTIŤ TEST</button>
            </div>
        </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div class="p-6 border-l-4 border-[#00FFFF] bg-[#00FFFF]/5 rounded-r-xl">
            <h4 class="text-[#00FFFF] font-bold uppercase mb-4 text-sm">🧘 CVIČENIE: 3-Minútový Reset</h4>
            <ul class="space-y-3 text-[11px] text-white/80 font-mono">
                <li class="flex gap-3"><span class="text-[#00FFFF] font-bold">01.</span><span>Zastav sa. Pozri sa okolo bez pomenovávania.</span></li>
                <li class="flex gap-3"><span class="text-[#00FFFF] font-bold">02.</span><span>Sústreď sa na dych.</span></li>
                <li class="flex gap-3"><span class="text-[#00FFFF] font-bold">03.</span><span>Polož si otázku: "Aká bude moja ďalšia myšlienka?"</span></li>
            </ul>
            <button class="mt-6 text-[9px] text-[#00FFFF] border border-[#00FFFF] px-3 py-1 rounded hover:bg-[#00FFFF] hover:text-black uppercase">Spustiť Časovač (3:00)</button>
        </div>

        <div class="p-6 border-l-4 border-[#FF003C] bg-[#FF003C]/5 rounded-r-xl">
            <h4 class="text-[#FF003C] font-bold uppercase mb-4 text-sm">🛡️ CVIČENIE: STOP PARAZITOVI</h4>
            <ul class="space-y-3 text-[11px] text-white/80 font-mono">
                <li class="flex gap-3"><span class="text-[#FF003C] font-bold">01.</span><span>Identifikuj seba-odsudzujúcu myšlienku.</span></li>
                <li class="flex gap-3"><span class="text-[#FF003C] font-bold">02.</span><span>Pomenuj ju: "Toto je Hlas Poznania."</span></li>
                <li class="flex gap-3"><span class="text-[#FF003C] font-bold">03.</span><span>Vedome ju nahraď: "Robím to najlepšie, ako viem."</span></li>
            </ul>
            <button class="mt-6 text-[9px] text-[#FF003C] border border-[#FF003C] px-3 py-1 rounded hover:bg-[#FF003C] hover:text-black uppercase">Zaznamenať víťazstvo</button>
        </div>
    </div>

    <div class="mb-12">
        <h3 class="text-xl font-black text-white uppercase mb-6 flex items-center gap-2">
            <span class="text-[#BF00FF]">💬</span> LIVE INTEL DISCUSSION
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="relative p-6 bg-white/[0.03] border border-white/10 rounded-xl group hover:border-[#BF00FF]/50 transition-all">
                <div class="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="text-[10px] bg-[#BF00FF] text-white px-2 py-1 rounded font-bold uppercase hover:bg-white hover:text-black">Diskutovať na Blogu ↗</button>
                </div>
                <div class="text-2xl text-[#BF00FF] font-serif mb-2">"</div>
                <p class="text-sm text-white/90 italic mb-4 leading-relaxed">Skutočný majster nie je ten, ktorý má najviac žiakov, ale ten, ktorý tvorí najviac majstrov.</p>
                <div class="flex justify-between items-end border-t border-white/5 pt-3">
                    <span class="text-[10px] text-[#BF00FF] font-bold uppercase">Neale D. Walsch</span>
                    <span class="text-[9px] text-white/30 font-mono">REF: HOVORY_S_BOHOM_01</span>
                </div>
            </div>
            <div class="relative p-6 bg-white/[0.03] border border-white/10 rounded-xl group hover:border-[#BF00FF]/50 transition-all">
                <div class="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="text-[10px] bg-[#BF00FF] text-white px-2 py-1 rounded font-bold uppercase hover:bg-white hover:text-black">Diskutovať na Blogu ↗</button>
                </div>
                <div class="text-2xl text-[#BF00FF] font-serif mb-2">"</div>
                <p class="text-sm text-white/90 italic mb-4 leading-relaxed">Tvoja myseľ je nástroj. Používaj ju, ale nenechaj sa ňou používať. Ty nie si tvoja myseľ.</p>
                <div class="flex justify-between items-end border-t border-white/5 pt-3">
                    <span class="text-[10px] text-[#BF00FF] font-bold uppercase">Eckhart Tolle</span>
                    <span class="text-[9px] text-white/30 font-mono">REF: POWER_OF_NOW</span>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// =============================================================================
// 3. EXPORT DÁT PRE APLIKÁCIU
// =============================================================================
window.NEXUS_DATA.ID08 = {
    
    // 🔴 FREE TIER: Zamknuté
    free: `
        <div class="p-8 text-center border border-red-500/20 bg-red-500/5 rounded-xl">
            <h3 class="text-red-500 font-black text-xl mb-4 uppercase">🔒 Restricted Access</h3>
            <p class="text-white/60 text-sm mb-6 font-mono">
                Detekovaný nepovolený prístup. Väčšina indexov je v režime "ReadOnly - Preview".
            </p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 opacity-30 pointer-events-none">
                <div class="p-4 border border-white/10 rounded">KIYOSAKI (LOCKED)</div>
                <div class="p-4 border border-white/10 rounded">TOLLE (LOCKED)</div>
                <div class="p-4 border border-white/10 rounded">FREUD (LOCKED)</div>
            </div>
            <p class="mt-8 text-[10px] text-red-400 animate-pulse font-mono">>> ZADAJTE AUTORIZAČNÝ KÓD PRE ODOMKNUTIE ARCHÍVU</p>
        </div>
    `,

    // 🟢 PRO TIER: Knižnica + Základný Test
    pro: `
        <div class="pro-header mb-8 p-4 border border-[#39FF14]/30 bg-[#39FF14]/5 rounded">
            <h3 class="text-[#39FF14] font-bold uppercase">PRO OPERATOR INTERFACE</h3>
            <p class="text-[10px] text-white/70 font-mono leading-tight">
                Všetky tituly sú prístupné. K dispozícii sú interaktívne testy a bodovanie.
            </p>
        </div>

        ${SHARED_LIBRARY_CONTENT}

        <div class="mt-12 p-8 border-2 border-[#39FF14] bg-black rounded-2xl shadow-[0_0_20px_rgba(57,255,20,0.2)]">
            <h3 class="text-[#39FF14] font-black text-xl mb-4">📊 TEST: FINANČNÁ INTELIGENCIA</h3>
            <p class="text-sm text-white/80 mb-6 font-mono">Interaktívny formulár pre výpočet Cashflow (Fáza 2 vývoja).</p>
            <button class="px-6 py-2 bg-[#39FF14] text-black font-bold uppercase text-xs hover:bg-white transition-all">
                Spustiť Kalkulátor
            </button>
        </div>
    `,

    // 🟡 PREMIUM TIER: Knižnica + Omega Toolkit + Surové poznámky
    premium: `
        <div class="premium-header mb-8 p-6 border-2 border-[#FFD700] bg-[#FFD700]/5 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.1)]">
            <h3 class="text-[#FFD700] font-black uppercase text-xl tracking-tighter">⚠️ OMEGA ARCHIVE ACCESS (PREMIUM)</h3>
            <p class="text-xs text-white/90 font-mono italic">
                Prístup povolený: Knižnica + Interaktívne Protokoly + Diskusné Fórum.
            </p>
        </div>

        ${SHARED_LIBRARY_CONTENT}
        
        ${PREMIUM_TOOLKIT}

        <div class="mt-20 border-t border-white/10 pt-8 space-y-8">
            <h4 class="text-[#FFD700] font-black uppercase text-sm mb-4 text-center">>> OMEGA RAW DATA STREAM <<</h4>
            
            <div class="p-6 border border-[#FFD700]/30 bg-black/80 rounded font-mono">
                <h4 class="text-[#FFD700] text-sm mb-4 font-black">>> SUROVÉ POZNÁMKY: COZMOLOGY_DEEP_DIVE</h4>
                <div class="text-[9px] text-[#FFD700]/60 leading-relaxed max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                    <p>[RAW_DATA_STREAM_START]</p>
                    <p>Relativita... Časopriestor... Hawkingov index... M-Teória detailný rozpis...</p>
                    <p>Teória strún predpokladá, že základnými stavebnými kameňmi hmoty nie sú bezrozmerné častice...</p>
                    <p>M-Teória predstavuje rozšírenie strunovej teórie do jedenástich dimenzií...</p>
                    <p>[RAW_DATA_STREAM_END]</p>
                </div>
            </div>

            <div class="p-6 border border-[#BF00FF]/30 bg-black/80 rounded font-mono">
                <h4 class="text-[#BF00FF] text-sm mb-4 font-black">>> CROSS-LINKED ARCHIVE: FREUD-JUNG-OSHO SYNERGY</h4>
                <p class="text-[10px] text-white/50 leading-relaxed italic">
                    Analýza prepojení medzi nevedomím podľa Freuda a osvietením podľa Osha... 
                    (Tento modul zobrazuje krížové prepojenia medzi autormi).
                </p>
            </div>
        </div>
    `
};