// YouTube Ad Blocker Content Script

// Selectors for different types of YouTube ads
const adSelectors = [
    // Video ads (pre-roll, mid-roll)
    'ytd-ad-slot-renderer',
    'yt-formatted-string.yt-core-attributed-string[role="doc-subtitle"]',

    // Sidebar ads
    'ytd-rich-item-renderer [aria-label*="Promoted"]',
    'ytd-promoted-sparkles-web-renderer',

    // Banner ads
    '.ytd-banner-promo-renderer',
    '[data-ad-promo-id]',

    // General ad containers
    '.yt-simple-endpoint[href*="ads"]',
    '[role="complementary"] [aria-label*="Ad"]'
];

// Function to remove ads
function removeAds() {
    adSelectors.forEach(selector => {
        try {
            document.querySelectorAll(selector).forEach(ad => {
                if (ad && ad.parentNode) {
                    ad.remove();
                }
            });
        } catch (e) {
            console.error(`Error removing ads with selector ${selector}:`, e);
        }
    });
}

// Run on page load
removeAds();

// Watch for dynamically loaded content
const observer = new MutationObserver(() => {
    removeAds();
});

// Start observing the document for changes
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true
});

// Also run periodically as backup
setInterval(removeAds, 2000);

console.log('YouTube Adblocker is active');