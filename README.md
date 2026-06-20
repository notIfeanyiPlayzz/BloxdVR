# BloxdVR

![Static Badge](https://img.shields.io/badge/Platform-Meta__Quest-purple?logo=meta)
![Static Badge](https://img.shields.io/badge/Platform-Valve__Index-darkgrey?logo=valve)
![Static Badge](https://img.shields.io/badge/Platform-Oculus__Rift-darkgrey?logo=oculus)
![License](https://img.shields.io/badge/License-MIT-green?logo=license)
![GitHub](https://img.shields.io/badge/GitHub-Open%20Source-black?logo=github)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow?logo=javascript)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.3.5-blue)
![WebXR](https://img.shields.io/badge/WebXR-Ready-important?logo=webassembly)

**BloxdVR** is a custom, community-driven virtual reality project that brings the world of [Bloxd.io](https://bloxd.io) into a fully immersive VR experience. This project serves as a VR client and integration toolkit for bringing WebXR capabilities to the Bloxd.io ecosystem.

> **⚠️ Disclaimer:** BloxdVR is an **unofficial** third-party project and is not affiliated with the official Bloxd.io developers.

## ✨ Features

*   **Head Movement Tracking:** Full 360-degree vision using the [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API).
*   **VR Controls:** Optimized input mapping for Quest, Index, and major VR controllers.
*   **3D Camera View:** Enhanced depth perception for a true voxel immersion.
*   **VR Interactions:** Custom-coded mechanics designed for a VR sandbox environment.
*   **6DOF Tracking:** Complete head and hand positional tracking.
*   **Real-Time Multiplayer:** WebSocket integration for seamless multiplayer VR.
*   **Hand Tracking Ready:** Support for hand gesture recognition and finger tracking.

## 🛠️ Getting Started

### Prerequisites

To use BloxdVR, you will need:

*   A VR-capable browser (Meta Quest Browser, Chrome, or Edge).
*   A compatible headset (Quest 2/3/Pro, Valve Index, Rift, etc.).
*   Optional: [Immersive Web Emulator](https://chromewebstore.google.com/detail/immersive-web-emulator/cgffilbpcibhmcfbgggfhfolhkfbhmik) for desktop testing.

### Installation / Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/notIfeanyiPlayzz/BloxdVR.git
   cd BloxdVR
   ```

2. **Start a local server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

3. **Open in your VR browser:**
   ```
   http://localhost:8000/index.html
   ```

4. **Try the examples:**
   ```
   http://localhost:8000/examples/basic-setup.html
   ```

## 🧪 Project Status

**Status:** ✅ Active Development

BloxdVR is currently in active development and serves as a testing ground for:
- VR-to-Web integration.
- Voxel-based movement physics.
- Real-time multiplayer VR synchronization.
- Integration into the wider Bloxd toolkit ecosystem.

## 📚 Documentation

- 📖 [Full Tutorial](./DEV_TO_ARTICLE.md) - Complete getting started guide
- 💡 [Examples](./examples/) - 4+ working code examples
- 📋 [Contributing Guide](./CONTRIBUTING.md) - How to contribute
- 📜 [Code of Conduct](./CODE_OF_CONDUCT.md) - Community guidelines

## 🤝 Contributing

We welcome contributions! To contribute to BloxdVR:

1. **Fork** the Project.
2. **Create** your Feature Branch (`git checkout -b feature/NewVRFeature`).
3. **Commit** your changes (`git commit -m 'Add VR teleportation'`).
4. **Push** to the Branch (`git push origin feature/NewVRFeature`).
5. **Open** a Pull Request.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 👤 Supported VR Avatars (v1.3.5)

| Name    | Appearance                                | Gender | Status |
| :------ | :---------------------------------------- | :----- | :----- |
| **Bob**    | Default, Brown Hair, Blue Eyes            | Male   | ✅ Live |
| **Leo**    | Bright Skin, Brown Hair, Blue Eyes        | Male   | ✅ Live |
| **Sanjay** | Dark Skin, Short Hair, Light Brown Eyes   | Male   | ✅ Live |
| **Enoch**  | Dark Skin, Short Hair, Brown Eyes         | Male   | ✅ Live |
| **Emma**   | Bright Skin, Blond Hair, Green Eyes       | Female | ✅ Live |
| **Isabel** | Bright Skin, Brown Hair, Blue Eyes        | Female | ✅ Live |
| **Imara**  | Dark Skin, Long Hair, Brown Eyes          | Female | ✅ Live |
| **Sara**   | Dark Skin, Long Hair, Dark Brown Eyes     | Female | ✅ Live |

## 👕 VR-Synced Clothing (World Presence)

The BloxdVR engine (v1.3.5) now dynamically maps your avatar's clothing to your VR hand/arm meshes:

**Upper Body:**
*   **Hoodie:** Red texture, default full-length sleeves, brown belt.
*   **Purple Top:** Purple texture, short sleeves, brown belt.
*   **Light Blue Polo:** Blue texture, short sleeves, black belt.
*   **Green Top:** Green texture, rolled-up sleeve meshes.
*   **Khakis:** Brown-ish texture with a small pocket, brown belt.
*   **Light Blue Crop Top:** Light blue texture, sleeveless/crop style.

**Lower Body:**
*   **Jeans/Trousers:** Light Blue, Navy Blue, or Brown long-sleeve leg meshes.
*   **Shorts:** Tan or Navy Blue Denim short-sleeve leg meshes with synced footwear.

## 🌐 Resources

- 🔗 [GitHub Repository](https://github.com/isiguzoflorence521-gif/BloxdVR)
- 🎮 [Bloxd.io Official Site](https://bloxd.io)
- 📚 [WebXR Device API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- 🌍 [WebXR Community Group](https://www.w3.org/community/immersive-web/)

## 📊 Project Stats

- ✅ **MIT Licensed** - Free for commercial use
- 📦 **100% JavaScript** - No external dependencies required
- 🚀 **Production Ready** - Used in real VR environments
- 📝 **Well Documented** - Complete guides and examples
- 🤝 **Community Driven** - Open for contributions and feedback
- ⭐ **Open Source** - Transparent development

## 🎯 Quick Links

- **Try it now:** [Live Demo](https://notifeanyiplayzz.github.io/BloxdVR/)
- **Examples:** [/examples](./examples/)
- **Issues:** [Report a bug](https://github.com/isiguzoflorence521-gif/BloxdVR/issues)
- **Discussions:** [Join the conversation](https://github.com/isiguzoflorence521-gif/BloxdVR/discussions)

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

Free for personal and commercial use with attribution.

---

## 🎓 Learning Resources

New to WebXR or VR development? Check out these resources:

- [MDN WebXR Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [WebXR Samples](https://immersive-web.github.io/)
- [Three.js VR Examples](https://threejs.org/examples/?q=vr)
- [Babylon.js VR Support](https://doc.babylonjs.com/features/featuresDeepDive/Cameras/WebXRCamera)

## 💬 Community

Have questions or want to share your creations? 

- 💭 **Discussions:** [GitHub Discussions](https://github.com/isiguzoflorence521-gif/BloxdVR/discussions)
- 🐛 **Issues:** [Report bugs here](https://github.com/isiguzoflorence521-gif/BloxdVR/issues)
- ⭐ **Stars:** Help us grow by starring the project!

---

**Ready to enter the voxel metaverse in VR?** 🚀

Start with the [tutorial](./DEV_TO_ARTICLE.md) or jump into the [examples](./examples/)!
