/* eslint-disable @typescript-eslint/no-unused-vars */
// Content script
let isEnabled = false;
let API_KEY = '';

// Initialize with stored settings
chrome.storage.sync.get(['enabled', 'hf_api_key'], function(result) {
    API_KEY = result.hf_api_key;
    isEnabled = result.enabled || false;
    if (isEnabled && API_KEY) {
        console.log('Extension initialized with API key');
        init(API_KEY);
        // Set up mutation observer after initial load
        observePageChanges();
    }
});

function detectAdElements() {
    const selectors = [
        // Google Ads specific selectors
        'ins.adsbygoogle',
        'div[id^="google_ads_iframe"]',
        'iframe[id^="google_ads_iframe"]',
        // General ad selectors
        '[class*="ad-"]:not([class*="header"]):not([class*="logo"]):not([class*="navigation"])',
        '[class*="ad_"]:not([class*="header"]):not([class*="logo"]):not([class*="navigation"])',
        '[id*="ad-"]:not([id*="header"]):not([id*="logo"]):not([id*="navigation"])',
        '[id*="ad_"]:not([id*="header"]):not([id*="logo"]):not([id*="navigation"])',
        // Common ad containers
        'div[data-ad]',
        'div[data-ad-unit]',
        'div[data-adunit]',
        'div[data-advertising]'
    ];

    const elements = Array.from(document.querySelectorAll(selectors.join(',')))
        .filter(el => {
            // More precise filtering
            const rect = el.getBoundingClientRect();
            const hasSize = rect.width > 50 && rect.height > 50;
            const isVisible = rect.top >= 0 && rect.left >= 0;
            const isNotHidden = window.getComputedStyle(el).display !== 'none';
            return hasSize && isVisible && isNotHidden;
        });

    console.log(`Found ${elements.length} ad elements`);
    return elements;
}

async function transformAdContent(adElement, API_KEY) {
    try {
        // Handle iframes differently
        const isIframe = adElement.tagName.toLowerCase() === 'iframe';
        let originalContent = '';

        if (isIframe) {
            originalContent = 'Advertisement iframe content';
        } else {
            originalContent = adElement.textContent || adElement.getAttribute('alt') || 'Advertisement';
        }

        // Create a wrapper if needed
        let wrapper = adElement;
        if (isIframe) {
            wrapper = document.createElement('div');
            wrapper.style.width = adElement.width + 'px';
            wrapper.style.height = adElement.height + 'px';
            adElement.parentNode.insertBefore(wrapper, adElement);
            adElement.style.display = 'none';
        }

        wrapper.innerHTML = 'Transforming advertisement...';

        // Validate API key
        if (!API_KEY) {
            throw new Error('API key is missing');
        }

        console.log('Calling Hugging Face API with content:', originalContent);
        
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: `Transform this advertisement into a spooky, witty description: ${originalContent}`
            })
        });

        const responseText = await response.text();
        console.log('Raw API Response:', responseText);

        if (!response.ok) {
            throw new Error(`API error: ${response.status} - ${responseText}`);
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error(`Failed to parse API response: ${responseText}`);
        }

        if (!Array.isArray(data) || !data[0]?.generated_text) {
            throw new Error(`Unexpected API response format: ${JSON.stringify(data)}`);
        }

        const transformedText = data[0].generated_text;
        console.log('Transformed text:', transformedText);

        wrapper.innerHTML = transformedText;
        wrapper.style.fontStyle = 'italic';
        wrapper.style.color = '#666';
        wrapper.style.padding = '10px';
        wrapper.style.backgroundColor = 'rgba(0,0,0,0.05)';
        wrapper.style.border = '1px solid #ccc';
        wrapper.style.borderRadius = '4px';
        wrapper.style.margin = '10px 0';

    } catch (error) {
        console.error('Ad transformation failed:', error);
        wrapper.innerHTML = `Debug info: ${error.message}`;
        wrapper.style.color = 'red';
    }
}

function observePageChanges() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                // Wait a brief moment for dynamic content to settle
                setTimeout(() => {
                    const ads = detectAdElements();
                    ads.forEach(ad => transformAdContent(ad, API_KEY));
                }, 500);
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function init(API_KEY) {
    const ads = detectAdElements();
    ads.forEach(ad => transformAdContent(ad, API_KEY));
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Received message:', request);
    if (request.action === 'detectAds') {
        init(API_KEY);
        sendResponse({success: true});
    }
});