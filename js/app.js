// 1. MODUL: Paywall (Opravený pre ID_04)
const PaywallModule = () => {
  return (
    <div className="p-4 border border-[#E0A800]/30 bg-[#E0A800]/5 rounded text-[#E0A800] animate-in fade-in duration-700">
      <h3 className="text-[10px] font-black uppercase mb-2 italic">
        Revenue-Model v1.0
      </h3>
      <div className="flex justify-between text-[11px] font-mono border-b border-[#E0A800]/20 pb-2">
        <span>ACCESS_KEY (FULL)</span>
        <span>150 €</span>
      </div>
      <p className="text-[8px] mt-2 opacity-70 italic leading-tight">
        Zero Friction predaj vedomostnej syntézy.
      </p>
    </div>
  );
};

// 2. CORE WRAPPER (Strážca s Radarom a Fixom pre ID_01/10)
const DimensionWrapper = ({ id, children, proContent, color }) => {
  const [unlocked, setUnlocked] = useState(false);
  const [key, setKey] = useState("");

  // Ak nie je proContent (ID 01, 10), vykresli len čistý obsah
  if (!proContent) return <div className="text-left">{children}</div>;

  return (
    <div className="space-y-4">
      <div className="text-left">{children}</div>
      {!unlocked ? (
        <div className="relative p-2 border border-dashed border-white/10 rounded-lg bg-black/80 mt-2 overflow-hidden max-w-sm mx-auto md:mx-0">
          <div className="absolute inset-0 overflow-hidden opacity-60 pointer-events-none">
            <div
              className="radar-circle"
              style={{ borderColor: color, color: color }}
            ></div>
          </div>
          <div className="relative z-10 flex items-center gap-2 p-2">
            <input
              type="password"
              placeholder="KEY..."
              className="bg-transparent border-b border-white/10 text-center text-[10px] w-full focus:outline-none focus:border-white/40 transition-all font-mono"
              onChange={(e) => setKey(e.target.value)}
            />
            <button
              onClick={() =>
                key === "NEXUS-150-PRO" ? setUnlocked(true) : alert("DENIED")
              }
              className="px-4 py-1 text-[9px] font-black uppercase transition-all active:scale-95 shadow-lg"
              style={{ backgroundColor: color, color: "#000" }}
            >
              {" "}
              Verify{" "}
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in slide-in-from-top-2 fade-in pt-4 mt-4 border-t border-white/10 text-left">
          {proContent === "LOAD_LIBRARY_MODULE" ? (
            <LibraryVault />
          ) : proContent === "LOAD_PAYWALL_MODULE" ? (
            <PaywallModule />
          ) : (
            proContent
          )}
        </div>
      )}
    </div>
  );
};

// 3. MODUL: Library Display
const LibraryVault = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {["OSHO", "RUIZ", "KIYOSAKI", "PETERSON"].map((author) => (
        <div
          key={author}
          className="p-3 border border-white/10 bg-white/5 text-[9px] font-mono text-center shadow-[0_0_10px_rgba(255,255,255,0.05)]"
        >
          {author}_ARCHIVE.dat
        </div>
      ))}
    </div>
  );
};
// 4. CORE: App Component
const App = () => {
  const [activeID, setActiveID] = useState("01");

  // POISTKA: Ak data.js zlyhá, systém nespadne
  if (!window.nexusData)
    return (
      <div className="p-20 text-red-500 font-mono">
        CRITICAL_ERROR: DATA_NODE_OFFLINE
      </div>
    );

  const current =
    window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];

  return (
    <div
      className="min-h-screen p-8 md:p-20 transition-all duration-700"
      style={{ borderLeft: `6px solid ${current.color}` }}
    >
      {/* HUD: Identity Badge */}
      <div className="fixed top-8 right-8 flex items-center gap-3 bg-black/80 p-3 px-5 rounded-full border border-white/10 z-50">
        <span
          className="text-[10px] font-mono tracking-widest font-bold"
          style={{ color: current.color }}
        >
          NEXUS-CORE_IDENTITY
        </span>
        <div
          className="w-2.5 h-2.5 rounded-full pulse"
          style={{ backgroundColor: current.color }}
        />
      </div>

      <header className="mb-16">
        <div className="text-[10px] font-mono tracking-[0.4em] mb-4 opacity-40 uppercase">
          Protocol // {activeID}
        </div>
        <h1
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter"
          style={{ color: current.color }}
        >
          {current.name}
        </h1>
        <p className="mt-6 text-xl italic opacity-50 max-w-2xl">
          "{current.quote}"
        </p>
      </header>

      {/* Navigácia: 10 Dimenzií */}
      <nav className="flex flex-wrap gap-2 mb-20">
        {Object.keys(window.nexusData.dimensions)
          .sort((a, b) => a - b)
          .map((id) => (
            <button
              key={id}
              onClick={() => setActiveID(id)}
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
              {" "}
              ID_{id}{" "}
            </button>
          ))}
      </nav>

      <main className="max-w-4xl">
        <div className="p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md relative rounded-r-xl">
          <div
            className="absolute top-0 left-0 w-1.5 h-full"
            style={{ backgroundColor: current.color }}
          />
          <DimensionWrapper
            id={activeID}
            color={current.color}
            proContent={current.proContent}
          >
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
              <p className="text-2xl md:text-3xl font-light text-white/90 uppercase leading-snug">
                {current.content}
              </p>
            )}
            {current.link && (
              <a
                href={current.link}
                target="_blank"
                className="mt-6 block text-xs underline font-mono"
                style={{ color: current.color }}
              >
                OPEN_EXTERNAL_HUB →
              </a>
            )}
          </DimensionWrapper>
        </div>
      </main>
    </div>
  );
};

//root
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
