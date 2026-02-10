const { useState, useEffect, useMemo } = React;

// 1. MODUL: Paywall (Revenue Model)
const PaywallModule = () => {
    return (
        <div className="p-4 border border-[#E0A800]/30 bg-[#E0A800]/5 rounded text-[#E0A800] animate-in fade-in duration-700">
            <h3 className="text-[10px] font-black uppercase mb-2 italic text-white/80">Revenue-Model v1.0</h3>
            <div className="flex justify-between text-[11px] font-mono border-b border-[#E0A800]/20 pb-2">
                <span>ACCESS_KEY (FULL)</span>
                <span>150 €</span>
            </div>
            <p className="text-[8px] mt-2 opacity-70 italic leading-tight text-white">Zero Friction predaj vedomostnej syntézy.</p>
        </div>
    );
};

// 2. MODUL: Library Display
const LibraryVault = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {["OSHO", "RUIZ", "KIYOSAKI", "PETERSON"].map((author) => (
                <div key={author} className="p-3 border border-white/10 bg-white/5 text-[9px] font-mono text-center shadow-[0_0_10px_rgba(255,255,255,0.05)] text-white/70">
                    {author}_ARCHIVE.dat
                </div>
            ))}
        </div>
    );
};

// 3. CORE WRAPPER: Strážca s Radarom a Enter Triggerom
const DimensionWrapper = ({ id, color, children, proContent, isUnlocked, setIsUnlocked }) => {
    const [keyInput, setKeyInput] = useState("");

    const handleVerify = () => {
        if (keyInput === "NEXUS-150-PRO") {
            setIsUnlocked(true); // Toto vypne sonar v App komponente
        } else {
            alert("ACCESS DENIED: INVALID_KEY");
            setKeyInput("");
        }
    };

    return (
        <div className="space-y-4">
            <div className="text-left">{children}</div>
            {!isUnlocked ? (
                <div className="relative p-2 border border-dashed border-white/10 rounded-lg bg-black/80 mt-2 overflow-hidden max-w-sm mx-auto md:mx-0 min-h-[140px]">
                    <div className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none rounded-lg">
                        <div className="radar-circle" style={{ borderColor: color, boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}` }}></div>
                        <div className="radar-circle delay-1" style={{ borderColor: color, boxShadow: `0 0 20px ${color}, inset 0 0 20px ${color}` }}></div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-4 p-4 mt-2">
                        <input
                            type="password"
                            placeholder="ENTER PRISTUPOVY KLUC..."
                            value={keyInput}
                            className="bg-transparent border-b border-white/10 text-center text-[10px] w-full focus:outline-none focus:border-white/40 transition-all font-mono tracking-[0.2em] text-white"
                            onChange={(e) => setKeyInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleVerify(); }} // ENTER TRIGGER
                        />
                        <button
                            onClick={handleVerify}
                            className="px-6 py-2 text-[10px] font-black uppercase transition-all active:scale-95 shadow-lg"
                            style={{ backgroundColor: color, color: "#000" }}
                        >
                            Verify Identity
                        </button>
                    </div>
                </div>
            ) : (
                proContent && (
                    <div className="animate-in slide-in-from-top-2 fade-in pt-4 mt-4 border-t border-white/10 text-left">
                        {proContent === "LOAD_LIBRARY_MODULE" ? (
                            <LibraryVault />
                        ) : proContent === "LOAD_PAYWALL_MODULE" ? (
                            <PaywallModule />
                        ) : typeof proContent === "string" && proContent.includes("<div") ? (
                            <div dangerouslySetInnerHTML={{ __html: proContent }} />
                        ) : (
                            <div className="text-white font-mono text-sm">{proContent}</div>
                        )}
                    </div>
                )
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
                <span className="text-white font-black tracking-[0.3em]">NEXUS CORE</span>
                <span className="text-[7px] italic border border-[#39FF14]/30 px-2 py-0.5 rounded text-[#39FF14]">D. FAJNOR // ARCHITECT</span>
            </div>
            <div className="flex gap-4">
                <span className="italic text-[#39FF14]/60">"ZORBA-BUDHA_INITIATED"</span>
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

    // Audio inicializácia sonaru
    const sonarPing = useMemo(() => new Audio('./assets/sounds/sonar-ping.mp3'), []);

    useEffect(() => {
        const timer = setInterval(() => {
            const diff = Math.floor((new Date() - loadTime) / 1000);
            setSeconds(diff);
            
            // SONAR: Pípa len ak je zamknuté
            if (!isUnlocked && diff % 10 === 0 && diff > 0) {
                sonarPing.volume = 0.15;
                sonarPing.play().catch(() => {});
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [loadTime, isUnlocked, sonarPing]);

    const getStatusColor = () => {
        if (seconds <= 30) return "#39FF14"; // Zelená
        if (seconds <= 120) return "#8B4513"; // Hnedá
        return "#FF003C"; // Červená
    };

    if (!window.nexusData) return <div className="p-20 text-red-500 font-mono text-center">CRITICAL_ERROR: DATA_NODE_OFFLINE</div>;

    const current = window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];
    const statusColor = getStatusColor();

    return (
        <div className="min-h-screen flex flex-col bg-[#050505] transition-all duration-700" style={{ borderLeft: `6px solid ${current.color}` }}>
            
            {/* DYNAMICKÝ HUD */}
            <div className="fixed top-4 right-4 md:top-8 md:right-8 flex items-center gap-3 bg-black/90 p-2 px-4 rounded-full border border-white/10 z-50 shadow-2xl backdrop-blur-md">
                <div className="flex flex-col items-end mr-2">
                    <span className="text-[10px] font-mono tracking-widest font-black uppercase" style={{ color: current.color }}>
                        {window.nexusData.config.version}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-tighter">
                        <span className="opacity-40 text-white italic">Sync:</span>
                        <span style={{ color: statusColor }}>{seconds}s ago</span>
                    </div>
                </div>
                <div className="relative flex items-center justify-center">
                    {!isUnlocked && (
                        <div className="absolute w-6 h-6 rounded-full border animate-ping opacity-20" style={{ borderColor: statusColor }} />
                    )}
                    <div className="w-2.5 h-2.5 rounded-full z-10 transition-colors duration-500" style={{ backgroundColor: statusColor, boxShadow: `0 0 12px ${statusColor}` }} />
                </div>
            </div>

            <main className="container mx-auto px-8 pt-20 pb-32 max-w-6xl flex-grow text-white">
                <header className="mb-16">
                    <div className="text-[10px] font-mono tracking-[0.4em] mb-4 opacity-40 uppercase">Protocol // {activeID}</div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter" style={{ color: current.color }}>{current.name}</h1>
                    <p className="mt-6 text-xl italic opacity-50 max-w-2xl">"{current.quote}"</p>
                </header>

                <nav className="flex flex-wrap gap-2 mb-20">
                    {Object.keys(window.nexusData.dimensions).sort((a,b)=>a-b).map((id) => (
                        <button key={id} onClick={() => { setActiveID(id); setIsUnlocked(false); }} className={`px-5 py-3 font-mono text-xs border transition-all ${activeID === id ? "scale-105" : "opacity-40"}`}
                            style={{ borderColor: window.nexusData.dimensions[id].color, color: activeID === id ? "#000" : window.nexusData.dimensions[id].color, backgroundColor: activeID === id ? window.nexusData.dimensions[id].color : "transparent" }}>
                            ID_{id}
                        </button>
                    ))}
                </nav>

                <div className="p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md relative rounded-r-xl max-w-4xl">
                    <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: current.color }} />
                    <DimensionWrapper id={activeID} color={current.color} proContent={current.proContent} isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked}>
                        {activeID === "07" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                                {window.nexusData.skills.map((cert) => (
                                    <div key={cert.id} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg">
                                        <div className="text-[8px] opacity-30 font-mono uppercase mb-2">{cert.issuer} // {cert.category}</div>
                                        <div className="text-xs font-bold uppercase">{cert.name}</div>
                                        <a href={cert.path} target="_blank" className="mt-3 block text-[9px] text-cyan-500/60 hover:text-cyan-400 font-mono underline uppercase">Open_Document →</a>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-2xl md:text-4xl font-light text-white/90 uppercase leading-snug">{current.content}</p>
                        )}
                    </DimensionWrapper>
                </div>
            </main>
            <Footer />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);