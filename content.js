// YouTube Ad Blocker - Grid-Aware Version

function removeAds() {
    let removedCount = 0;

    // Primary: Remove ytd-ad-slot-renderer and its parent container
    document.querySelectorAll('ytd-ad-slot-renderer').forEach(ad => {
        let container = ad.closest('ytd-rich-item-renderer');
        if (container) {
            container.remove();
            removedCount++;
        }
    });

    // Secondary: Look for "Sponsored" badge and remove parent
    document.querySelectorAll('[class*="Badge"]').forEach(badge => {
        const text = badge.textContent.trim();
        if (text === 'Sponsored' || text === 'Ad') {
            let container = badge.closest('ytd-rich-item-renderer');
            if (container) {
                container.remove();
                removedCount++;
            }
        }
    });

    // Tertiary: Remove by ad metadata classes
    document.querySelectorAll('[class*="FeedAdMetadata"], [class*="ytAdDetails"]').forEach(ad => {
        let container = ad.closest('ytd-rich-item-renderer');
        if (container) {
            container.remove();
            removedCount++;
        }
    });

    // Force grid reflow to collapse gaps
    const grid = document.querySelector('ytd-rich-grid-renderer');
    if (grid && removedCount > 0) {
        // Trigger reflow
        grid.style.display = 'none';
        setTimeout(() => {
            grid.style.display = 'grid';
        }, 10);
    }

    if (removedCount > 0) {
        console.log(`Removed ${removedCount} ad(s)`);
    }
}

// Run on initial load
removeAds();

// Use MutationObserver to catch new ads
const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;

    for (let mutation of mutations) {
        // Only check if new nodes were added
        if (mutation.addedNodes.length > 0) {
            shouldCheck = true;
            break;
        }
    }

    if (shouldCheck) {
        removeAds();
    }
});

// Start observing
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});

console.log('YouTube Adblocker active - removing ads and collapsing grid');