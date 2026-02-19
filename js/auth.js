/* --- NEXUS AUTH SYSTEM v5.1 (Key Registry) --- */

// 1. Zoznam kľúčov (bezpečne uložený)
const ACCESS_KEYS = {
    PRO: ['NEXUS-150-PRO', '111', 'START', 'NEXUS-PRO'],
    PREMIUM: ['NEXUS-999-PREMIUM', '999', 'OMEGA', 'MASTER-KEY']
};

// 2. Overovacia funkcia
window.verifyAccessCode = function(input) {
    const code = input.trim().toUpperCase();
    
    if (ACCESS_KEYS.PREMIUM.includes(code)) {
        return 'PREMIUM';
    }
    if (ACCESS_KEYS.PRO.includes(code)) {
        return 'PRO';
    }
    
    return false; // Ak sa kód nenašiel
};

// 3. Získanie aktuálneho stavu
window.getCurrentTier = function() {
    return localStorage.getItem('nexus_tier') || 'free';
};