// ==========================================
// 0. FIREBASE & INIT (v6.2 - Identity Restored)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyAZ63dB9Rc5zX-qabOCC0LSErQnwzr9eaE",
  authDomain: "nexus-core-2mb.firebaseapp.com",
  projectId: "nexus-core-2mb",
  storageBucket: "nexus-core-2mb.firebasestorage.app",
  messagingSenderId: "906269523308",
  appId: "1:906269523308:web:1c719d64412c92bf570749",
  measurementId: "G-QE4GE8TZN9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const { useState, useEffect, useMemo, useRef } = React;

// ==========================================
// 1. MODUL: OperatorMonitor (PRIORITY_1: USERS)
// ==========================================
const OperatorMonitor = ({ color }) => {
  const [operators, setOperators] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const monitorRef = useRef(null);

  useEffect(() => {
    const unsubscribe = db.collection("operators").onSnapshot(
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOperators(data);
      },
      (err) => console.warn("Firestore access pending..."),
    );

    const handleOutside = (e) => {
      if (monitorRef.current && !monitorRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  const getStatusInfo = (lastSeen) => {
    if (!lastSeen) return { label: "OFFLINE", color: "#FF003C" };
    const now = Date.now();
    const last = lastSeen.toDate
      ? lastSeen.toDate().getTime()
      : new Date(lastSeen).getTime();
    const diff = (now - last) / 1000;
    if (diff < 60) return { label: "ONLINE", color: "#39FF14" };
    if (diff < 300) return { label: "SLEEP", color: "#FFA500" };
    return { label: "OFFLINE", color: "#FF003C" };
  };

  return (
    <div className="relative font-mono" ref={monitorRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hud-btn border-thin rounded-full flex items-center gap-2 px-3 py-1 text-[10px] md:text-[12px] h-[32px]"
        style={{ color: color, borderColor: color }}
      >
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: color }}
        ></div>
        OPERATORS [{operators.length}]
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-[300px] md:w-[450px] bg-black/95 border border-white/20 p-4 rounded-xl z-[200] shadow-2xl backdrop-blur-xl">
          <h4 className="text-[#39FF14] text-[12px] font-black mb-4 uppercase italic border-b border-white/10 pb-2">
            Live_Fleet_Telemetria
          </h4>
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {operators.map((op) => {
              const status = getStatusInfo(op.lastOnline);
              const lastTime = op.lastOnline?.toDate
                ? op.lastOnline.toDate().toLocaleTimeString("sk-SK")
                : "--:--:--";
              return (
                <div
                  key={op.id}
                  className="bg-white/5 border border-white/5 p-3 rounded-lg flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-white uppercase">
                      {op.name || "Unknown"}
                    </span>
                    <span
                      className="text-[10px] font-black"
                      style={{ color: op.tier === "PRO" ? "#39FF14" : "#888" }}
                    >
                      {op.tier || "FREE"}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] opacity-60">
                    <span style={{ color: status.color }}>{status.label}</span>
                    <span>{lastTime}</span>
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
// 2. MODUL: AccountPanel (Session + Key Init)
// ==========================================
const AccountPanel = ({ color }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [inputKey, setInputKey] = useState(""); // Pre zadanie kódu

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = db.collection("operators").doc(firebaseUser.uid);
        const doc = await userRef.get();

        const nexusData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName?.toUpperCase() || "OPERATOR",
          avatar: firebaseUser.photoURL,
          lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
          tier: doc.exists ? doc.data().tier : "FREE",
        };

        await userRef.set(nexusData, { merge: true });
        setUser(nexusData);
        setIsLogged(true);
      } else {
        setIsLogged(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => auth.signInWithPopup(googleProvider);

  // LOGIKA OVERENIA KĽÚČA
  const upgradeTier = async () => {
    if (inputKey === "NEXUS-150-PRO" || inputKey === "NEXUS-999-PREMIUM") {
      const newTier = inputKey.includes("150") ? "PRO" : "PREMIUM";
      await db.collection("operators").doc(user.uid).update({
        tier: newTier,
      });
      alert(`SYSTEM_UPDATE: Prístup ${newTier} aktivovaný!`);
      window.location.reload(); // Refresh pre načítanie nových práv
    } else {
      alert("ACCESS_DENIED: Neplatný kód.");
    }
  };

  return (
    <div className="flex items-center h-[32px] gap-2">
      {!isLogged ? (
        <button
          onClick={handleLogin}
          className="hud-btn border-thick text-[10px] md:text-[12px] px-4 h-full animate-pulse"
          style={{ color, borderColor: color }}
        >
          INIT_SESSION
        </button>
      ) : (
        <div className="flex items-center gap-3">
          {/* POLE PRE KĽÚČ (Zobrazí sa len ak je užívateľ FREE) */}
          {user?.tier === "FREE" && (
            <div className="flex h-full border border-white/20 rounded-full overflow-hidden bg-black/60">
              <input
                type="text"
                placeholder="ENTER_KEY"
                className="bg-transparent text-[8px] px-2 w-20 outline-none text-white font-mono"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value.toUpperCase())}
              />
              <button
                onClick={upgradeTier}
                className="bg-white/10 px-2 text-[8px] hover:bg-white/20 transition-all border-l border-white/20"
                style={{ color }}
              >
                SYNC
              </button>
            </div>
          )}

          {/* PROFILOVÝ CHIP */}
          <div className="flex items-center gap-2 border border-white/10 p-1 pr-3 rounded-full bg-black/40 h-[32px]">
            <img
              src={user?.avatar}
              className="w-6 h-6 rounded-full border border-white/20"
              alt="avatar"
            />
            <div className="flex flex-col leading-none text-left">
              <span className="text-[9px] font-black text-white truncate max-w-[60px]">
                {user?.name}
              </span>
              <span
                className="text-[7px] font-bold opacity-50 uppercase"
                style={{ color }}
              >
                {user?.tier}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. MODUL: DimensionWrapper (Tier Guard)
// ==========================================
const DimensionWrapper = ({
  id,
  color,
  children,
  proContent,
  premiumContent,
  isUnlocked,
  setIsUnlocked,
}) => {
  const [keyInput, setKeyInput] = useState("");
  const [accessLevel, setAccessLevel] = useState("FREE");
  const handleVerify = () => {
    const input = keyInput.trim().toUpperCase();
    if (["NEXUS-OMEGA-OVRD", "NEXUS-999-PREMIUM"].includes(input)) {
      setAccessLevel("PREMIUM");
      setIsUnlocked(true);
    } else if (input === "NEXUS-150-PRO") {
      setAccessLevel("PRO");
      setIsUnlocked(true);
    } else {
      alert("ACCESS DENIED");
      setKeyInput("");
    }
  };
  return (
    <div className="space-y-6 relative">
      <div className="text-left border-l border-white/5 pl-4">{children}</div>
      {!isUnlocked ? (
        <div className="mt-10 p-6 border border-white/5 bg-black/60 rounded-xl space-y-4 shadow-2xl">
          <input
            type="password"
            placeholder="ENTER ACCESS_KEY..."
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            className="bg-transparent border-b border-white/10 text-center text-[10px] w-full text-white py-2 focus:outline-none"
          />
          <button
            onClick={handleVerify}
            className="w-full py-2 text-[9px] font-black uppercase shadow-lg transition-transform active:scale-95"
            style={{ backgroundColor: color, color: "#000" }}
          >
            Unlock Protocol
          </button>
        </div>
      ) : (
        <div className="animate-in slide-in-from-top-4 space-y-8 text-left text-white">
          {(accessLevel === "PRO" || accessLevel === "PREMIUM") && (
            <div
              className="pt-8 border-t border-white/10 pro-content-area"
              dangerouslySetInnerHTML={{ __html: proContent }}
            />
          )}
          {accessLevel === "PREMIUM" && (
            <div
              className="pt-8 border-t-2 border-cyan-500/30 bg-cyan-500/5 p-4 rounded-lg premium-content-area"
              dangerouslySetInnerHTML={{ __html: premiumContent }}
            />
          )}
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
// 5. MODUL: App (HUD & Core UI - v7.2)
// ==========================================
const App = () => {
  const [activeID, setActiveID] = useState("01");
  const [updates, setUpdates] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logRef = useRef(null);

  // 1. EFEKT: UX Fix - Zatváranie menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logRef.current && !logRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. EFEKT: Data Engine (GitHub + 17k Codex Loader)
  useEffect(() => {
    // A. GitHub Sync
    fetch(
      "https://api.github.com/repos/dusanfajnorbusiness-ui/NEXUS-CORE_IDENTITY/commits?per_page=100",
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUpdates(
            data.map((c) => {
              const d = new Date(c.commit.author.date);
              return {
                id: c.sha.substring(0, 7),
                date: d.toLocaleDateString("sk-SK"),
                time: d.toLocaleTimeString("sk-SK"),
                title: c.commit.message.split("\n")[0],
                desc: c.commit.message.split("\n").slice(1).join(" ").trim(),
              };
            }),
          );
        }
      })
      .catch((err) => console.error("Sync_Error", err));

    // B. Codex Loader (ID_08) - Optimized for 17,102 lines
    if (activeID === "08") {
      setTimeout(() => {
        const terminal = document.getElementById("codex-terminal");
        if (terminal) {
          terminal.innerHTML = `<div class="animate-pulse opacity-50 text-[10px] p-4 text-center tracking-[0.2em]">ACCESSING_ONE_NOTE_DUMP_STREAM...</div>`;

          fetch("./js/data/codex/fragment_1.json")
            .then((res) => res.json())
            .then((fragment) => {
              const now = new Date();
              terminal.innerHTML = fragment.data
                .map((line, idx) => {
                  const ts = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${idx % 999}`;
                  const isHeading = line.trim().startsWith("#");

                  if (isHeading) {
                    return `
                    <div class="mt-6 mb-2 border-b border-[#00FFFF]/20 pb-1">
                      <div class="text-[6px] opacity-30 font-mono italic">Entry_Point // LINE_${idx + 1}</div>
                      <div class="text-xs font-black text-[#00FFFF] uppercase">${line.replace(/#/g, "")}</div>
                    </div>`;
                  }

                  return `
                  <div class="py-1 border-b border-white/5 hover:bg-white/5 group transition-colors">
                    <div class="flex justify-between items-end opacity-20 group-hover:opacity-100 transition-opacity">
                      <span class="text-[6px] font-mono">LINE_${idx + 1}</span>
                      <span class="text-[6px] font-mono">TIMESTAMP: ${ts}</span>
                    </div>
                    <div class="text-[10px] text-white/90 leading-tight tracking-tighter">${line}</div>
                  </div>`;
                })
                .join("");
            })
            .catch(() => {
              terminal.innerHTML = `<div class="p-10 text-center text-red-500 text-[10px]">[ ERROR: DATA_STREAM_INTERRUPTED ]</div>`;
            });
        }
      }, 300);
    }
  }, [activeID]);

  if (!window.nexusData)
    return (
      <div className="p-20 text-center text-white">
        Critical_Error: Data_Not_Found
      </div>
    );
  const current =
    window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#050505] font-mono text-white transition-all duration-700"
      style={{ borderLeft: `6px solid ${current.color}` }}
    >
      {/* HEADER HUD */}
      <div className="fixed top-0 left-0 w-full p-4 md:p-6 flex flex-wrap justify-between items-center z-50 bg-black/80 backdrop-blur-md border-b border-white/5 min-h-[80px]">
        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 max-w-[65%] text-left">
          <div
            className="text-lg md:text-2xl font-black tracking-widest uppercase italic whitespace-nowrap"
            style={{ color: current.color }}
          >
            NEXUS CORE <span className="text-white">IDENTITY</span>
          </div>
          {current.tag && (
            <span
              className="text-[10px] opacity-50 font-mono lowercase tracking-tighter truncate max-w-[150px] md:max-w-none"
              style={{ color: current.color }}
            >
              {current.tag}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0">
          <OperatorMonitor color={current.color} />
          <div className="relative h-[32px]" ref={logRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hud-btn border-medium rounded-full text-[10px] md:text-[12px] px-4 h-full flex items-center"
              style={{ color: current.color, borderColor: current.color }}
            >
              LOG_{updates[0]?.date || "SYNC"}
            </button>
            {isMenuOpen && (
              <div className="absolute top-14 right-0 w-80 bg-black/95 border border-white/20 p-5 rounded-xl z-[100] shadow-2xl backdrop-blur-xl">
                <h4 className="text-[#39FF14] text-[12px] font-black border-b border-white/10 pb-2 mb-4 uppercase text-center">
                  Update_Log
                </h4>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar text-left">
                  {updates.map((upd) => (
                    <div key={upd.id} className="border-b border-white/5 pb-3">
                      <div className="flex justify-between text-[9px] opacity-40 mb-1 font-mono">
                        <span>#ID_{upd.id}</span>
                        <span>
                          {upd.date} | {upd.time}
                        </span>
                      </div>
                      <div className="text-[12px] font-bold uppercase mb-1">
                        {upd.title}
                      </div>
                      {upd.desc && (
                        <div className="text-[10px] text-white/50 italic leading-relaxed">
                          {upd.desc}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <AccountPanel color={current.color} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-6 pt-32 pb-32 max-w-6xl flex-grow text-left">
        <header className="mb-16">
          {/* Tento DIV je kotva - zabezpečí, že výška bude vždy rovnaká */}
          <div className="min-h-[160px] md:min-h-[280px] flex items-end pb-4">
            <h1
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]"
              style={{ color: current.color }}
            >
              {current.name}
            </h1>
          </div>

          {/* Tag a Quote nasledujú pod ním, už sa nebudú hýbať */}
          <div
            className="text-[10px] md:text-[12px] font-mono opacity-50 lowercase tracking-widest pl-2 mb-8"
            style={{ color: current.color }}
          >
            {current.tag}
          </div>

          <p className="text-2xl md:text-4xl italic opacity-60 leading-relaxed font-serif max-w-4xl">
            "{current.quote}"
          </p>
        </header>

        <nav className="grid grid-cols-4 md:grid-cols-11 gap-3 mb-20">
          {Object.keys(window.nexusData.dimensions)
            .sort((a, b) => Number(a) - Number(b))
            .map((id) => (
              <button
                key={id}
                onClick={() => {
                  setActiveID(id);
                  setIsMenuOpen(false);
                }}
                className={`p-4 text-[12px] font-black border transition-all duration-300 ${activeID === id ? "" : "opacity-40 hover:opacity-100"}`}
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

        <div className="relative p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-xl shadow-2xl min-h-[300px]">
          <div
            className="absolute top-0 left-0 w-2 h-full"
            style={{ backgroundColor: current.color }}
          />

          {/* TIER GUARD INTEGRATION */}
          <DimensionWrapper
            id={activeID}
            color={current.color}
            proContent={current.proContent}
            premiumContent={current.premiumContent}
            isUnlocked={activeID === "08" ? true : false} // Automatické odomknutie pre test
            setIsUnlocked={() => {}}
          >
            <div className="text-xl md:text-4xl font-light uppercase leading-snug italic opacity-90">
              {current.content}
            </div>
          </DimensionWrapper>
        </div>
      </main>

      <footer className="w-full py-6 border-t border-white/5 bg-black/60 px-6 font-mono text-[10px] md:text-[14px] uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[#39FF14]">
          <div>HW: Uzol_2Mb // Trnava_Station // AI: Gemini_Link</div>
          <div className="font-black">D. FAJNOR // ARCHITECT © 2026</div>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
