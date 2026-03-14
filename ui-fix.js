(function() {
    // UPDATED: Added ":not([role='button'], [aria-haspopup='true'])" 
    // This ensures we don't accidentally hide the 3-dot menu triggers
    const style = document.createElement('style');
    style.innerHTML = `
        :is([data-testid*="knowledge-base"], [data-testid*="teams-button"], 
           [data-testid="workspace-teams-button"], [title="Knowledge Base"], 
           [aria-label="Knowledge Base"], [title="Teams"], [title="TypingMind Teams"], 
           [aria-label="Data Lost Warning"], [title="Data Lost Warning"]):not([role="button"]):not([aria-haspopup="true"]) {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    function cleanUI() {
        const allElements = document.querySelectorAll('span, div, p');
        allElements.forEach(el => {
            if (el.closest('[data-testid="chat-message"]')) return;

            // EXCLUSION: Do not touch anything that looks like a menu button
            if (el.closest('[role="button"]') || el.getAttribute('aria-haspopup') === 'true') return;

            const text = el.textContent.trim();
            if (['KB', 'Teams', 'Knowledge Base'].includes(text)) {
                const wrapper = el.closest('button, [role="button"], a, li');
                if (wrapper) wrapper.style.setProperty('display', 'none', 'important');
            }
        });

        // Keep the red triangle logic, but ensure we don't kill menu icons
        const allIcons = document.querySelectorAll('[class*="text-red"], [class*="bg-red"]');
        allIcons.forEach(el => {
            if (el.closest('[role="menu"]') || el.closest('[role="button"]')) return;
            const isAbsolute = window.getComputedStyle(el).position === 'absolute' || el.classList.contains('absolute');
            if (isAbsolute) {
                el.style.setProperty('display', 'none', 'important');
            }
        });
    }

    nukeUI();
    const observer = new MutationObserver(() => nukeUI());
    observer.observe(document.body, { childList: true, subtree: true });
})();
