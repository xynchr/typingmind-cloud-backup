(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        [data-testid*="knowledge-base"],[data-testid*="teams-button"],[data-testid="workspace-teams-button"],[title="Knowledge Base"],[aria-label="Knowledge Base"],
        [title="Teams"],[title="TypingMind Teams"],[aria-label="Data Lost Warning"],[title="Data Lost Warning"] {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    function cleanUI() {
        const elements = document.querySelectorAll('span, p, div, button, a');
        elements.forEach(el => {
            if (el.closest('[data-testid="chat-message"]')) return;

            if (el.children.length === 0 || el.children.length === 1) {
                const text = el.textContent.trim();
                if (['Data Lost Warning', 'Login to sync your data across devices', 'TypingMind for Teams', 'Login to TypingMind Cloud'].includes(text)) {
                    el.style.display = 'none';
                    const wrapper = el.closest('button, a, div[role="button"], li');
                    if (wrapper) wrapper.style.display = 'none';
                    
                    const parentDiv = el.parentElement;
                    if (parentDiv && parentDiv.classList.toString().includes('bg-red')) {
                        parentDiv.style.display = 'none';
                    }
                }
            }
        });

        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            const redBadge = btn.querySelector('.bg-red-500, .bg-red-600, .text-red-500, .text-red-600');
            if (redBadge && (redBadge.classList.contains('absolute') || (redBadge.parentElement && redBadge.parentElement.classList.contains('absolute')))) {
                const absWrapper = redBadge.closest('.absolute');
                if (absWrapper) absWrapper.style.display = 'none';
                else redBadge.style.display = 'none';
            }
        });
    }

    const observer = new MutationObserver(() => cleanUI());
    cleanUI();
    observer.observe(document.body, { childList: true, subtree: true });
})();
