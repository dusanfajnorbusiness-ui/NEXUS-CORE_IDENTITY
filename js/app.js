// ==========================================
// 1. MODUL: AccountPanel (S precíznym statusom)
// ==========================================
const AccountPanel = ({ color }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const authRef = useRef(null);
  const editRef = useRef(null);
  
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("nexus_operator");
    return saved ? JSON.parse(saved) : { name: "HOSŤ_OPERÁTOR", tier: "FREE", bio: "Inicializácia...", avatar: null };
  });

  // Uloženie statusu do Firestore pri prihlásení
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = db.collection("operators").doc(firebaseUser.uid);
        await userRef.set({ lastSeen: firebase.firestore.FieldValue.serverTimestamp(), status: 'ONLINE' }, { merge: true });
        const doc = await userRef.get();
        if (doc.exists) setUser(doc.data());
        setIsLogged(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const saveToNexus = async (u) => {
    setUser(u);
    localStorage.setItem("nexus_operator", JSON.stringify(u));
    if (auth.currentUser) {
      await db.collection("operators").doc(auth.currentUser.uid).set(u, { merge: true });
    }
  };

  return (
    <div className="relative font-mono uppercase">
      {!isLogged ? (
        <div ref={authRef}>
          <button onClick={() => setShowAuth(!showAuth)} className="hud-btn border-thick text-[8px] md:text-[10px]" style={{ borderColor: color, color: color }}>INIT_SESSION</button>
          {showAuth && (
            <div className="absolute top-14 right-0 w-64 md:w-80 bg-black/95 border border-white/20 p-4 md:p-6 z-[100] rounded-xl backdrop-blur-xl shadow-2xl">
              <button onClick={handleSocialLogin} className="w-full p-2 border border-[#39FF14]/50 bg-[#39FF14]/10 text-[#39FF14] text-[8px] font-black uppercase">Google_Cloud_Link</button>
            </div>
          )}
        </div>
      ) : (
        <div ref={editRef} className="flex items-center">
          <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-2 md:gap-3 bg-black/80 border border-white/10 p-1 pr-2 md:pr-4 rounded-full">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 overflow-hidden bg-white/5" style={{ borderColor: color }}>
              {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <span className="text-[8px]">{user.name.substring(0,2)}</span>}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none text-left">
              <span className="text-[9px] font-black text-white">{user.name}</span>
              <span className="text-[6px]" style={{ color }}>{user.tier} ACCESS</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. MODUL: UserAdminList (Status Engine)
// ==========================================
const UserAdminList = ({ color }) => {
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("operators").onSnapshot(snapshot => {
      const ops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOperators(ops);
    });
    return () => unsubscribe();
  }, []);

  const getStatusColor = (status) => {
    if (status === 'ONLINE') return '#39FF14';
    if (status === 'SLEEP') return '#FFA500';
    return '#FF003C';
  };

  return (
    <div className="mt-10 bg-black/40 border border-white/5 p-4 md:p-6 rounded-lg text-white">
      <h3 className="text-[10px] mb-6 tracking-[0.5em] font-black uppercase italic" style={{ color }}>Registered_Operators</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[9px] md:text-[10px] text-left">
          <thead className="opacity-30 border-b border-white/10 uppercase text-[7px]">
            <tr><th>Operator</th><th>Clearance</th><th>Status</th></tr>
          </thead>
          <tbody>
            {operators.map(op => (
              <tr key={op.id} className="border-b border-white/5">
                <td className="py-3 font-bold">{op.name}</td>
                <td className="py-3 uppercase text-[8px] opacity-60">{op.tier || 'GUEST'}</td>
                <td className="py-3 italic flex items-center gap-2" style={{ color: getStatusColor(op.status) }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: getStatusColor(op.status) }}></div>
                  {op.status || 'OFFLINE'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ==========================================
// 5. MODUL: App (Core UI & Logic)
// ==========================================
const App = () => {
  const [activeID, setActiveID] = useState("01");
  const [seconds, setSeconds] = useState(0);
  const [updates, setUpdates] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Sťahovanie commitov z GitHubu
    fetch("https://api.github.com/repos/dusanfajnorbusiness-ui/NEXUS-CORE_IDENTITY/commits?per_page=10")
      .then(res => res.json())
      .then(data => {
        setUpdates(data.map(c => {
          const d = new Date(c.commit.author.date);
          return {
            id: c.sha.substring(0,7),
            date: d.toLocaleDateString(),
            // FORMÁT ČASU: 1h01m35s
            time: `${d.getHours()}h${String(d.getMinutes()).padStart(2,'0')}m${String(d.getSeconds()).padStart(2,'0')}s`,
            title: c.commit.message.split("\n")[0],
            desc: c.commit.message.split("\n").slice(1).join(" ").trim()
          };
        }));
      });
      
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const current = window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];
  
  // STATUS OK LOGIKA (Iba pre teba/admina)
  const systemStatus = seconds < 30 ? { label: "ONLINE", color: "#39FF14" } : 
                       seconds < 120 ? { label: "SLEEP", color: "#FFA500" } : 
                       { label: "OFFLINE", color: "#FF003C" };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] font-mono" style={{ borderLeft: `4px md:border-left-[6px] solid ${current.color}` }}>
      
      {/* RESPONZÍVNY HEADER */}
      <div className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2 md:gap-4">
          {/* BOD 2: Prepínač farieb názvu podľa aktívneho ID */}
          <div className="font-black text-sm md:text-lg tracking-widest uppercase transition-colors duration-500" style={{ color: current.color }}>
            NEXUS-CORE_2Mb
          </div>
          <div className="hidden md:block h-4 w-[1px] bg-white/20"></div>
          <span className="hidden lg:block text-[7px] opacity-40 text-white">Uzol_2Mb // Trnava_Station</span>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* BOD 4: Status OK (Online/Sleep/Offline) */}
          <button className="hud-btn border-thin rounded-full flex items-center gap-2 px-3 py-1 text-[8px]" style={{ color: systemStatus.color, borderColor: systemStatus.color }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: systemStatus.color }}></div>
            {systemStatus.label}
          </button>
          
          <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="hud-btn border-medium rounded-full text-[8px] px-3 py-1" style={{ color: current.color, borderColor: current.color }}>
              LOG_{updates[0]?.date}
            </button>
            {isMenuOpen && (
              <div className="absolute top-12 right-0 w-72 md:w-80 bg-black/95 border border-white/20 p-4 rounded-xl z-[100] shadow-2xl">
                <h4 className="text-[#39FF14] text-[10px] font-black mb-4 uppercase italic border-b border-white/10 pb-2">Update_History</h4>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  {updates.map(upd => (
                    <div key={upd.id} className="border-b border-white/5 pb-2 text-left">
                      {/* BOD 3: Čas v tvare 1h01m35s */}
                      <div className="flex justify-between text-[6px] opacity-40 uppercase"><span>#ID_{upd.id}</span><span>{upd.date} // {upd.time}</span></div>
                      <div className="text-[9px] font-bold text-white uppercase">{upd.title}</div>
                      <div className="text-[7px] text-white/50 italic">{upd.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <AccountPanel color={current.color} />
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-8 pt-24 md:pt-32 pb-20 max-w-6xl">
        {/* ... Navigácia a Obsah ... */}
        
        {/* BOD 5: Zoznam registrovaných (Odomkne sa pri Premium/Admin kľúči) */}
        {activeID === "01" && <UserAdminList color={current.color} />}
      </main>
      
      <Footer />
    </div>
  );
};