const { useState, useEffect, useMemo, useRef } = React;

// ==========================================
// 1. MODUL: AUTH & PROFILE ENGINE (NEXUS-CORE_2Mb)
// ==========================================
const AccountPanel = ({ color }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const authRef = useRef(null);
  const editRef = useRef(null);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("nexus_operator");
    return saved ? JSON.parse(saved) : {
      name: "GUEST_OPERATOR",
      tier: "FREE",
      subscription: "NONE",
      tier_level: 0,
      bio: "Initializing status...",
      avatar: null,
      accessKey: "",
    };
  });

  useEffect(() => {
    if (user.subscription !== "NONE") setIsLogged(true);
  }, []);

  // PROTOKOL: Zatvorenie kliknutím mimo okna (Click-Away)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) setShowAuth(false);
      if (editRef.current && !editRef.current.contains(e.target)) setIsEditing(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const saveToNexus = (u) => {
    setUser(u);
    localStorage.setItem("nexus_operator", JSON.stringify(u));
  };

  const handleAuth = (tier) => {
    const keys = { FREE: "NONE", PRO: "NEXUS-150-PRO", PREMIUM: "NEXUS-999-PREMIUM" };
    const newUser = { ...user, tier, subscription: "ACTIVE", accessKey: keys[tier] };
    saveToNexus(newUser);
    setIsLogged(true);
    setShowAuth(false);
  };

  return (
    <div className="relative font-mono uppercase">
      {!isLogged ? (
        <div ref={authRef}>
          <button onClick={() => setShowAuth(!showAuth)} className="hud-btn border-thick" style={{ color: color }}>
            INITIATE_SESSION
          </button>
          {showAuth && (
            <div className="absolute top-14 right-0 w-80 bg-black/95 border border-white/20 p-6 z-[100] rounded-xl backdrop-blur-xl shadow-2xl">
              <h4 className="text-[#39FF14] text-[10px] mb-4 font-black italic border-b border-white/10 pb-2">New_Operator_Auth</h4>
              <div className="space-y-3">
                <button onClick={() => handleAuth("FREE")} className="w-full p-2 bg-white/5 border border-white/10 text-[8px] flex justify-between"><span>FREE_TIER</span><span>0€</span></button>
                <button onClick={() => handleAuth("PRO")} className="w-full p-2 bg-blue-500/10 border border-blue-500/30 text-[8px] text-blue-400 flex justify-between"><span>PRO_TIER</span><span>🔑 KEY_REQ</span></button>
                <button onClick={() => handleAuth("PREMIUM")} className="w-full p-2 bg-yellow-500/10 border border-yellow-500/30 text-[8px] text-yellow-500 flex justify-between"><span>PREMIUM_TIER</span><span>💎 VAULT</span></button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div ref={editRef}>
          <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-3 bg-black/80 border border-white/10 p-1 pr-4 rounded-full">
            <div className="w-8 h-8 rounded-full border-2 overflow-hidden flex items-center justify-center bg-white/5" style={{ borderColor: color }}>
              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <span className="text-[10px]">{user.name.substring(0, 2)}</span>}
            </div>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[9px] font-black text-white">{user.name}</span>
              <span className="text-[6px]" style={{ color }}>{user.tier} ACCESS</span>
            </div>
          </button>
          {isEditing && (
            <div className="absolute top-14 right-0 w-80 bg-black/95 border border-white/20 p-6 z-[100] rounded-xl backdrop-blur-xl shadow-2xl">
               <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                 <h4 className="text-[#39FF14] text-[10px] font-black">PROFILE_OVERHAUL</h4>
                 <button onClick={() => { localStorage.removeItem("nexus_operator"); window.location.reload(); }} className="text-red-500 text-[7px] underline">Logout</button>
               </div>
               <div className="space-y-4">
                  <div className="flex flex-col gap-1 text-left text-white">
                    <label className="text-[6px] opacity-40 uppercase">Identity_Mark</label>
                    <input className="bg-white/10 p-1 text-[10px] text-white focus:outline-none" value={user.name} onChange={(e) => saveToNexus({ ...user, name: e.target.value.toUpperCase() })} />
                  </div>
                  <div className="flex flex-col gap-1 text-left text-white">
                    <label className="text-[6px] opacity-40 uppercase">Tactical_Bio</label>
                    <textarea className="bg-white/5 border border-white/10 p-1 text-[8px] text-white h-12 focus:outline-none" value={user.bio} onChange={(e) => saveToNexus({ ...user, bio: e.target.value })} />
                  </div>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. MODUL: UserAdminList
// ==========================================
const UserAdminList = ({ users }) => (
  <div className="mt-10 bg-black/40 border border-white/5 p-6 rounded-lg">
    <h3 className="text-[#39FF14] font-mono text-[10px] mb-6 tracking-[0.5em] font-black italic text-left uppercase">Operator_Database</h3>
    <div className="overflow-x-auto text-left">
      <table className="w-full font-mono">
        <thead>
          <tr className="text-[8px] opacity-30 border-b border-white/10 uppercase"><th className="pb-2">ID</th><th className="pb-2">Operator</th><th className="pb-2">Clearance</th><th className="pb-2">Status</th></tr>
        </thead>
        <tbody className="text-[10px]">
          {users.map((u) => (
            <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="py-3 text-white/40 italic">#NEX_{u.id}</td><td className="py-3 font-bold">{u.name}</td>
              <td className="py-3"><span className={`px-2 py-0.5 rounded text-[8px] font-black ${u.tier === "ARCHITECT" ? "bg-purple-500/20 text-purple-400 border border-purple-500/50" : u.tier === "PREMIUM" ? "bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/50" : "bg-white/10 text-white/50 border border-white/10"}`}>{u.tier}</span></td>
              <td className="py-3 text-[#39FF14] animate-pulse uppercase italic text-[8px]">In_Field</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ==========================================
// 3. CORE WRAPPER: Tier Guard
// ==========================================
const DimensionWrapper = ({ id, color, children, proContent, premiumContent, isUnlocked, setIsUnlocked }) => {
  const [keyInput, setKeyInput] = useState("");
  const [accessLevel, setAccessLevel] = useState("FREE");

  const handleVerify = () => {
    const input = keyInput.trim().toUpperCase();
    if (input === "NEXUS-OMEGA-OVRD" || input === "NEXUS-999-PREMIUM") { setAccessLevel("PREMIUM"); setIsUnlocked(true); }
    else if (input === "NEXUS-150-PRO") { setAccessLevel("PRO"); setIsUnlocked(true); }
    else { alert("ACCESS DENIED"); setKeyInput(""); }
  };

  return (
    <div className="space-y-6 relative">
      <div className="absolute -inset-2 opacity-10 pointer-events-none blur-xl transition-all" style={{ backgroundColor: color }}></div>
      <div className="text-left relative z-10">
        <div className="text-[7px] opacity-30 font-mono mb-2 tracking-widest uppercase flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#39FF14] animate-pulse"></span> [ Free_Node_Active ]</div>
        <div className="relative z-10 border-l border-white/5 pl-4">{children}</div>
      </div>
      {!isUnlocked ? (
        <div className="mt-10 p-6 border border-white/5 bg-black/60 rounded-xl space-y-4 shadow-2xl relative overflow-hidden">
          <input type="password" placeholder="ENTER ACCESS_KEY..." value={keyInput} onChange={(e) => setKeyInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleVerify()} className="bg-transparent border-b border-white/10 text-center text-[10px] w-full focus:outline-none focus:border-white/40 transition-all font-mono tracking-[0.2em] text-white py-2 relative z-10" />
          <button onClick={handleVerify} className="w-full py-2 text-[9px] font-black uppercase shadow-lg transition-transform active:scale-95" style={{ backgroundColor: color, color: "#000" }}>Unlock Protocol</button>
        </div>
      ) : (
        <div className="space-y-6 relative z-10 text-left">
          {(accessLevel === "PRO" || accessLevel === "PREMIUM") && <div className="pt-8 border-t border-white/10"><div className="text-[7px] text-[#FFD700] mb-4 font-mono tracking-widest uppercase">[ Pro_Unlocked ]</div><div className="pro-content-area text-white/80" dangerouslySetInnerHTML={{ __html: proContent }} /></div>}
          {accessLevel === "PREMIUM" && <div className="pt-8 border-t-2 border-cyan-500/30 bg-cyan-500/5 p-4 rounded-lg"><div className="text-[7px] text-cyan-400 mb-4 font-mono tracking-widest uppercase">[ Premium_Unlocked ]</div><div className="premium-content-area mb-8 text-white/90" dangerouslySetInnerHTML={{ __html: premiumContent || "VAULT_READY..." }} />{window.nexusData.users && <UserAdminList users={window.nexusData.users} />}</div>}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. MODUL: Footer
// ==========================================
const Footer = () => (
  <footer className="mt-auto py-4 border-t border-white/5 bg-black/40 backdrop-blur-md px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
      <div className="flex gap-4 text-[#39FF14]"><span>HW: VISIONBOOK 15WJ+</span><span>//</span><span>AI: GEMINI_NEURAL_LINK</span></div>
      <div className="flex items-center gap-3 border-x border-white/10 px-6"><span className="text-white font-black tracking-[0.3em]">NEXUS CORE</span><span className="text-[7px] italic border border-[#39FF14]/30 px-2 py-0.5 rounded text-[#39FF14]">D. FAJNOR // ARCHITECT</span></div>
      <div className="flex gap-4"><span className="italic text-[#39FF14]/60">"ZORBA-BUDHA_INITIATED"</span><span className="text-white">© 2026</span></div>
    </div>
  </footer>
);

// ==========================================
// 5. CORE: APP COMPONENT
// ==========================================
const App = () => {
  const [activeID, setActiveID] = useState("01");
  const [loadTime] = useState(new Date());
  const [seconds, setSeconds] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logRef = useRef(null);

  const sonarPing = useMemo(() => new Audio("./assets/sounds/sonar-ping.mp3"), []);

  useEffect(() => {
    fetch("https://api.github.com/repos/dusanfajnorbusiness-ui/NEXUS-CORE_IDENTITY/commits")
      .then(res => res.json())
      .then(data => {
        setUpdates(data.slice(0, 10).map(c => ({ id: c.sha.substring(0,7), date: new Date(c.commit.author.date).toLocaleDateString(), title: c.commit.message.split("\n")[0] })));
      }).catch(err => console.error(err));

    const timer = setInterval(() => {
      const diff = Math.floor((new Date() - loadTime) / 1000);
      setSeconds(diff);
      if (!isUnlocked && diff % 10 === 0 && diff > 0) {
        sonarPing.volume = 0.15; sonarPing.play().catch(() => {});
        setShowRadar(true); setTimeout(() => setShowRadar(false), 4000);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [loadTime, isUnlocked, sonarPing]);

  // Click-Away pre Log Menu
  useEffect(() => {
    const handleOutside = (e) => { if (logRef.current && !logRef.current.contains(e.target)) setIsMenuOpen(false); };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!window.nexusData) return <div className="p-20 text-red-500 font-mono text-center uppercase">Critical_Error: Data_Not_Found</div>;

  const current = window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];
  const statusColor = seconds <= 30 ? "#39FF14" : seconds <= 120 ? "#FFD700" : "#FF003C";

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] transition-all" style={{ borderLeft: `6px solid ${current.color}` }}>
      
      {/* 🟢 HUD HEADER (NEXUS-CORE_2Mb FINAL) */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center gap-4">
          <div className="brand-logo-nexus">NEXUS-CORE_2Mb</div>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <span className="text-[7px] opacity-40 font-mono uppercase">Node_2Mb // Trnava_Station</span>
        </div>

        <div className="flex items-center gap-4">
          <button className="hud-btn border-thin rounded-full" style={{ color: statusColor }}>STATUS_OK</button>
          
          <div className="relative" ref={logRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hud-btn border-medium rounded-full" style={{ color: current.color }}>
              LAST_UPGRADE: {updates[0]?.date || "SYNC"}
            </button>
            {isMenuOpen && (
              <div className="absolute top-14 right-0 w-80 bg-black/95 border border-white/20 p-5 rounded-xl shadow-2xl">
                <h4 className="text-[#39FF14] text-[10px] font-black italic border-b border-white/10 pb-2 mb-4">Update_Log</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                  {updates.map(upd => (
                    <div key={upd.id} className="border-b border-white/5 pb-2 text-left">
                      <div className="text-[6px] opacity-40 uppercase">#NODE_{upd.id} // {upd.date}</div>
                      <div className="text-[8px] font-bold text-white uppercase">{upd.title}</div>
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
          <div className="text-[10px] font-mono tracking-[0.4em] mb-4 opacity-40 uppercase">Protocol_{activeID} // NEXUS_FLOW</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none" style={{ color: current.color }}>{current.name}</h1>
          <p className="mt-8 text-xl italic opacity-50 max-w-2xl leading-relaxed">"{current.quote}"</p>
        </header>

        <nav className="flex flex-wrap gap-2 mb-20">
          {Object.keys(window.nexusData.dimensions).sort((a,b)=>a-b).map((id) => (
            <button key={id} onClick={() => { setActiveID(id); setIsUnlocked(false); }} className={`px-5 py-3 font-mono text-xs border transition-all ${activeID === id ? "scale-105" : "opacity-40 hover:opacity-100"}`} style={{ borderColor: window.nexusData.dimensions[id].color, color: activeID === id ? "#000" : window.nexusData.dimensions[id].color, backgroundColor: activeID === id ? window.nexusData.dimensions[id].color : "transparent" }}>ID_{id}</button>
          ))}
        </nav>

        <div className="relative p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-r-xl max-w-4xl shadow-2xl overflow-hidden">
          {!isUnlocked && showRadar && <div className="absolute inset-0 pointer-events-none"><div className="radar-circle" style={{ color: current.color }}></div></div>}
          <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: current.color }} />
          <DimensionWrapper id={activeID} color={current.color} proContent={current.proContent} premiumContent={current.premiumContent} isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked}>
            {activeID === "07" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                {(window.nexusData.skills || []).map((cert) => (
                  <div key={cert.id} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg group hover:border-[#39FF14]/30 transition-colors">
                    <div className="text-[8px] opacity-30 font-mono uppercase mb-2">{cert.issuer} // {cert.category}</div>
                    <div className="text-xs font-bold uppercase">{cert.name}</div>
                    <a href={cert.path} target="_blank" className="mt-3 block text-[9px] text-cyan-500/60 hover:text-cyan-400 font-mono underline uppercase">Open_Document →</a>
                  </div>
                ))}
              </div>
            ) : <p className="text-2xl md:text-4xl font-light text-white/90 uppercase leading-snug italic font-serif">{current.content}</p>}
          </DimensionWrapper>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);