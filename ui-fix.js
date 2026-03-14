(function() {
    function nukeUI() {
        // 1. Destroy the KB and Teams buttons by searching for their exact text
        const allElements = document.querySelectorAll('span, div, p');
        allElements.forEach(el => {
            // Safety: Never hide anything inside your actual chat window
            if (el.closest('[data-testid="chat-message"]')) return;

            const text = el.textContent.trim();
            // Look for the exact text on those buttons
            if (text === 'KB' || text === 'Teams' || text === 'Knowledge Base') {
                // Find the clickable button that wraps the text and destroy it
                const wrapper = el.closest('button, [role="button"], a, li');
                if (wrapper) wrapper.style.setProperty('display', 'none', 'important');
                el.style.setProperty('display', 'none', 'important');
            }
        });

        // 2. Destroy the tiny red warning triangle on the avatar
        // It's a red icon using "absolute" positioning to hover over your profile picture
        const allIcons = document.querySelectorAll('[class*="text-red"],[class*="bg-red"], [class*="fill-red"], svg');
        allIcons.forEach(el => {
            if (el.closest('[data-testid="chat-message"]')) return;
            
            const isAbsolute = window.getComputedStyle(el).position === 'absolute' || el.classList.contains('absolute');
            const isRed = el.classList.toString().includes('red') || el.innerHTML.includes('red') || window.getComputedStyle(el).color.includes('rgb(239'); // Tailwind red
            
            if (isAbsolute && isRed) {
                el.style.setProperty('display', 'none', 'important');
            }
            // Check its parent wrapper just in case
            if (el.parentElement) {
                const parentAbsolute = window.getComputedStyle(el.parentElement).position === 'absolute' || el.parentElement.classList.contains('absolute');
                if (parentAbsolute && isRed) {
                    el.parentElement.style.setProperty('display', 'none', 'important');
                }
            }
        });
    }

    // Run immediately, and run every time the app loads a new menu
    nukeUI();
    const observer = new MutationObserver(() => nukeUI());
    observer.observe(document.body, { childList: true, subtree: true });
})();
