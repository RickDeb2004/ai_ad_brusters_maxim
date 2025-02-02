# AI Ad Buster Chrome Extension

Transform website advertisements into spooky, entertaining descriptions using AI! This Chrome extension detects ads on web pages and replaces them with creative, halloween-themed descriptions.



## Features

- 🔍 Automatically detects advertisements on web pages
- 🎃 Transforms ads into spooky, creative descriptions
- 🌗 Multiple themes: Vampire Mode and Exorcism Mode
- ⚡ Works with both static and dynamically loaded ads
- 💾 Caches transformations to reduce API calls
- 🔄 Real-time transformation as you browse

## Installation

### From Source Code

1. Clone this repository or download the source code:
```bash
git clone https://github.com/yourusername/ai-ad-buster.git
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" using the toggle in the top right corner

4. Click "Load unpacked" and select the extension directory

### Directory Structure
```
ai-ad-buster/
├── manifest.json
├── popup.html
├── popup.js
├── content.js
├── background.js
└── styles/
    └── popup.css
```

## Configuration

1. Get a Hugging Face API key:
   - Visit [Hugging Face](https://huggingface.co)
   - Create an account and get your API key
   - The free tier has usage limits but works well for personal use

2. Set up the extension:
   - Click the extension icon
   - Enable the extension using the checkbox
   - Choose your preferred transformation mode (Vampire/Exorcism)

## Where It Works

The extension works on most websites that display advertisements. Here are some examples:

### News Websites
- CNN.com
- NYTimes.com
- The Guardian
- News aggregator sites

### Blog Platforms
- Medium
- WordPress sites
- Blogger sites

### Social Media
- Twitter/X
- Facebook
- LinkedIn

### E-commerce
- Amazon
- eBay
- Shopping sites with banner ads

## Ad Detection

The extension detects ads using various selectors:

```javascript
const selectors = [
    'ins.adsbygoogle',
    'div[id^="google_ads_iframe"]',
    '[class*="ad-"]',
    '[id*="ad-"]',
    'div[data-ad]'
    // ... and more
];
```

## Features in Detail

### 1. Smart Ad Detection
- Detects both static and dynamic advertisements
- Filters out false positives (navigation elements, logos, etc.)
- Handles iframes and complex ad containers

### 2. Transformation Modes
- **Vampire Mode**: Dark, gothic-themed transformations
- **Exorcism Mode**: Supernatural, cleansing-themed descriptions

### 3. Performance Optimizations
- Caches transformations for 24 hours
- Rate limiting to avoid API overuse
- Fallback phrases when offline or rate-limited

### 4. User Interface
- Simple toggle to enable/disable
- Mode selection buttons
- Status feedback
- Clean, modern design

## Example Transformations

Original Ad | Transformed Description
------------|------------------------
"Buy now! Limited time offer" | "🦇 A tempting offer whispers from the shadows..."
"Free shipping on all orders" | "👻 Spectral deliveries float through the digital mist..."
"Sign up for our newsletter" | "🕯️ Join our coven of informed souls..."

## Troubleshooting

### Common Issues

1. **Extension Not Working**
   - Ensure it's enabled in the popup
   - Check if you've hit the daily API limit
   - Verify your API key is correct

2. **No Transformations Appearing**
   - Check the console for error messages
   - Ensure JavaScript is enabled
   - Try refreshing the page

3. **Rate Limit Reached**
   - Wait for the daily reset
   - Use cached transformations
   - Consider upgrading to a paid API tier

## Privacy & Security

- No user data is collected or stored
- API calls only contain ad text, no personal information
- All transformations happen locally
- Cached data stays in your browser



