const { useState, useEffect, useMemo } = React;

// 1. MODUL: Account Panel
const AccountPanel = ({ user, color }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!user) return null;

  return (
    <div className="relative font-mono uppercase">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-black/80 border border-white/10 p-1 pr-4 rounded-full hover:border-white/30 transition-all shadow-2xl"
      >
        <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white/5" style={{ borderColor: color }}>
          <span className="text-[10px] font-black">{user.name.substring(0,2)}</span>
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="text-[9px] font-black tracking-widest text-white">{user.name}</span>
          <span className="text-[7px] opacity-50" style={{ color: color }}>{user.tier} ACCESS</span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-64 bg-[#0a0a0a]/95 border border-white/10 p-4 shadow-2xl z-[100] backdrop-blur-xl rounded-xl animate-in zoom-in-95">
          <div className="text-[10px] text-[#39FF14] mb-4 border-b border-white/10 pb-2 font-black italic">OPERATOR_PROFILE_DATA</div>
          <div className="space-y-3 text-left">
            <div>
              <div className="text-[7px] opacity-40 uppercase tracking-tighter">Subscription_Status</div>
              <div className="text-xs font-bold">{user.subscription}</div>
            </div>
            <div>
              <div className="text-[7px] opacity-40 uppercase tracking-tighter">Access_Level</div>
              <div className="text-xs font-bold" style={{ color: color }}>TIER_{user.tier_level}</div>
            </div>
          </div>
          <button className="w-full mt-4 p-2 bg-white/5 border border-white/10 text-[8px] hover:bg-red-500/20 hover:border-red-500/50 transition-all uppercase font-black">
            Terminate_Session
          </button>
        </div>
      )}
    </div>
  );
};

// 2. MODUL: UserAdminList
const UserAdminList = ({ users }) => {
  return (
    <div className="mt-10 bg-black/40 border border-white/5 p-6 rounded-lg animate-in fade-in">
      <h3 className="text-[#39FF14] font-mono text-[10px] mb-6 tracking-[0.5em] font-black italic text-left uppercase">Registered_Operators_Database</h3>
      <div className="overflow-x-auto text-left">
        <table className="w-full font-mono">
          <thead>
            <tr className="text-[8px] opacity-30 border-b border-white/10 uppercase">
              <th className="pb-2">ID</th>
              <th className="pb-2">Operator_Name</th>
              <th className="pb-2">Clearance</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-[10px]">
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-3 text-white/40 italic">#NEX_{u.id}</td>
                <td className="py-3 font-bold">{u.name}</td>
                <td className="py-3">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                    u.tier === 'ARCHITECT' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 
                    u.tier === 'PREMIUM' ? 'bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/50' : 
                    'bg-white/10 text-white/50 border border-white/10'
                  }`}>
                    {u.tier}
                  </span>
                </td>
                <td className="py-3 text-[#39FF14] animate-pulse uppercase">Online</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 3. CORE WRAPPER
const DimensionWrapper = ({ id, color, children, proContent, premiumContent, isUnlocked, setIsUnlocked }) => {
  const [keyInput, setKeyInput] = React.useState("");
  const [accessLevel, setAccessLevel] = React.useState("FREE");

  const handleVerify = () => {
    const input = keyInput.trim().toUpperCase();
    const security = window.nexusData.system_config?.security || {};

    if (input === security.key_admin || input === "NEXUS-OMEGA-OVRD") {
      setAccessLevel("PREMIUM"); setIsUnlocked(true);
      alert("SYSTEM_REPORT: ARCHITECT_LEVEL_ACCESS_GRANTED.");
    } else if (input === security.key_premium || input === "NEXUS-999-PREMIUM") {
      setAccessLevel("PREMIUM"); setIsUnlocked(true);
    } else if (input === security.key_pro || input === "NEXUS-150-PRO") {
      setAccessLevel("PRO"); setIsUnlocked(true);
    } else {
      alert("ACCESS DENIED: INVALID_ENCRYPTION_KEY"); setKeyInput("");
    }
  };

  return (
    <div className="space-y-6 relative">
      <div className="absolute -inset-2 opacity-10 pointer-events-none blur-xl transition-all duration-1000" style={{ backgroundColor: color }}></div>
      <div className="text-left animate-in fade-in duration-700 relative z-10">
        <div className="text-[7px] opacity-30 font-mono mb-2 tracking-widest uppercase flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-[#39FF14] animate-pulse"></span>
          [ Status: Free_Access_Active ]
        </div>
        <div className="relative z-10 border-l border-white/5 pl-4">{children}</div>
      </div>

      {!isUnlocked ? (
        <div className="mt-10 p-6 border border-white/5 bg-black/60 rounded-xl space-y-4 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-1 font-mono text-[6px] opacity-20 uppercase tracking-widest">Auth_Required // {id}</div>
          <input type="password" placeholder="ENTER ACCESS_KEY..." value={keyInput} onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            className="bg-transparent border-b border-white/10 text-center text-[10px] w-full focus:outline-none focus:border-white/40 transition-all font-mono tracking-[0.2em] text-white py-2 relative z-10" />
          <button onClick={handleVerify} className="w-full py-2 text-[9px] font-black uppercase shadow-lg transition-transform active:scale-95" style={{ backgroundColor: color, color: "#000" }}>Verify Identity</button>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-top-4 duration-700 relative z-10 text-left">
          {(accessLevel === "PRO" || accessLevel === "PREMIUM") && (
            <div className="pt-8 border-t border-white/10">
              <div className="text-[7px] text-[#FFD700] mb-4 font-mono tracking-widest uppercase">[ Status: Pro_Protocol_Unlocked ]</div>
              <div className="pro-content-area text-white/80" dangerouslySetInnerHTML={{ __html: proContent }} />
            </div>
          )}
          {accessLevel === "PREMIUM" && (
            <div className="pt-8 border-t-2 border-cyan-500/30 bg-cyan-500/5 p-4 rounded-lg shadow-inner">
              <div className="text-[7px] text-cyan-400 mb-4 font-mono tracking-widest uppercase">[ Status: Premium_Direct_Access ]</div>
              <div className="premium-content-area mb-8 text-white/90" dangerouslySetInnerHTML={{ __html: premiumContent || "DATA_STREAM_ACTIVE..." }} />
              {window.nexusData.users && <UserAdminList users={window.nexusData.users} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// 4. MODUL: Footer
const Footer = () => (
  <footer className="mt-auto py-4 border-t border-white/5 bg-black/40 backdrop-blur-md px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[8px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
      <div className="flex gap-4 text-[#39FF14]">
        <span>HW: VISIONBOOK 15WJ+</span><span>//</span><span>AI: GEMINI_NEURAL_LINK</span>
      </div>
      <div className="flex items-center gap-3 border-x border-white/10 px-6">
        <span className="text-white font-black tracking-[0.3em]">NEXUS CORE</span>
        <span className="text-[7px] italic border border-[#39FF14]/30 px-2 py-0.5 rounded text-[#39FF14]">D. FAJNOR // ARCHITECT</span>
      </div>
      <div className="flex gap-4">
        <span className="italic text-[#39FF14]/60">"ZORBA-BUDHA_INITIATED"</span><span className="text-white">© 2026</span>
      </div>
    </div>
  </footer>
);

// 5. CORE: APP COMPONENT
const App = () => {
  const [activeID, setActiveID] = useState("01");
  const [loadTime] = useState(new Date());
  const [seconds, setSeconds] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  const [updates, setUpdates] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sonarPing = useMemo(() => new Audio("./assets/sounds/sonar-ping.mp3"), []);

  useEffect(() => {
    fetch('https://api.github.com/repos/dusanfajnorbusiness-ui/NEXUS-CORE_IDENTITY/commits')
      .then(res => res.json())
      .then(data => {
        const formatted = data.slice(0, 10).map(commit => {
          const lines = commit.commit.message.split('\n');
          return { id: commit.sha.substring(0, 7), date: new Date(commit.commit.author.date).toLocaleDateString(), title: lines[0], desc: lines.slice(1).join(' ') || "No description." };
        });
        setUpdates(formatted);
        setTimeout(() => setShowIntro(false), 8000);
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

  const getStatusColor = () => seconds <= 30 ? "#39FF14" : seconds <= 120 ? "#8B4513" : "#FF003C";

  if (!window.nexusData) return <div className="p-20 text-red-500 font-mono text-center">CRITICAL_ERROR</div>;

  const current = window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];
  const statusColor = getStatusColor();

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] transition-all duration-700 shadow-inner" style={{ borderLeft: `6px solid ${current.color}` }}>
      
      {/* HUD: Hlavička systému */}
      <div className="fixed top-4 right-4 md:top-8 md:right-8 flex items-center gap-3 z-50">
        
        {/* MODUL: ACCOUNT */}
        <AccountPanel user={window.nexusData.currentUser} color={current.color} />

        {/* MODUL: LAST UPDATE */}
        <div className="relative font-mono text-[8px] tracking-[0.2em] uppercase">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-black/90 p-2 px-4 rounded-full border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-2 hover:bg-white/5 transition-all shadow-inner" style={{ color: statusColor }}>
            <span className="animate-pulse">●</span> LAST_UPDATE: {updates[0]?.date || "SYNCING..."}
          </button>

          {showIntro && updates.length > 0 && (
            <div className="absolute top-12 right-0 space-y-2 w-64 pointer-events-none">
              {updates.slice(0, 3).map((upd, i) => (
                <div key={upd.id} className="p-2 bg-black/95 border border-white/10 text-white animate-out fade-out slide-out-to-right duration-1000 fill-mode-forwards" style={{ animationDelay: `${(i * 2) + 1}s` }}>
                  <div className="text-[#39FF14] text-[6px] font-black">[NEW_DEPLOYMENT]</div>
                  <div className="normal-case opacity-90 text-[8px] italic">{upd.title}</div>
                </div>
              ))}
            </div>
          )}

          {isMenuOpen && (
            <div className="absolute top-12 right-0 w-80 bg-black/95 border border-white/20 shadow-2xl p-5 rounded-xl animate-in fade-in zoom-in-95 backdrop-blur-xl">
              <h4 className="border-b border-white/10 pb-2 mb-4 text-[#39FF14] font-black italic tracking-widest text-[10px] uppercase">Update_Log_History</h4>
              <div className="space-y-5 max-h-[350px] overflow-y-auto pr-3 custom-scrollbar text-left">
                {updates.map(upd => (
                  <div key={upd.id} className="border-b border-white/5 pb-3 opacity-80 hover:opacity-100">
                    <div className="flex justify-between text-[6px] mb-1 font-mono">
                      <span className="text-white/30 italic">#NODE_{upd.id}</span>
                      <span style={{ color: statusColor }}>{upd.date}</span>
                    </div>
                    <div className="text-[9px] font-bold text-white mb-1 uppercase tracking-tight">{upd.title}</div>
                    <div className="text-[7px] normal-case opacity-50 italic">{upd.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MODUL: SYNC STATUS */}
        <div className="bg-black/90 p-2 px-4 rounded-full border border-white/10 shadow-2xl backdrop-blur-md flex items-center gap-3">
          <div className="flex flex-col items-end mr-2 text-[10px] font-mono font-black uppercase" style={{ color: current.color }}>
            {window.nexusData.system_config?.version || "v1.0"}
            <div className="text-[7px] uppercase tracking-tighter italic opacity-40 text-white">Sync: <span style={{ color: statusColor }}>{seconds}s ago</span></div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor, boxShadow: `0 0 12px ${statusColor}` }} />
        </div>
      </div>

      {/* HLAVNÝ OBSAH */}
      <main className="container mx-auto px-8 pt-20 pb-32 max-w-6xl flex-grow text-white text-left">
        <header className="mb-16">
          <div className="text-[10px] font-mono tracking-[0.4em] mb-4 opacity-40 uppercase text-left">
             Protocol_{activeID} // {
               activeID === "01" ? "Personal Space" : activeID === "02" ? "Work Space" : activeID === "03" ? "Finance Space" :
               activeID === "04" ? "Business Space" : activeID === "05" ? "Investments Space" : activeID === "06" ? "Study Space" :
               activeID === "07" ? "Professional Space" : activeID === "08" ? "Reader Space" : activeID === "09" ? "Player Space" :
               activeID === "10" ? "Home Space" : "Recovery Space"
             }
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-left" style={{ color: current.color }}>{current.name}</h1>
          <div className="text-[10px] font-mono tracking-[0.2em] opacity-30 uppercase mt-4 flex items-center gap-2">
             <span style={{ color: current.color }}>●</span>
             <span>Dimenzia_{activeID} // NEXUS_IDENTITY_FLOW</span>
          </div>
          <p className="mt-8 text-xl italic opacity-50 max-w-2xl leading-relaxed text-left">"{current.quote}"</p>
        </header>

        <nav className="flex flex-wrap gap-2 mb-20">
          {Object.keys(window.nexusData.dimensions).sort((a, b) => a - b).map((id) => (
            <button key={id} onClick={() => { setActiveID(id); setIsUnlocked(false); }} className={`px-5 py-3 font-mono text-xs border transition-all ${activeID === id ? "scale-105" : "opacity-40 hover:opacity-100"}`}
              style={{ borderColor: window.nexusData.dimensions[id].color, color: activeID === id ? "#000" : window.nexusData.dimensions[id].color, backgroundColor: activeID === id ? window.nexusData.dimensions[id].color : "transparent" }}>
              ID_{id}
            </button>
          ))}
        </nav>

        <div className="relative p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-r-xl max-w-4xl overflow-hidden shadow-2xl">
          {!isUnlocked && showRadar && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="radar-circle" style={{ color: current.color }}></div>
              <div className="radar-circle delay-1" style={{ color: current.color }}></div>
            </div>
          )}
          <div className="absolute top-0 left-0 w-1.5 h-full z-20" style={{ backgroundColor: current.color }} />
          
          <DimensionWrapper 
             id={activeID} color={current.color} 
             proContent={current.proContent} premiumContent={current.premiumContent} 
             isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked}
          >
              {activeID === "07" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-4 custom-scrollbar">
                  {(window.nexusData.skills || []).map((cert) => (
                    <div key={cert.id} className="p-4 border border-white/5 bg-white/[0.02] rounded-lg group hover:border-cyan-500/30 transition-colors">
                      <div className="text-[8px] opacity-30 font-mono uppercase mb-2">{cert.issuer} // {cert.category}</div>
                      <div className="text-xs font-bold uppercase">{cert.name}</div>
                      <a href={cert.path} target="_blank" className="mt-3 block text-[9px] text-cyan-500/60 hover:text-cyan-400 font-mono underline uppercase">Open_Document →</a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-2xl md:text-4xl font-light text-white/90 uppercase leading-snug text-left italic font-serif">
                   {current.content}
                </p>
              )}
          </DimensionWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// FINÁLNY RENDER
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);