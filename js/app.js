// ==========================================
// 0.1 FIREBASE & INIT (v6.2 - Identity Restored)
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

// --- KĽÚČOVÁ ZMENA: NAJPRV REACT FUNKCIE ---
const { useState, useEffect, useMemo, useRef } = React;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Odstránil som samostatnú definíciu userTier odtiaľto,
// pretože musí byť VNÚTRI komponentu App, aby fungovala.

// ==========================================
// 1. MODUL: OperatorMonitor
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
// 2. MODUL: AccountPanel (UI First Protocol)
// ==========================================
const AccountPanel = ({ color }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [inputKey, setInputKey] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        console.log("✅ GOOGLE AUTH SUCCESS:", firebaseUser.displayName);

        // 1. OKAMŽITÉ ZOBRAZENIE AVATARA (Nečakáme na databázu!)
        let initialTier = (
          localStorage.getItem("nexus_tier") || "FREE"
        ).toUpperCase();

        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName?.toUpperCase() || "OPERATOR",
          avatar: firebaseUser.photoURL,
          tier: initialTier,
        });
        setIsLogged(true);

        // 2. TICHÁ SYNCHRONIZÁCIA S DATABÁZOU NA POZADÍ
        try {
          const userRef = db.collection("operators").doc(firebaseUser.uid);
          const doc = await userRef.get();

          let dbTier = doc.exists
            ? (doc.data().tier || "FREE").toUpperCase()
            : "FREE";
          const weights = { FREE: 0, PRO: 1, PREMIUM: 2, ARCHITECT: 3 };
          let finalTier = dbTier;

          if (weights[initialTier] > weights[dbTier]) {
            finalTier = initialTier;
          } else if (weights[dbTier] > weights[initialTier]) {
            finalTier = dbTier;
          }

          const nexusData = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName?.toUpperCase() || "OPERATOR",
            avatar: firebaseUser.photoURL,
            lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
            tier: finalTier,
          };

          await userRef.set(nexusData, { merge: true });

          // 3. Aktualizácia stavu po pripojení k DB
          setUser(nexusData);
          localStorage.setItem("nexus_tier", finalTier.toLowerCase());
          console.log("✅ SYNC SUCCESS: Data uložené do DB.");
        } catch (error) {
          console.warn(
            "⚠️ FIRESTORE PENDING/ERROR. Bežíme v offline režime.",
            error,
          );
        }
      } else {
        setIsLogged(false);
        setUser(null);
        localStorage.setItem("nexus_tier", "free");
      }
    });
    return () => unsubscribe();
  }, []);

  // Prihlásenie cez POPUP (Oveľa spoľahlivejšie pre lokálny vývoj)
  const handleLogin = () => {
    auth.signInWithPopup(googleProvider).catch((error) => {
      console.error("❌ CHYBA PRIHLÁSENIA:", error);
      alert("Prihlásenie zrušené alebo zlyhalo.");
    });
  };

  const handleLogout = () => {
    if (window.confirm("Odhlásiť sa a resetovať na FREE?")) {
      auth.signOut().then(() => {
        localStorage.setItem("nexus_tier", "free");
        window.location.reload();
      });
    }
  };

  // --- GLOBÁLNE PREPOJENIE PRE ID08 ---
  useEffect(() => {
    window.isUserLoggedIn = isLogged;
    window.triggerLogin = handleLogin;

    // Vo vnútri AccountPanel useEffect:
    window.upgradeUserTier = async (newTier) => {
      if (user && user.uid) {
        const tierUpper = newTier.toUpperCase();
        try {
          await db
            .collection("operators")
            .doc(user.uid)
            .update({ tier: tierUpper });
        } catch (e) {
          console.warn("DB mešká...");
        }

        // NAJPRV SYNC
        if (typeof window.syncTierWithUI === "function") {
          window.syncTierWithUI(tierUpper);
        }

        // POTOM ALERT
        alert(`✅ SYSTEM_SYNC: Protokol ${tierUpper} aktivovaný!`);
      }
    };
  }, [isLogged, user]);

  const handleHeaderKeySubmit = () => {
    if (window.verifyAccessCode) {
      const result = window.verifyAccessCode(inputKey);
      if (result) {
        window.upgradeUserTier(result);
      } else {
        alert("⛔ ACCESS DENIED: Neplatný kód.");
        setInputKey("");
      }
    }
  };

  return (
    <div className="flex items-center h-[32px] gap-2">
      {!isLogged ? (
        <button
          onClick={handleLogin}
          className="hud-btn border-thick text-[10px] md:text-[12px] px-4 h-full animate-pulse hover:bg-white hover:text-black transition-all"
          style={{ color, borderColor: color }}
        >
          INIT_SESSION
        </button>
      ) : (
        <div className="flex items-center gap-3">
          {user?.tier === "FREE" && (
            <div className="flex h-full border border-white/20 rounded-full overflow-hidden bg-black/60">
              <input
                type="text"
                placeholder="KEY"
                className="bg-transparent text-[8px] px-2 w-16 outline-none text-white font-mono uppercase"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleHeaderKeySubmit()}
              />
              <button
                onClick={handleHeaderKeySubmit}
                className="bg-white/10 px-2 text-[8px] hover:bg-white/20 transition-all border-l border-white/20"
                style={{ color }}
              >
                SYNC
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 border border-white/10 p-1 pr-1 rounded-full bg-black/40 h-[32px]">
            <img
              src={user?.avatar || "https://via.placeholder.com/150"}
              className="w-6 h-6 rounded-full border border-white/20"
              alt="avatar"
            />
            <div className="flex flex-col leading-none text-left mr-2">
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

            <button
              onClick={handleLogout}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white transition-all text-[10px] border border-red-500/30"
              title="LOGOUT"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. MODUL: DimensionWrapper (Tier Guard)
// ==========================================
const DimensionWrapper = ({ activeDimension, userTier, color }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // POISTKA: Ak activeDimension nie je definovaná, alebo kontajner neexistuje, preruš operáciu
    if (
      activeDimension === undefined ||
      activeDimension === null ||
      !containerRef.current
    )
      return;

    try {
      // Vyčistíme kontajner pre Vanilla JS moduly
      containerRef.current.innerHTML = "";

      // Bezpečný prevod na ID (napr. 8 -> "08")
      const dimId = String(activeDimension).padStart(2, "0");
      const moduleName = `ID${dimId}`;

      // Kontrola, či je modul načítaný v okne (window.ID08 atď.)
      if (
        window[moduleName] &&
        typeof window[moduleName].render === "function"
      ) {
        // KĽÚČOVÁ ZMENA: Posielame userTier do modulu!
        window[moduleName].render(containerRef.current, userTier);
        console.log(
          `📡 Neural Link: ${moduleName} rendered with Tier: ${userTier}`,
        );
      } else {
        console.warn(`⚠️ Module ${moduleName} not ready.`);
        containerRef.current.innerHTML = `
          <div class="flex items-center justify-center h-64 text-white/20 uppercase italic tracking-[0.3em] animate-pulse text-xs">
            Establishing Neural Link to ${moduleName}...
          </div>`;
      }
    } catch (err) {
      console.error("❌ Critical Render Error:", err);
    }
  }, [activeDimension, userTier]);

  // Pomocná konštanta, aby sme vedeli, či sme v dešifrovacom centre
  const isAuthCenter =
    String(activeDimension) === "8" || String(activeDimension) === "08";

  return (
    <div className="relative w-full h-full overflow-y-auto custom-scrollbar flex flex-col">
      {/* Vanilla JS Content Area */}
      <div ref={containerRef} className="flex-grow"></div>

      {/* 🛡️ GLOBÁLNY UPGRADE SYSTÉM - Skryje sa v ID08, aby nezavadzal terminálu */}
      {!isAuthCenter && (
        <div className="max-w-4xl mx-auto w-full p-10 space-y-6 pb-20">
          {/* PRO CARD */}
          {userTier === "FREE" && (
            <div className="group relative border border-green-500/30 bg-black/80 p-1 transition-all hover:border-green-500">
              <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
              <div className="relative border border-green-500/20 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <h4 className="text-green-500 font-black text-sm uppercase tracking-[0.2em]">
                      Level PRO Restricted
                    </h4>
                  </div>
                  <p className="text-white/60 text-[10px] font-mono lowercase">
                    Odomkni pokročilé taktické dáta a bio-metriky.
                  </p>
                </div>
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("changeDimension", { detail: "08" }),
                    )
                  }
                  className="bg-green-500/10 border border-green-500 text-green-500 px-6 py-2 text-[10px] font-black uppercase hover:bg-green-500 hover:text-black transition-all duration-300"
                >
                  Authorize [111]
                </button>
              </div>
            </div>
          )}

          {/* PREMIUM CARD */}
          {userTier !== "PREMIUM" && (
            <div className="group relative border border-yellow-500/30 bg-black/80 p-1 transition-all hover:border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
              <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors"></div>
              <div className="relative border border-yellow-500/20 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_10px_#EAB308]"></span>
                    <h4 className="text-yellow-500 font-black text-sm uppercase tracking-[0.2em]">
                      Level PREMIUM (Omega)
                    </h4>
                  </div>
                  <p className="text-white/60 text-[10px] font-mono lowercase">
                    Úplná systémová previerka a prístup k riadiacim protokolom.
                  </p>
                </div>
                <button
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("changeDimension", { detail: "08" }),
                    )
                  }
                  className="bg-yellow-500/10 border border-yellow-500 text-yellow-500 px-6 py-2 text-[10px] font-black uppercase hover:bg-yellow-500 hover:text-black transition-all duration-300"
                >
                  Authorize [999]
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. MAIN APP ENGINE (FIXED HOOK ORDER)
// ==========================================
const App = () => {
  // SEM VLOŽÍME USER TIER
  const [userTier, setUserTier] = useState(
    localStorage.getItem("nexus_tier") || "FREE",
  );

  // Vnútri App komponentu v useEffect:
  useEffect(() => {
    window.syncTierWithUI = (newTier) => {
      const tierUpper = newTier.toUpperCase();
      console.log(`📡 BROADCAST: Syncing UI to Tier ${tierUpper}`);

      // 1. Update React stavu (schová karty)
      setUserTier(tierUpper);

      // 2. Update fyzickej pamäte (pre window.getCurrentTier)
      localStorage.setItem("nexus_tier", tierUpper.toLowerCase());

      // 3. Vynútený re-render aktuálnej dimenzie
      const dimId = String(activeID).padStart(2, "0");
      const moduleName = `ID${dimId}`;
      const mountPoint =
        document.getElementById("id08-mount-point") || containerRef.current;

      if (
        window[moduleName] &&
        typeof window[moduleName].render === "function"
      ) {
        window[moduleName].render(mountPoint, tierUpper);
      }
    };
  }, [activeID]); // Pridaj activeID do závislostí

  // --- 1. DEFINÍCIE HOOKOV ---
  const [activeID, setActiveID] = useState(
    localStorage.getItem("nexus_last_id") || "01",
  );

  const [updates, setUpdates] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logRef = useRef(null);

  // --- 2. EFEKTY ---

  // Efekt: GitHub Sync
  useEffect(() => {
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
      .catch((err) => console.warn("GitHub Sync: Offline"));
  }, []);

  // EFEKT: Ukladanie pozície (Keď prepneš ID, uloží sa)
  useEffect(() => {
    localStorage.setItem("nexus_last_id", activeID);
  }, [activeID]);

  // Efekt: Redirect Login Check
  useEffect(() => {
    auth.getRedirectResult().catch((e) => console.error(e));
  }, []);

  // Efekt: ID08 BRIDGE (Spustenie externého modulu)
  useEffect(() => {
    if (activeID === "08") {
      console.log("🚀 Switching to ID08...");
      setTimeout(() => {
        const mountPoint = document.getElementById("id08-mount-point");
        if (
          mountPoint &&
          window.ID08 &&
          typeof window.ID08.render === "function"
        ) {
          console.log("✅ Mounting ID08 Module");
          window.ID08.render(mountPoint);
        } else {
          console.warn("⚠️ Waiting for ID08 module...");
        }
      }, 100);
    }
  }, [activeID]);

  useEffect(() => {
    const checkTier = () => {
      const currentTier = localStorage.getItem("nexus_tier") || "FREE";
      setUserTier(currentTier.toUpperCase());
    };
    window.addEventListener("storage", checkTier); // Sleduje zmeny z iných tabov
    const interval = setInterval(checkTier, 1000); // Poistka pre lokálne zmeny
    return () => {
      window.removeEventListener("storage", checkTier);
      clearInterval(interval);
    };
  }, []);

  // --- 3. PODMIENKY RENDERU (AŽ TERAZ!) ---
  if (!window.nexusData) {
    return (
      <div className="p-20 text-center text-white">
        Critical_Error: Data_Not_Found
      </div>
    );
  }

  const current =
    window.nexusData.dimensions[activeID] || window.nexusData.dimensions["01"];

  // --- 4. RENDER UI ---
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
          <div className="min-h-[180px] md:min-h-[320px] flex items-end pb-4 overflow-hidden border-b border-white/5">
            <h1
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8]"
              style={{ color: current.color }}
            >
              {current.name}
            </h1>
          </div>
          <div
            className="text-[10px] md:text-[12px] font-mono opacity-50 lowercase tracking-widest pl-2 mt-4"
            style={{ color: current.color }}
          >
            | {current.tag}
          </div>
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

          <DimensionWrapper
            activeDimension={activeID}
            userTier={userTier}
            color={current.color}
          />
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
