//scripts/vr_handler.j

export class BloxdVRHandler {
    constructor() {
        this.session = null;
        this.canvas = document.querySelector('canvas'); // Targets Bloxd.io canvas
    }

    async initVR() {
        if (navigator.xr) {
            const supported = await navigator.xr.isSessionSupported('immersive-vr');
            if (supported) {
                console.log("BloxdVR: VR is supported on this device.");
                this.createVRButton();
            }
        }
    }

    createVRButton() {
        const btn = document.createElement('button');
        btn.innerHTML = "ENTER BLOXD VR";
        btn.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); z-index:9999; padding:15px; background:#2ecc71; color:white; border:none; border-radius:5px; cursor:pointer;";
        document.body.appendChild(btn);

        btn.onclick = () => this.startVRSession();
    }

    async startVRSession() {
        this.session = await navigator.xr.requestSession('immersive-vr', {
            optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
        });
        console.log("BloxdVR: Session Started");
        
        // Hook into the render loop
        this.session.requestAnimationFrame((time, frame) => this.onVRFrame(time, frame));
    }

    onVRFrame(time, frame) {
        // This is where we will sync the Bloxd camera to the VR headset
        this.session.requestAnimationFrame((t, f) => this.onVRFrame(t, f));
    }
}
