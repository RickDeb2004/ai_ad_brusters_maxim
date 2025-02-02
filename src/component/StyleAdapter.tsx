import React from 'react';
import { adaptElementStyle } from '../utils/styleUtils';

interface StyleAdapterProps {
  originalElement: HTMLElement;
  replacementElement: HTMLElement;
}

export const StyleAdapter: React.FC<StyleAdapterProps> = ({ 
  originalElement, 
  replacementElement 
}) => {
  React.useEffect(() => {
    adaptElementStyle(originalElement, replacementElement);
  }, [originalElement, replacementElement]);

  return null; // This is a utility component that doesn't render anything
};