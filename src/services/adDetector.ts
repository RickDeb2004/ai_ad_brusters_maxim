export function detectAdElements(): Element[] {
    const potentialAdSelectors = [
      '[class*="ad"]',
      '[class*="advertisement"]',
      '[id*="ad"]',
      '[id*="advertisement"]',
      'ins.adsbygoogle',
      'div[data-ad-unit]'
    ];
  
    const adElements: Element[] = [];
    
    potentialAdSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (
          element.clientWidth > 50 && 
          element.clientHeight > 50 &&
          !adElements.includes(element)
        ) {
          adElements.push(element);
        }
      });
    });
  
    return adElements;
  }