import React, { useState, useEffect } from 'react';

export default function OptionsPage() {
  const [mode, setMode] = useState('default');
  const [vampireMode, setVampireMode] = useState(false);
  const [exorcismMode, setExorcismMode] = useState(false);

  useEffect(() => {
    // Load existing settings from storage
    chrome.storage.sync.get([
      'adBusterMode', 
      'vampireModeActive', 
      'exorcismModeActive'
    ], (result) => {
      setMode(result.adBusterMode || 'default');
      setVampireMode(result.vampireModeActive || false);
      setExorcismMode(result.exorcismModeActive || false);
    });
  }, []);

  const saveSettings = () => {
    chrome.storage.sync.set({
      adBusterMode: mode,
      vampireModeActive: vampireMode,
      exorcismModeActive: exorcismMode
    });
  };

  return (
    <div>
      <h1>AI AdBuster Settings</h1>
      <select 
        value={mode} 
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="default">Default Mode</option>
        <option value="vampire">Vampire Mode</option>
        <option value="exorcism">Exorcism Mode</option>
      </select>
      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
}