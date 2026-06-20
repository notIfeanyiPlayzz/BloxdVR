# BloxdVR Examples

This folder contains step-by-step examples and tutorials for integrating BloxdVR into your projects.

## Getting Started

Browse the examples below to learn how to use BloxdVR in different scenarios:

### 1. **Basic Setup** (`basic-setup.html`)
A minimal example showing how to initialize BloxdVR in your HTML page.

**What you'll learn:**
- How to load the BloxdVR library
- Basic scene initialization
- Starting a VR session

### 2. **VR Input Handling** (`vr-input-example.html`)
Learn how to handle controller input in VR.

**What you'll learn:**
- Detecting button presses
- Tracking controller position
- Handling grip and trigger inputs

### 3. **Bloxd.io Integration** (`bloxd-integration.html`)
Complete example of integrating BloxdVR with Bloxd.io.

**What you'll learn:**
- Connecting to Bloxd.io game server
- Syncing player avatar in VR
- Real-time multiplayer interaction

### 4. **VR Teleportation** (`teleportation-example.html`)
Implement smooth teleportation mechanics for VR movement.

**What you'll learn:**
- Ray-casting for teleportation targets
- Locomotion using teleportation
- Visual feedback during teleportation

### 5. **Hand Tracking & Gestures** (`hand-tracking-example.html`)
Advanced example using hand tracking and gesture recognition.

**What you'll learn:**
- Accessing hand joint data
- Creating gesture-based interactions
- Hand mesh rendering

## How to Run Examples

1. Clone the BloxdVR repository:
```bash
git clone https://github.com/isiguzoflorence521-gif/BloxdVR.git
cd BloxdVR/examples
```

2. Start a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

3. Open your VR browser and navigate to:
```
http://localhost:8000/basic-setup.html
```

4. (Optional) Use the [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) for desktop testing.

## Example Requirements

Each example requires:
- A modern WebXR-capable browser (Chrome, Edge, or Meta Quest Browser)
- A VR headset (Meta Quest 2/3/Pro, Valve Index, etc.) OR the Immersive Web Emulator
- Basic JavaScript knowledge

## File Structure

```
examples/
├── README.md                      (this file)
├── basic-setup.html              
├── vr-input-example.html         
├── bloxd-integration.html        
├── teleportation-example.html    
├── hand-tracking-example.html    
├── assets/
│   ├── models/                   (3D models for examples)
│   └── scripts/                  (shared utility scripts)
└── styles/
    └── shared.css               (shared styling)
```

## Troubleshooting

### "WebXR is not available"
- Make sure you're using a WebXR-capable browser
- Try the [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) for desktop testing
- Check your VR headset is connected and detected

### "BloxdVR library not found"
- Ensure the BloxdVR library files are in the parent directory
- Check your file paths in the HTML `<script>` tags

### Controller not detected
- Try re-pairing your VR controllers
- Check that your headset's firmware is up-to-date
- Use the Immersive Web Emulator to simulate controllers

## Contributing Examples

Have a cool use-case for BloxdVR? We'd love to see it!

1. Create a new `.html` file in this folder
2. Add a section to this README
3. Submit a pull request with your example

See [CONTRIBUTING.md](../CONTRIBUTING.md) for more details.

## Resources

- [WebXR Device API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [BloxdVR Main Repository](https://github.com/isiguzoflorence521-gif/BloxdVR)
- [Bloxd.io Official Site](https://bloxd.io)

---

Happy VR coding! 🎮🥽
