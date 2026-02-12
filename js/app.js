const { useState, useEffect, useMemo } = React;

// 1. MODUL: Paywall (Revenue Model)
const PaywallModule = () => {
  return (
    <div className="p-4 border border-[#E0A800]/30 bg-[#E0A800]/5 rounded text-[#E0A800] animate-in fade-in duration-700">
      <h3 className="text-[10px] font-black uppercase mb-2 italic text-white/80">
        Revenue-Model v1.0
      </h3>
      <div className="flex justify-between text-[11px] font-mono border-b border-[#E0A800]/20 pb-2">
        <span>ACCESS_KEY (FULL)</span>
        <span>150 €</span>
      </div>
      <p className="text-[8px] mt-2 opacity-70 italic leading-tight text-white">
        Zero Friction predaj vedomostnej syntézy.
      </p>
    </div>
  );
};

// 2. MODUL: Library Display
const LibraryVault = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {["OSHO", "RUIZ", "KIYOSAKI", "PETERSON"].map((author) => (
        <div
          key={author}
          className="p-3 border border-white/10 bg-white/5 text-[9px] font-mono text-center shadow-[0_0_10px_rgba(255,255,255,0.05)] text-white/70"
        >
          {author}_ARCHIVE.dat
        </div>
      ))}
    </div>
  );
};

// 2. CORE WRAPPER: 3-Úrovňový Strážca (Free / Pro / Premium)
const DimensionWrapper = ({
  id,
  color,
  children,
  proContent,
  premiumContent,
  isUnlocked,
  setIsUnlocked,
}) => {
  const [keyInput, setKeyInput] = React.useState("");
  const [accessLevel, setAccessLevel] = React.useState("FREE");

  const handleVerify = () => {
    const input = keyInput.trim().toUpperCase();
    if (input === "NEXUS-150-PRO") {
      setAccessLevel("PRO");
      setIsUnlocked(true);
    } else if (input === "NEXUS-999-PREMIUM") {
      setAccessLevel("PREMIUM");
      setIsUnlocked(true);
    } else {
      alert("ACCESS DENIED");
      setKeyInput("");
    }
  };

  return (
    <div className="space-y-6">
      {/* LEVEL 0: FREE CONTENT - Vždy viditeľný (obsahuje text alebo grid certifikátov) */}
      <div className="text-left animate-in fade-in duration-700">
        <div className="text-[7px] opacity-30 font-mono mb-2 tracking-widest uppercase">
          [ Status: Free_Access_Active ]
        </div>
        <div className="relative z-10">{children}</div>
      </div>

      {/* ZOBRAZENIE TERMINÁLU (Ak je zamknuté) */}
      {!isUnlocked ? (
        <div className="mt-10 p-6 border border-white/5 bg-black/60 rounded-xl space-y-4 shadow-2xl relative overflow-hidden group">
          {/* Dekoratívny prvkok v rohu */}
          <div className="absolute top-0 right-0 p-1 font-mono text-[6px] opacity-20 uppercase tracking-widest">
            Auth_Required_v5.3
          </div>

          <input
            type="password"
            placeholder="ENTER ACCESS_KEY..."
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleVerify();
            }}
            className="bg-transparent border-b border-white/10 text-center text-[10px] w-full focus:outline-none focus:border-white/40 transition-all font-mono tracking-[0.2em] text-white py-2 relative z-10"
          />

          <div className="grid grid-cols-3 gap-2 text-[6px] font-mono text-center uppercase tracking-tighter relative z-10">
            <div className="p-1 border border-[#39FF14] text-[#39FF14] bg-[#39FF14]/5">
              Free_Active
            </div>
            <div className="p-1 border border-white/5 text-white/20">
              Pro_Locked
            </div>
            <div className="p-1 border border-white/5 text-white/20">
              Prem_Locked
            </div>
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-2 text-[9px] font-black uppercase shadow-lg transition-transform active:scale-95 hover:brightness-110 relative z-10"
            style={{ backgroundColor: color, color: "#000" }}
          >
            Verify Identity
          </button>
        </div>
      ) : (
        /* ZOBRAZENIE ODOMKNUTÉHO OBSAHU (PRO / PREMIUM) */
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-700">
          {/* PRO NODE */}
          {(accessLevel === "PRO" || accessLevel === "PREMIUM") && (
            <div className="pt-8 border-t border-white/10">
              <div className="text-[7px] text-[#FFD700] mb-4 font-mono tracking-widest uppercase">
                [ Status: Pro_Protocol_Unlocked ]
              </div>
              <div
                className="pro-content-area text-white/80"
                dangerouslySetInnerHTML={{ __html: proContent }}
              />
            </div>
          )}

          {/* PREMIUM NODE */}
          {accessLevel === "PREMIUM" ? (
            <div className="pt-8 border-t-2 border-cyan-500/30 bg-cyan-500/5 p-4 rounded-lg shadow-inner">
              <div className="text-[7px] text-cyan-400 mb-4 font-mono tracking-widest uppercase">
                [ Status: Premium_Direct_Access ]
              </div>
              <div
                className="premium-content-area"
                dangerouslySetInnerHTML={{
                  __html: premiumContent || "INITIALIZING_DATA_STREAM...",
                }}
              />
            </div>
          ) : (
            /* Preview zamknutého prémia */
            <div className="p-4 border border-dashed border-white/5 opacity-20 rounded-lg flex justify-between items-center text-[7px] font-mono uppercase italic">
              <span>Premium_Protocol_Encrypted</span>
              <span className="tracking-widest">Access_Denied</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 4. MODUL: CyberTech Footer
const Footer = () => (
  <footer className="mt-auto py-4 border-t border-white/5 bg-black/40 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
      <div className="flex gap-4 text-[#39FF14]">
        <span>HW: VISIONBOOK 15WJ+</span>
        <span>//</span>
        <span>AI: GEMINI_NEURAL_LINK</span>
      </div>
      <div className="flex items-center gap-3 border-x border-white/10 px-6">
        <span className="text-white font-black tracking-[0.3em]">
          NEXUS CORE
        </span>
        <span className="text-[7px] italic border border-[#39FF14]/30 px-2 py-0.5 rounded text-[#39FF14]">
          D. FAJNOR // ARCHITECT
        </span>
      </div>
      <div className="flex gap-4">
        <span className="italic text-[#39FF14]/60">
          "ZORBA-BUDHA_INITIATED"
        </span>
        <span className="text-white">© 2026</span>
      </div>
    </div>
  </footer>
);

// 5. CORE: App Component
const App = () => {
  const [activeID, setActiveID] = useState("01");
  const [loadTime] = useState(new Date());
  const [seconds, setSeconds] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  // Nový stav pre vizuálny radar
  const [showRadar, setShowRadar] = useState(false);

  // Audio inicializácia sonaru
  const sonarPing = useMemo(
    () => new Audio("./assets/sounds/sonar-ping.mp3"),
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = Math.floor((new Date() - loadTime) / 1000);
      setSeconds(diff);

      // SONAR LOGIKA: Pípa a spúšťa radar každých 10s
      if (!isUnlocked && diff % 10 === 0 && diff > 0) {
        sonarPing.volume = 0.15;
        sonarPing.play().catch(() => {});

        // Aktivácia vizuálneho radaru
        setShowRadar(true);
        // Radar zmizne po 4 sekundách (zhodne s dĺžkou CSS animácie)
        setTimeout(() => setShowRadar(false), 4000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [loadTime, isUnlocked, sonarPing]);

  const getStatusColor = () => {
    if (seconds <= 30) return "#39FF14"; // Zelená
    if (seconds <= 120) return "#8B4513"; // Hnedá
    return "#FF003C"; // Červená
  };

  if (!window.nexusData)
    return (
      <div className="p-20 text-red-500 font-mono text-center">
        CRITICAL_ERROR: DATA_NODE_OFFLINE
      </div>
    );

  const current =
    window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];
  const statusColor = getStatusColor();

  return (
    <div
      className="min-h-screen flex flex-col bg-[#050505] transition-all duration-700"
      style={{ borderLeft: `6px solid ${current.color}` }}
    >
      {/* DYNAMICKÝ HUD */}
      <div className="fixed top-4 right-4 md:top-8 md:right-8 flex items-center gap-3 bg-black/90 p-2 px-4 rounded-full border border-white/10 z-50 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-end mr-2">
          <span
            className="text-[10px] font-mono tracking-widest font-black uppercase"
            style={{ color: current.color }}
          >
            {window.nexusData.config.version}
          </span>
          <div className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-tighter">
            <span className="opacity-40 text-white italic">Sync:</span>
            <span style={{ color: statusColor }}>{seconds}s ago</span>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          {!isUnlocked && (
            <div
              className="absolute w-6 h-6 rounded-full border animate-ping opacity-20"
              style={{ borderColor: statusColor }}
            />
          )}
          <div
            className="w-2.5 h-2.5 rounded-full z-10 transition-colors duration-500"
            style={{
              backgroundColor: statusColor,
              boxShadow: `0 0 12px ${statusColor}`,
            }}
          />
        </div>
      </div>

      <main className="container mx-auto px-8 pt-20 pb-32 max-w-6xl flex-grow text-white">
        <header className="mb-16">
          {/* Horný HUD riadok */}
          <div className="text-[10px] font-mono tracking-[0.4em] mb-4 opacity-40 uppercase">
            Protocol_{activeID} //{" "}
            {activeID === "01"
              ? "Personal UI Space"
              : activeID === "02"
                ? "Work UI Space"
                : activeID === "03"
                  ? "Finance UI Space"
                  : activeID === "04"
                    ? "Business UI Space"
                    : activeID === "05"
                      ? "Investments UI Space"
                      : activeID === "06"
                        ? "Study UI Space"
                        : activeID === "07"
                          ? "Professional UI Space"
                          : activeID === "08"
                            ? "Reader UI Space"
                            : activeID === "09"
                              ? "Player UI Space"
                              : activeID === "10"
                                ? "Home UI Space"
                                : "Recovery UI Space"}
          </div>

          {/* Hlavný nadpis (Veľké kone) */}
          <h1
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
            style={{ color: current.color }}
          >
            {current.name}
          </h1>

          {/* SEKUNDÁRNY RIADOK: EN // SK (Malé písmo) */}
          <div className="text-[10px] font-mono tracking-[0.2em] opacity-30 uppercase mt-2 flex items-center gap-2">
            <span style={{ color: current.color }}>●</span>
            <span>
              {activeID === "01"
                ? "Identita // Z osobného života"
                : activeID === "02"
                  ? "Pracovný Tok // Z pracovného života"
                  : activeID === "03"
                    ? "Finančný Stroj // Z finančného života"
                    : activeID === "04"
                      ? "Architekt Výnosov // Z výnosového života"
                      : activeID === "05"
                        ? "Matrica Aktív // Z investičného života"
                        : activeID === "06"
                          ? "Absorpcia Dát // Z akademického života"
                          : activeID === "07"
                            ? "Strom Schopností // Z profesionálneho života"
                            : activeID === "08"
                              ? "Prázdna Kniha // Z čitateľského života"
                              : activeID === "09"
                                ? "Jadro Seržanta // Z hráčskeho života"
                                : activeID === "10"
                                  ? "Bez Identity // Z domáceho života"
                                  : "Zotavenie // Z krízového života"}
            </span>
          </div>

          {/* Citát */}
          <p className="mt-8 text-xl italic opacity-50 max-w-2xl leading-relaxed">
            "{current.quote}"
          </p>
        </header>
        <nav className="flex flex-wrap gap-2 mb-20">
          {Object.keys(window.nexusData.dimensions)
            .sort((a, b) => a - b)
            .map((id) => (
              <button
                key={id}
                onClick={() => {
                  setActiveID(id);
                  setIsUnlocked(false);
                }}
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
                ID_{id}
              </button>
            ))}
        </nav>

        {/* AREA PRE OBSAH S INTEGROVANÝM RADAROM */}
        <div className="relative p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-r-xl max-w-4xl overflow-hidden">
          {/* 🛰️ RADAR: Vykresľuje sa len ak je zamknuté a showRadar je true */}
          {!isUnlocked && showRadar && (
            <>
              <div
                className="radar-circle"
                style={{ color: current.color }}
              ></div>
              <div
                className="radar-circle delay-1"
                style={{ color: current.color }}
              ></div>
            </>
          )}

          <div
            className="absolute top-0 left-0 w-1.5 h-full z-20"
            style={{ backgroundColor: current.color }}
          />

          {/* Content Wrapper */}
          <div className="relative z-10">
            <DimensionWrapper
              id={activeID}
              color={current.color}
              proContent={current.proContent}
              premiumContent={current.premiumContent}
              isUnlocked={isUnlocked}
              setIsUnlocked={setIsUnlocked}
            >
              {/* LOGIKA PRE SKILL TREE vs OSTATNÉ DIMENZIE */}
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
                <p className="text-2xl md:text-4xl font-light text-white/90 uppercase leading-snug">
                  {current.content}
                </p>
              )}
            </DimensionWrapper>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
