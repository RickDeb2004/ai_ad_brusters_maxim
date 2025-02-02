// popup.js
document.addEventListener('DOMContentLoaded', function() {
    const enableCheckbox = document.getElementById('enableExtension');
    const vampireButton = document.getElementById('vampireMode');
    const exorcismButton = document.getElementById('exorcismMode');
    const statusDiv = document.getElementById('status');

    // Load saved settings
    chrome.storage.sync.get(['enabled', 'mode'], function(result) {
        enableCheckbox.checked = result.enabled || false;
        updateStatus(result.enabled ? 'Extension is active' : 'Extension is disabled');
    });

    // Handle enable/disable toggle
    enableCheckbox.addEventListener('change', function() {
        const isEnabled = this.checked;
        chrome.storage.sync.set({ 'enabled': isEnabled }, function() {
            updateStatus(isEnabled ? 'Extension activated!' : 'Extension disabled');
            
            // Notify content script
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'toggleExtension',
                        enabled: isEnabled
                    });
                }
            });
        });
    });

    // Handle vampire mode
    vampireButton.addEventListener('click', function() {
        chrome.storage.sync.set({ 'mode': 'vampire' }, function() {
            updateStatus('Vampire mode activated! 🧛');
            notifyContentScript('vampire');
        });
    });

    // Handle exorcism mode
    exorcismButton.addEventListener('click', function() {
        chrome.storage.sync.set({ 'mode': 'exorcism' }, function() {
            updateStatus('Exorcism mode activated! 🔯');
            notifyContentScript('exorcism');
        });
    });

    function updateStatus(message) {
        statusDiv.textContent = message;
        // Clear status after 2 seconds
        setTimeout(() => {
            statusDiv.textContent = '';
        }, 2000);
    }

    function notifyContentScript(mode) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'changeMode',
                    mode: mode
                });
            }
        });
    }
});