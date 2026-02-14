// ==========================================
// 0. FIREBASE & INIT (v5.9.8 - Stability Fix)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyAZ63dB9Rc5zX-qabOCC0LSErQnwzr9eaE",
  authDomain: "nexus-core-2mb.firebaseapp.com",
  projectId: "nexus-core-2mb",
  storageBucket: "nexus-core-2mb.firebasestorage.app",
  messagingSenderId: "906269523308",
  appId: "1:906269523308:web:1c719d64412c92bf570749",
  measurementId: "G-QE4GE8TZN9"
};

if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const { useState, useEffect, useMemo, useRef } = React;

// ==========================================
// 1. MODUL: OperatorMonitor (Metrics Console)
// ==========================================
const OperatorMonitor = ({ color }) => {
  const [operators, setOperators] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const monitorRef = useRef(null);

  useEffect(() => {
    // Real-time stream z Cloud Firestore
    const unsubscribe = db.collection("operators").onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOperators(data);
    });
    
    const handleOutside = (e) => {
      if (monitorRef.current && !monitorRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => { unsubscribe(); document.removeEventListener("mousedown", handleOutside); };
  }, []);

  const getStatusInfo = (lastSeen) => {
    if (!lastSeen) return { label: "OFFLINE", color: "#FF003C" };
    const now = Date.now();
    const last = lastSeen.toDate ? lastSeen.toDate().getTime() : new Date(lastSeen).getTime();
    const diff = (now - last) / 1000;
    if (diff < 60) return { label: "ONLINE", color: "#39FF14" };
    if (diff < 300) return { label: "SLEEP", color: "#FFA500" };
    return { label: "OFFLINE", color: "#FF003C" };
  };

  return (
    <div className="relative font-mono" ref={monitorRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="hud-btn border-thin rounded-full flex items-center gap-2 px-3 py-1 text-[8px]" style={{ color: color, borderColor: color }}>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }}></div>
        OPERATORS_METRICS
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-[300px] md:w-[450px] bg-black/95 border border-white/20 p-4 rounded-xl z-[200] shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95">
          <h4 className="text-[#39FF14] text-[10px] font-black mb-4 uppercase italic border-b border-white/10 pb-2 flex justify-between">
            <span>System_Wide_Metrics</span>
            <span className="opacity-50">Nodes: {operators.length}</span>
          </h4>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {operators.map(op => {
              const status = getStatusInfo(op.lastOnline);
              const regDate = op.registeredAt?.toDate ? op.registeredAt.toDate().toLocaleDateString() : "N/A";
              return (
                <div key={op.id} className="bg-white/5 border border-white/5 p-3 rounded-lg flex flex-col gap-2 hover:bg-white/10 transition-all">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: status.color }}></div>
                      <span className="text-[10px] font-bold text-white uppercase">{op.name || "Unknown"}</span>
                    </div>
                    <span className="text-[7px] px-2 py-0.5 rounded border border-white/10" style={{ color: op.tier === 'PRO' ? '#39FF14' : op.tier === 'PREMIUM' ? '#FFD700' : '#fff' }}>
                      {op.tier || 'FREE'}_ACCESS
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[6px] opacity-40 uppercase">
                    <div>Ident_Date: {regDate}</div>
                    <div className="text-right italic">Last_Ping: {status.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. MODUL: AccountPanel (Cloud Identity)
// ==========================================
const AccountPanel = ({ color }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState({ name: "GUEST", tier: "FREE" });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = db.collection("operators").doc(firebaseUser.uid);
        const doc = await userRef.get();
        
        const nexusData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName.toUpperCase(),
          avatar: firebaseUser.photoURL,
          lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
          tier: doc.exists ? doc.data().tier : "FREE",
          registeredAt: doc.exists ? doc.data().registeredAt : firebase.firestore.FieldValue.serverTimestamp()
        };

        await userRef.set(nexusData, { merge: true });
        setUser(nexusData);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => auth.signInWithPopup(googleProvider);

  return (
    <div className="flex items-center gap-4">
      {!isLogged ? (
        <button onClick={handleLogin} className="hud-btn border-thick text-[8px]" style={{ color, borderColor: color }}>INIT_SESSION</button>
      ) : (
        <div className="flex items-center gap-2 border border-white/10 p-1 pr-3 rounded-full bg-black/40 backdrop-blur-md">
          <img src={user.avatar} className="w-6 h-6 rounded-full border border-white/20" />
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-white leading-none">{user.name}</span>
            <span className="text-[6px] opacity-50 uppercase tracking-tighter" style={{ color }}>{user.tier}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. MODUL: DimensionWrapper (Security Guard)
// ==========================================
const DimensionWrapper = ({ id, color, children, proContent, premiumContent, isUnlocked, setIsUnlocked }) => {
  const [keyInput, setKeyInput] = useState("");
  const [accessLevel, setAccessLevel] = useState("FREE");

  const handleVerify = () => {
    const input = keyInput.trim().toUpperCase();
    if (["NEXUS-OMEGA-OVRD", "NEXUS-999-PREMIUM"].includes(input)) { setAccessLevel("PREMIUM"); setIsUnlocked(true); }
    else if (input === "NEXUS-150-PRO") { setAccessLevel("PRO"); setIsUnlocked(true); }
    else { alert("ACCESS DENIED"); setKeyInput(""); }
  };

  return (
    <div className="space-y-6 relative">
      <div className="text-left border-l border-white/5 pl-4">{children}</div>
      {!isUnlocked ? (
        <div className="mt-10 p-6 border border-white/5 bg-black/60 rounded-xl space-y-4 shadow-2xl">
          <input type="password" placeholder="ENTER ACCESS_KEY..." value={keyInput} onChange={(e) => setKeyInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleVerify()} className="bg-transparent border-b border-white/10 text-center text-[10px] w-full text-white py-2 focus:outline-none" />
          <button onClick={handleVerify} className="w-full py-2 text-[9px] font-black uppercase shadow-lg transition-transform active:scale-95" style={{ backgroundColor: color, color: "#000" }}>Unlock Protocol</button>
        </div>
      ) : (
        <div className="animate-in slide-in-from-top-4 space-y-8 text-left text-white font-mono">
           {(accessLevel === "PRO" || accessLevel === "PREMIUM") && <div className="pt-8 border-t border-white/10 pro-content-area" dangerouslySetInnerHTML={{ __html: proContent }} />}
           {accessLevel === "PREMIUM" && <div className="pt-8 border-t-2 border-cyan-500/30 bg-cyan-500/5 p-4 rounded-lg premium-content-area" dangerouslySetInnerHTML={{ __html: premiumContent }} />}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. MODUL: Footer (System Info)
// ==========================================
const Footer = () => (
  <footer className="mt-auto py-4 border-t border-white/5 bg-black/40 backdrop-blur-md px-6 font-mono text-[8px] uppercase tracking-widest opacity-40">
    <div className="max-w-7xl mx-auto flex justify-between text-[#39FF14]">
      <div>HW: Uzol_2Mb // Trnava_Station // AI: Gemini_Link</div>
      <div>D. FAJNOR // ARCHITECT © 2026</div>
    </div>
  </footer>
);

// ==========================================
// 5. MODUL: App (Core Logic & UI)
// ==========================================
const App = () => {
  const [activeID, setActiveID] = useState("01");
  const [loadTime] = useState(new Date());
  const [seconds, setSeconds] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    // Sťahovanie Update histórie z GitHubu
    fetch("https://api.github.com/repos/dusanfajnorbusiness-ui/NEXUS-CORE_IDENTITY/commits?per_page=100")
      .then(res => res.json()).then(data => {
        if(Array.isArray(data)) {
          setUpdates(data.map(c => ({ id: c.sha.substring(0,7), date: new Date(c.commit.author.date).toLocaleDateString(), title: c.commit.message.split("\n")[0], desc: c.commit.message.split("\n").slice(1).join(" ").trim() })));
        }
      });
    const timer = setInterval(() => setSeconds(Math.floor((new Date() - loadTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, [loadTime]);

  useEffect(() => {
    const handleOutside = (e) => { if (logRef.current && !logRef.current.contains(e.target)) setIsMenuOpen(false); };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isMenuOpen]);

  if (!window.nexusData) return <div className="p-20 text-red-500 font-mono text-center uppercase text-white">Critical_Error: Data_Not_Found</div>;
  const current = window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];
  const statusColor = seconds <= 30 ? "#39FF14" : seconds <= 120 ? "#FFD700" : "#FF003C";

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] transition-all duration-700 font-mono" style={{ borderLeft: `6px solid ${current.color}` }}>
      
      {/* HUD HEADER */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black to-transparent backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="brand-logo-nexus font-black text-lg tracking-widest uppercase transition-colors duration-500" style={{ color: current.color }}>NEXUS-CORE_2Mb</div>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <span className="text-[7px] opacity-40 text-white uppercase tracking-tighter hidden md:block">Uzol_2Mb // Trnava_Station</span>
        </div>

        <div className="flex items-center gap-4">
          {/* BOD: Status & Operator Metrics */}
          <OperatorMonitor color={current.color} />
          
          <div className="relative" ref={logRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hud-btn border-medium rounded-full uppercase" style={{ color: current.color, borderColor: current.color }}>
              LOG_{updates[0]?.date || "SYNC"}
            </button>
            {isMenuOpen && (
              <div className="absolute top-14 right-0 w-80 bg-black/95 border border-white/20 p-5 rounded-xl shadow-2xl backdrop-blur-xl z-[100] animate-in fade-in zoom-in-95">
                <h4 className="text-[#39FF14] text-[10px] font-black border-b border-white/10 pb-2 mb-4 uppercase tracking-widest italic text-left">Update_History_Log</h4>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar text-left text-white">
                  {updates.map(upd => (
                    <div key={upd.id} className="border-b border-white/5 pb-3">
                      <div className="flex justify-between text-[6px] opacity-40 italic uppercase"><span>#NODE_{upd.id}</span><span>{upd.date}</span></div>
                      <div className="text-[9px] font-bold text-white uppercase tracking-tight">{upd.title}</div>
                      {upd.desc && <div className="mt-1 text-[7px] text-white/50 leading-relaxed italic">{upd.desc}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <AccountPanel color={current.color} />
        </div>
      </div>

      <main className="container mx-auto px-8 pt-32 pb-32 max-w-6xl flex-grow text-white text-left">
        <header className="mb-16">
          <div className="text-[10px] font-mono tracking-[0.4em] mb-4 opacity-40 uppercase font-black">Protocol_{activeID} // NEXUS_FLOW</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ color: current.color }}>{current.name}</h1>
          <p className="mt-8 text-xl italic opacity-50 max-w-2xl leading-relaxed">"{current.quote}"</p>
        </header>

        <nav className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2 mb-20">
          {Object.keys(window.nexusData.dimensions).sort((a,b)=>a-b).map((id) => (
            <button key={id} onClick={() => { setActiveID(id); setIsUnlocked(false); }} className={`p-3 font-mono text-[9px] border transition-all ${activeID === id ? "scale-105 shadow-[0_0_15px_rgba(0,0,0,0.5)]" : "opacity-40 hover:opacity-100"}`} style={{ borderColor: window.nexusData.dimensions[id].color, color: activeID === id ? "#000" : window.nexusData.dimensions[id].color, backgroundColor: activeID === id ? window.nexusData.dimensions[id].color : "transparent" }}>ID_{id}</button>
          ))}
        </nav>

        <div className="relative p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-xl max-w-4xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: current.color }} />
          <DimensionWrapper id={activeID} color={current.color} proContent={current.proContent} premiumContent={current.premiumContent} isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked}>
            {activeID === "07" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                {(window.nexusData.skills || []).map((cert) => (
                  <div key={cert.id} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg group hover:border-[#39FF14]/30 transition-all">
                    <div className="text-[8px] opacity-30 font-mono uppercase mb-2">{cert.issuer} // {cert.category}</div>
                    <div className="text-xs font-bold uppercase">{cert.name}</div>
                    <a href={cert.path} target="_blank" className="mt-3 block text-[9px] text-cyan-500/60 hover:text-cyan-400 font-mono underline uppercase">Open_Document →</a>
                  </div>
                ))}
              </div>
            ) : <p className="text-2xl md:text-3xl font-light text-white/90 uppercase leading-snug italic font-serif">{current.content}</p>}
          </DimensionWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);