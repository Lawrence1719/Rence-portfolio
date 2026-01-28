# Terminal Launcher - User Guide

## Desktop Usage

### Opening the Terminal

1. **Click the Terminal Button in Navbar**
   - Located on the far right of the navigation bar
   - Icon: `>_` (green neon color)
   - Hover for subtle glow effect

2. **Use Keyboard Shortcuts**
   - Press `~` (tilde key)
   - Press `` ` `` (backtick key)
   - Press `Ctrl + `` ` `` (Ctrl + backtick)

### Desktop Terminal Features

- **Draggable Modal**: Click and drag the title bar to move the terminal window
- **Responsive Size**: Modal adjusts to fit your screen (max 1100px width, 85% height)
- **Centered Layout**: Always appears in the center of the screen
- **Spring Animation**: Smooth, bouncy open/close animation

---

## Mobile Usage

### Opening the Terminal

1. **Tap the Floating Button**
   - Located in the bottom-right corner
   - Small square button with `>_` icon
   - Soft glow effect

2. **Use Keyboard Shortcuts**
   - Press `~` (tilde key)
   - Press `` ` `` (backtick key)
   - Press `Ctrl + `` ` `` (Ctrl + backtick)

### Mobile Terminal Features

- **Full-Height Modal**: Takes up 90% of viewport height
- **Touch-Friendly**: Optimized for mobile screen sizes
- **Non-Draggable**: Fixed position for easier interaction
- **Easy Dismiss**: Tap the overlay or press ESC to close

---

## Terminal Commands

Once the terminal is open, you can use all standard commands:

```
help          → Show all available commands
whoami        → Display bio/about info
stack         → Show tech stack
projects      → List all projects
experience    → View experience timeline
stats         → GitHub contribution stats
theme dark    → Switch to dark mode
theme light   → Switch to light mode
chat          → Activate chat mode (coming soon)
clear, cls    → Clear terminal output
exit, quit    → Close terminal
```

**Easter Eggs:**
- `hack` - Renders Matrix rain effect
- `coffee` - Shows brewing animation
- `sudo rm -rf /` - Special security message

---

## Keyboard Shortcuts Behavior

### What Works
- ✅ All three shortcut keys work on **every page**
- ✅ Works in the **navbar button** (desktop)
- ✅ Works with the **floating button** (mobile)
- ✅ Works **inside the terminal input** for consistency

### What's Protected
- ❌ Shortcuts are **blocked in text fields** (except terminal input)
- This prevents accidental terminal toggles while typing in forms
- Fill out contact forms, search boxes, etc. without interruption

### Examples
- Typing in a form field with backtick: ✅ Works normally (shortcut disabled)
- Inside terminal typing a command: ✅ Can still use shortcuts if needed
- On any page not in a text field: ✅ Shortcuts work instantly

---

## Visual Design

### Desktop Terminal Button
```
[> Home] [> About] [> Projects] [> Resume] [> Contact] [>_]
                                                        ↑
                                                  Terminal Button
                                          (Glows on hover with neon green)
```

### Mobile Floating Button
```
┌─────────────────────┐
│   Mobile Screen     │
│                     │
│  (Page Content)     │
│                     │
│                 ┌───┐
│                 │>_ │  ← Floating Terminal Button
│                 └───┘     (Bottom Right, Glowing)
└─────────────────────┘
```

---

## Animation Timeline

### Opening the Terminal (0.3s)
1. Backdrop fades in with blur effect
2. Modal scales up from 0.95 to 1.0
3. Modal fades in simultaneously
4. Spring animation creates smooth bounce

### Closing the Terminal (0.3s)
1. Modal scales down to 0.95
2. Backdrop fades out
3. All animations reverse smoothly

---

## Tips & Tricks

1. **Quick Access**: Use backtick (`` ` ``) for fastest terminal access
2. **Gaming**: Use tilde (`~`) if backtick interferes with game controls
3. **Accessibility**: Use `Ctrl + `` ` `` if you need modifier-based shortcuts
4. **Mobile**: Tap the floating button quickly twice to close and reopen
5. **Dragging**: On desktop, drag the title bar (shows `$  ~/portfolio`) to reposition

---

## Responsive Breakpoint

- **Desktop (≥768px)**: Terminal button in navbar, no floating button
- **Mobile (<768px)**: Terminal button hidden from navbar, floating button visible

The terminal modal automatically adapts to your screen size for optimal viewing.

---

## Troubleshooting

### Keyboard Shortcuts Not Working?
1. Make sure you're not inside a text input field
2. Try refreshing the page
3. Check if NumLock is affecting the backtick key
4. Try the `Ctrl + `` ` `` modifier combination instead

### Terminal Button Not Visible?
1. **Desktop**: Check if your screen width is ≥768px (tablet/computer)
2. **Mobile**: Check if your screen width is <768px (phone)
3. Resize your browser window to test responsiveness

### Modal Stuck or Not Opening?
1. Press ESC to forcibly close any open modals
2. Check browser console for errors (F12)
3. Try using a keyboard shortcut instead of clicking

---

## Accessibility Features

- ✅ **ARIA Labels**: All buttons have descriptive labels
- ✅ **Keyboard Navigation**: Full keyboard support for all shortcuts
- ✅ **Focus States**: Clear visual focus indicators
- ✅ **Screen Readers**: Proper semantic markup for assistive technology
- ✅ **Contrast**: Neon green text maintains color contrast standards

---

**Version**: 1.0  
**Last Updated**: January 28, 2026  
**Status**: Fully Functional ✅
