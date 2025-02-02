export function adaptElementStyle(
    originalElement: HTMLElement, 
    replacementElement: HTMLElement
  ) {
    // Copy computed styles
    const computedStyle = window.getComputedStyle(originalElement);
    
    // Apply key style properties
    replacementElement.style.width = computedStyle.width;
    replacementElement.style.height = computedStyle.height;
    replacementElement.style.fontFamily = computedStyle.fontFamily;
    replacementElement.style.fontSize = computedStyle.fontSize;
    replacementElement.style.color = '#666';
    replacementElement.style.fontStyle = 'italic';
    replacementElement.style.padding = '10px';
    replacementElement.style.backgroundColor = 'rgba(0,0,0,0.05)';
  }
  
  export function vampireMode(elements: Element[]) {
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.filter = 'grayscale(100%)';
        el.style.opacity = '0.7';
      }
    });
  }
  
  export function exorcismMode(elements: Element[]) {
    elements.forEach(el => el.remove());
  }