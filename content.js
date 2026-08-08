// Universal Ad Blocker - Works on any website

function removeAds() {
    let removedCount = 0;

    // YouTube-specific ads
    document.querySelectorAll('ytd-ad-slot-renderer, ytd-promoted-sparkles-web-renderer').forEach(ad => {
        let container = ad.closest('ytd-rich-item-renderer') || ad.parentElement;
        if (container) {
            container.remove();
            removedCount++;
        }
    });

    // Generic ad detection by common classes/ids
    const adSelectors = [
        '[class*="ad-container"]',
        '[class*="advertisement"]',
        '[class*="ad-block"]',
        '[class*="promoted"]',
        '[class*="sponsor"]',
        '[id*="ad-"]',
        '[id*="advertisement"]',
        '[data-ad-slot]',
        '[data-ad-format]',
        'ins.adsbygoogle',
        '[class*="doubleclick"]'
    ];

    adSelectors.forEach(selector => {
        try {
            document.querySelectorAll(selector).forEach(ad => {
                if (ad && ad.offsetParent !== null) { // Check if visible
                    ad.remove();
                    removedCount++;
                }
            });
        } catch (e) {
            // Invalid selector, skip
        }
    });

    // Generic text-based detection
    document.querySelectorAll('[class*="Badge"], [class*="Label"]').forEach(element => {
        const text = element.textContent.trim().toLowerCase();
        if (text.includes('sponsored') || text.includes('promoted') || text === 'ad') {
            let container = element.closest('[role="listitem"], article, .card, [class*="item"]') || element.parentElement;
            if (container && container !== document.body) {
                container.remove();
                removedCount++;
            }
        }
    });

    if (removedCount > 0) {
        console.log(`[Universal Adblocker] Removed ${removedCount} ad(s)`);
    }
}

// Run on initial load
removeAds();

// Watch for dynamically loaded ads
const observer = new MutationObserver(() => {
    removeAds();
});

observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

console.log('[Universal Adblocker] Active on:', window.location.hostname);