import React, { useState } from 'react';
import { AdTransformer } from '../component/AdTransformer';

export default function Home() {
  const [adContent, setAdContent] = useState('');

  return (
    <div>
      <h1>AI AdBuster</h1>
      <input 
        type="text" 
        placeholder="Enter ad content"
        value={adContent}
        onChange={(e) => setAdContent(e.target.value)}
      />
      <AdTransformer originalContent={adContent} />
    </div>
  );
}