/* --- DIMENSION 08: AUTH-TERMINAL (FIXED) --- */
const ID08 = {
    id: "08",
    name: "DECRYPTOR",
    color: "#00FFFF",

    render: function(container, tier = "FREE") {
        console.log("📟 Terminal ID08: Rendering started...");
        
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center p-4 md:p-10 animate-in zoom-in duration-500 max-w-xl mx-auto">
                <div class="w-full bg-black/40 border border-[#00FFFF]/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(0,255,255,0.1)] backdrop-blur-xl">
                    <h2 class="text-[#00FFFF] font-black text-2xl mb-2 uppercase tracking-tighter italic text-center">Security_Terminal</h2>
                    <p class="text-[#00FFFF]/50 text-[10px] font-mono mb-8 uppercase tracking-widest text-center">Tier_Status: ${tier}</p>
                    
                    <div class="relative mb-8 group">
                        <input type="password" id="id08-code" placeholder="ENTER CODE" 
                            class="w-full bg-[#050505] border-b-2 border-[#00FFFF] text-[#00FFFF] px-4 py-4 text-center text-xl font-bold tracking-[0.4em] outline-none transition-all focus:border-white">
                        
                        <button id="id08-eye" class="absolute right-2 top-1/2 -translate-y-1/2 text-[#00FFFF] opacity-50 hover:opacity-100 p-2 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                    </div>

                    <button id="id08-submit" 
                        class="w-full bg-[#00FFFF]/10 border border-[#00FFFF] text-[#00FFFF] py-4 font-black uppercase tracking-[0.3em] hover:bg-[#00FFFF] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                        Verify_Identity
                    </button>

                    <div id="id08-msg" class="mt-6 text-center font-mono text-[10px] uppercase min-h-[15px]"></div>
                </div>
            </div>
        `;

        // --- INTERNÁ LOGIKA ---
        const input = container.querySelector("#id08-code");
        const btn = container.querySelector("#id08-submit");
        const eye = container.querySelector("#id08-eye");
        const msg = container.querySelector("#id08-msg");

        const handleVerify = () => {
            const val = input.value.trim();
            console.log("📟 Processing code...");

            if (val === "111") {
                if (window.upgradeUserTier) window.upgradeUserTier("PRO");
            } else if (val === "999") {
                if (window.upgradeUserTier) window.upgradeUserTier("PREMIUM");
            } else {
                msg.innerText = "❌ ACCESS_DENIED: Invalid_Key";
                msg.className = "mt-6 text-center font-mono text-[10px] uppercase text-red-500 animate-shake";
                input.value = "";
                setTimeout(() => { msg.innerText = ""; }, 3000);
            }
        };

        // EVENT: Kliknutie na tlačidlo
        btn.addEventListener("click", handleVerify);

        // EVENT: Stlačenie ENTER v inpute
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") handleVerify();
        });

        // EVENT: Očko (Toggle Visibility)
        eye.addEventListener("click", () => {
            const isPass = input.type === "password";
            input.type = isPass ? "text" : "password";
            eye.style.opacity = isPass ? "1" : "0.5";
        });
    }
};

window.ID08 = ID08;