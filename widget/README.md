# Cold Lava AI Custom Widget

A beautiful, glassmorphism-styled floating widget for Cold Lava AI websites. Features instant loading, mobile optimization, and custom Cold Lava branding.

## Features

- ✅ **Instant Loading** - No external dependencies or slow loading times
- ✅ **Glassmorphism Design** - Modern, premium aesthetic matching Cold Lava branding
- ✅ **Mobile Optimized** - Fully responsive for all screen sizes
- ✅ **Custom Branding** - Cold Lava logo and colors throughout
- ✅ **Multiple Contact Options** - Call Sophie (AI), book calls, send email
- ✅ **Smooth Animations** - Pulse effect, hover states, modal transitions
- ✅ **Analytics Ready** - Facebook Pixel tracking built-in

## Installation

### Quick Start (All-in-One)

If your widget is already integrated in your HTML file (like the Cold Lava homepage), it's ready to go!

### Standalone Installation (For Other Sites)

1. **Include the CSS in your `<head>`:**
```html
<link rel="stylesheet" href="widget/cold-lava-widget.css">
```

2. **Add the widget HTML before your closing `</body>` tag:**
```html
<!-- Copy contents from cold-lava-widget.html -->
```

3. **Include the JavaScript after the widget HTML:**
```html
<script src="widget/cold-lava-widget.js"></script>
```

4. **Add the Cold Lava logo image:**
   - Place `coldlava-logo.png` in your root directory, or
   - Update the `src` paths in the HTML to match your logo location

## Files Included

- `cold-lava-widget.css` - Complete styling with glassmorphism effects
- `cold-lava-widget.js` - Functionality and event handlers
- `cold-lava-widget.html` - HTML markup template
- `README.md` - This file

## Customization

### Change Contact Options

Edit the `.widget-option` elements in the HTML:

```html
<div class="widget-option" onclick="window.location.href='tel:YOUR_PHONE'">
    <div class="widget-option-icon">📞</div>
    <div class="widget-option-content">
        <h4>Your Title</h4>
        <p>Your description</p>
    </div>
</div>
```

### Change Colors

The widget uses Cold Lava's brand colors:
- Primary: `#02bbd4` (Cyan/Blue)
- Secondary: `#4a90e2` (Light Blue)
- Background: `#0a0a33` (Dark Navy)

To customize colors, edit the CSS variables in `cold-lava-widget.css`.

### Change Position

By default, the widget appears in the bottom-right. To change:

```css
.cold-lava-widget {
    bottom: 24px;  /* Distance from bottom */
    right: 24px;   /* Distance from right */
    /* Or use left: 24px; for bottom-left */
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android)

## Performance

- **No external dependencies** - Pure CSS/JS
- **Lightweight** - ~8KB CSS + ~2KB JS
- **Instant loading** - No API calls or external resources
- **GPU accelerated** - Uses CSS transforms for smooth animations

## Version History

### v1.0.0 (2025-11-05)
- Initial release
- Glassmorphism design
- Mobile responsive
- Analytics tracking
- Cold Lava branding

## Support

For issues or questions:
- Email: oliver@otdm.net
- GitHub: https://github.com/coldlavaai/home

## License

Copyright © 2025 Cold Lava AI. All rights reserved.
