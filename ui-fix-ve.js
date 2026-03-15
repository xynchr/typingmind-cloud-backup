(function() {
    function cleanUI() {
        // 1. Target the bottom navigation bar specifically
        // We look for all button elements in the bottom nav bar
        const navButtons = document.querySelectorAll('div[class*="flex"] button, nav button, div[role="navigation"] button');
        
        navButtons.forEach(btn => {
            const text = btn.textContent.trim();
            // Nuke only the items you hate, leave everything else untouched
            if (text.includes('KB') || text.includes('Teams')) {
                btn.style.setProperty('display', 'none', 'important');
            }
        });

        // 2. The Red Triangle Badge on Avatar
        // We hunt for any SVG or div that is a "warning" icon inside the profile button
        const avatarButtons = document.querySelectorAll('button');
        avatarButtons.forEach(btn => {
            if (btn.querySelector('svg[fill*="red"], svg[class*="red"], .bg-red-500')) {
                const badge = btn.querySelector('.absolute');
                if (badge) badge.style.setProperty('display', 'none', 'important');
            }
        });
    }

    // Run every 1 second to combat dynamic re-rendering
    setInterval(cleanUI, 1000);
})();
