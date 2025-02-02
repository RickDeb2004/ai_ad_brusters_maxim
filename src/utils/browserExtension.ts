/* eslint-disable @typescript-eslint/no-unused-vars */
export function initializeExtension() {
    chrome.runtime.onInstalled.addListener(() => {
      chrome.storage.sync.set({
        adBusterMode: 'default',
        vampireModeActive: false,
        exorcismModeActive: false
      });
    });
  
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, { action: 'detectAds' });
      }
    });
  }
  

  export function toggleAdBusterMode(mode: string) {
    chrome.storage.sync.set({ adBusterMode: mode });
  }