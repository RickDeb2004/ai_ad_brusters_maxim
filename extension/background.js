/* eslint-disable @typescript-eslint/no-unused-vars */
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
        enabled: false,
        adBusterMode: 'default',
        vampireModeActive: false,
        exorcismModeActive: false,
        hf_api_key: ""
    }, () => {
        console.log('Extension installed and initialized');
    });
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        chrome.storage.sync.get(['enabled', 'hf_api_key'], function(result) {
            if (result.enabled) {
                chrome.tabs.sendMessage(tabId, { 
                    action: 'detectAds',
                    apiKey: result.hf_api_key
                });
            }
        });
    }
});

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggle') {
        chrome.storage.sync.set({ enabled: request.enabled }, () => {
            // If enabling, trigger ad detection immediately
            if (request.enabled) {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    if (tabs[0]) {
                        chrome.tabs.sendMessage(tabs[0].id, { 
                            action: 'detectAds',
                            apiKey: request.hf_api_key 
                        });
                    }
                });
            }
        });
    } 
    // Handle vampire and exorcism modes
    else if (request.action === 'vampireMode' || request.action === 'exorcismMode') {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, request);
            }
        });
    }
    // Handle API key verification
    else if (request.action === 'verifyApiKey') {
        chrome.storage.sync.get('hf_api_key', (result) => {
            sendResponse({ apiKey: result.hf_api_key });
        });
        return true; // Will respond asynchronously
    }
});