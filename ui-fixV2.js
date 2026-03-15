(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Hide specific intrusive buttons by ID/TestID */
        [data-testid="new-chat-button"],
        [aria-label="New Chat"],
        [aria-label="List more"],
        [title="New Chat"],
        
        /* Sidebar/Header specific clutter */
        [title="Login to TypingMind Cloud"],
        [title="TypingMind for Teams"],
        
        /* Nagging Banners */
        .bg-red-500.text-white, 
        .bg-red-600,
        
        /* The annoying little red warning badge on profile */
        .absolute.top-0.right-0.bg-red-500,
        
        /* Footer */
        footer {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    function cleanUI() {
        // Nuke specific text elements that aren't part of core UI functionality
        const elements = document.querySelectorAll('button, div, span, a');
        elements.forEach(el => {
            // Safety: Never hide anything that is a core navigation tab (Agents, Prompts, etc.)
            if (el.closest('.sidebar') && (el.textContent.includes('Agents') || el.textContent.includes('Prompts') || el.textContent.includes('Settings'))) return;
            
            const text = el.textContent.trim();
            if (['Data Lost Warning', 'Login to sync your data across devices', 'Login to TypingMind Cloud', 'TypingMind for Teams'].includes(text)) {
                el.style.display = 'none';
            }
        });
    }

    // Run periodically to catch dynamically loaded UI
    setInterval(cleanUI, 2000);
})();
