import React, { useState } from 'react';
import { transformAdContent } from '../services/aiService';

interface AdTransformerProps {
  originalContent: string;
}

export const AdTransformer: React.FC<AdTransformerProps> = ({ originalContent }) => {
  const [transformedAd, setTransformedAd] = useState<string>('');

  const handleTransformation = async () => {
    try {
      const result = await transformAdContent(originalContent);
      setTransformedAd(result);
    } catch (error) {
      console.error('Ad transformation failed', error);
      setTransformedAd('A mysterious ad appeared...');
    }
  };

  return (
    <div>
      <button onClick={handleTransformation}>Transform Ad</button>
      {transformedAd && <p>{transformedAd}</p>}
    </div>
  );
};