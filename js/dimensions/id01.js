const ID01 = {
  id: "01",
  name: "PERSONAL",
render: function(container, forcedTier) {
    // Ak React pošle forcedTier, použi ho. Ak nie, pozri do pamäte.
    const tier = (forcedTier || localStorage.getItem('nexus_tier') || 'free').toLowerCase();
    
    const idData = window.nexusData?.ID01 || {};
    const content = idData[tier] || idData['free'] || "Stream Offline";

    container.innerHTML = `
        <div class="p-8 fade-in-element">
            <h1 class="text-7xl font-black mb-10 italic border-l-8 border-white pl-6 uppercase">${this.name}</h1>
            <div class="dim-content">${content}</div>
        </div>
    `;
}
};
window.ID01 = ID01;