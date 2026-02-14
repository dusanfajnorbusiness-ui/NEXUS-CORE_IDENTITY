// ==========================================
// 0. FIREBASE & INIT (Základové dosky)
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
// 1. MODUL: AccountPanel (Auth Engine)
// ==========================================
const AccountPanel = ({ color }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const authRef = useRef(null);
  const editRef = useRef(null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("nexus_operator");
    return saved ? JSON.parse(saved) : { name: "HOSŤ_OPERÁTOR", tier: "FREE", subscription: "NONE", bio: "Inicializácia...", avatar: null };
  });

  useEffect(() => { if (user.subscription !== "NONE") setIsLogged(true); }, []);
  useEffect(() => {
    const handleOutside = (e) => {
      if (authRef.current && !authRef.current.contains(e.target)) setShowAuth(false);
      if (editRef.current && !editRef.current.contains(e.target)) setIsEditing(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const saveToNexus = (u) => { setUser(u); localStorage.setItem("nexus_operator", JSON.stringify(u)); };
  
  const handleAuth = (tier) => {
    const keys = { FREE: "NONE", PRO: "NEXUS-150-PRO", PREMIUM: "NEXUS-999-PREMIUM" };
    saveToNexus({ ...user, tier, subscription: "ACTIVE", accessKey: keys[tier] });
    setIsLogged(true); setShowAuth(false);
  };

  const handleSocialLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const u = result.user;
      const nexusUser = { uid: u.uid, name: u.displayName.toUpperCase(), email: u.email, tier: "FREE", avatar: u.photoURL, bio: "Cloud Link aktívny." };
      saveToNexus(nexusUser); setIsLogged(true); setShowAuth(false);
    } catch (e) { console.error(e); }
  };

  return (
    <div className="relative font-mono uppercase">
      {!isLogged ? (
        <div ref={authRef}>
          <button onClick={() => setShowAuth(!showAuth)} className="hud-btn border-thick" style={{ borderColor: color, color: color }}>INITIATE_SESSION</button>
          {showAuth && (
            <div className="absolute top-14 right-0 w-80 bg-black/95 border border-white/20 p-6 z-[100] rounded-xl shadow-2xl">
              <h4 className="text-[#39FF14] text-[10px] mb-4 font-black border-b border-white/10 pb-2">New_Operator_Auth</h4>
              <div className="space-y-3">
                <button onClick={() => handleAuth("FREE")} className="w-full p-2 bg-white/5 border border-white/10 text-[8px] flex justify-between uppercase"><span>FREE_TIER</span><span>0€</span></button>
                <button onClick={() => handleAuth("PRO")} className="w-full p-2 bg-blue-500/10 border border-blue-500/30 text-[8px] text-blue-400 flex justify-between uppercase"><span>PRO_TIER</span><span>🔑 KEY</span></button>
                <button onClick={() => handleAuth("PREMIUM")} className="w-full p-2 bg-yellow-500/10 border border-yellow-500/30 text-[8px] text-yellow-500 flex justify-between uppercase"><span>PREMIUM</span><span>💎 VAULT</span></button>
                <button onClick={handleSocialLogin} className="w-full p-2 border border-[#39FF14]/50 bg-[#39FF14]/10 text-[#39FF14] text-[8px] font-black uppercase mt-2">Google_Cloud_Link</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div ref={editRef}>
          <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-3 bg-black/80 border border-white/10 p-1 pr-4 rounded-full">
            <div className="w-8 h-8 rounded-full border-2 overflow-hidden bg-white/5" style={{ borderColor: color }}>
              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <span className="text-[10px] flex items-center justify-center h-full">{user.name.substring(0, 2)}</span>}
            </div>
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[9px] font-black text-white">{user.name}</span>
              <span className="text-[6px]" style={{ color }}>{user.tier} ACCESS</span>
            </div>
          </button>
          {/* Tu by pokračoval kód pre isEditing panel z predošlej správy */}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. MODUL: UserAdminList (Database View)
// ==========================================
const UserAdminList = ({ users }) => (
  <div className="mt-10 bg-black/40 border border-white/5 p-6 rounded-lg text-white">
    <h3 className="text-[#39FF14] text-[10px] mb-6 tracking-[0.5em] font-black uppercase">Registered_Operators</h3>
    <table className="w-full text-[10px] text-left">
      <thead><tr className="opacity-30 border-b border-white/10"><th>ID</th><th>Operator</th><th>Clearance</th><th>Status</th></tr></thead>
      <tbody>{users.map(u => (<tr key={u.id} className="border-b border-white/5"><td className="py-2">#NEX_{u.id}</td><td>{u.name}</td><td>{u.tier}</td><td className="text-[#39FF14] animate-pulse">In_Field</td></tr>))}</tbody>
    </table>
  </div>
);

// ==========================================
// 3. MODUL: DimensionWrapper (Tier Guard)
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
    <div className="space-y-6">
      <div className="text-left border-l border-white/5 pl-4">{children}</div>
      {!isUnlocked ? (
        <div className="mt-10 p-6 border border-white/5 bg-black/60 rounded-xl space-y-4">
          <input type="password" placeholder="ENTER ACCESS_KEY..." value={keyInput} onChange={(e) => setKeyInput(e.target.value)} className="bg-transparent border-b border-white/10 text-center text-[10px] w-full text-white py-2 focus:outline-none" />
          <button onClick={handleVerify} className="w-full py-2 text-[9px] font-black uppercase" style={{ backgroundColor: color, color: "#000" }}>Unlock Protocol</button>
        </div>
      ) : (
        <div className="animate-in slide-in-from-top-4 space-y-6">
           {(accessLevel === "PRO" || accessLevel === "PREMIUM") && <div className="pt-8 border-t border-white/10 text-white" dangerouslySetInnerHTML={{ __html: proContent }} />}
           {accessLevel === "PREMIUM" && <div className="pt-8 border-t-2 border-cyan-500/30 text-white" dangerouslySetInnerHTML={{ __html: premiumContent }} />}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. MODUL: Footer (System Info)
// ==========================================
const Footer = () => (
  <footer className="mt-auto py-4 border-t border-white/5 bg-black/40 px-6 font-mono text-[8px] uppercase tracking-widest text-[#39FF14] opacity-40">
    <div className="max-w-7xl mx-auto flex justify-between">
      <div>HW: Uzol_2Mb // AI: Gemini_Link</div>
      <div>D. FAJNOR // ARCHITECT © 2026</div>
    </div>
  </footer>
);

// ==========================================
// 5. MODUL: App (Core Logic)
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
    fetch("https://api.github.com/repos/dusanfajnorbusiness-ui/NEXUS-CORE_IDENTITY/commits?per_page=100")
      .then(res => res.json()).then(data => setUpdates(data.map(c => ({ id: c.sha.substring(0,7), date: new Date(c.commit.author.date).toLocaleDateString(), title: c.commit.message.split("\n")[0], desc: c.commit.message.split("\n").slice(1).join(" ").trim() }))));
    const timer = setInterval(() => setSeconds(Math.floor((new Date() - loadTime) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!window.nexusData) return <div>Data_Missing</div>;
  const current = window.nexusData.dimensions[activeID];
  const statusColor = seconds <= 30 ? "#39FF14" : "#FF003C";

  return (
    <div className="min-h-screen flex flex-col bg-[#050505]" style={{ borderLeft: `6px solid ${current.color}` }}>
      {/* HUD HEADER */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-[#39FF14] font-black tracking-widest uppercase">NEXUS-CORE_2Mb</div>
        <div className="flex gap-4">
          <button className="hud-btn border-thin flex items-center gap-2" style={{ color: statusColor, borderColor: statusColor }}>
             <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: statusColor }}></div> STATUS_OK
          </button>
          <AccountPanel color={current.color} />
        </div>
      </div>

      <main className="container mx-auto px-8 pt-32 pb-32 max-w-6xl flex-grow text-white">
        <h1 className="text-6xl font-black uppercase" style={{ color: current.color }}>{current.name}</h1>
        <nav className="flex gap-2 my-10">
          {Object.keys(window.nexusData.dimensions).map(id => (
            <button key={id} onClick={() => { setActiveID(id); setIsUnlocked(false); }} className="p-2 border" style={{ borderColor: window.nexusData.dimensions[id].color, color: window.nexusData.dimensions[id].color }}>ID_{id}</button>
          ))}
        </nav>
        <div className="p-10 bg-white/[0.03] border border-white/10 rounded-xl relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-full" style={{ backgroundColor: current.color }}></div>
          <DimensionWrapper id={activeID} color={current.color} proContent={current.proContent} premiumContent={current.premiumContent} isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked}>
             <p className="text-2xl italic">{current.content}</p>
          </DimensionWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);