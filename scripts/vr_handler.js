// scripts/vr_handler.js

export class BloxdVRHandler {
    constructor() {
        this.session = null;
        this.gl = null;
        this.xrRefSpace = null;
        this.canvas = document.querySelector('canvas'); // Targets Bloxd.io native canvas
        
        // Internal transform tracking for Bloxd camera override loops
        this.headsetPose = {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 0, z: 0, w: 1 },
            matrices: { leftEye: null, rightEye: null }
        };
    }

    async initVR() {
        if (navigator.xr) {
            try {
                const supported = await navigator.xr.isSessionSupported('immersive-vr');
                if (supported) {
                    console.log("BloxdVR: VR is supported on this device.");
                    this.createVRButton();
                }
            } catch (err) {
                console.error("BloxdVR: Compatibility check error", err);
            }
        }
    }

    createVRButton() {
        // Prevent duplicate injection if the button already exists
        if (document.getElementById('bloxd-vr-toggle')) return;

        const btn = document.createElement('button');
        btn.id = 'bloxd-vr-toggle';
        btn.innerHTML = "ENTER BLOXD VR";
        btn.style.cssText = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); z-index:9999; padding:15px; background:#2ecc71; color:white; border:none; border-radius:5px; font-weight:bold; cursor:pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.3);";
        document.body.appendChild(btn);

        btn.onclick = () => this.startVRSession(btn);
    }

    async startVRSession(buttonElement) {
        try {
            // 1. Establish an active WebGL context and make it XR compatible
            this.gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
            if (!this.gl) throw new Error("WebGL rendering context unavailable.");
            
            await this.gl.makeXRCompatible();

            // 2. Request the immersive hardware session
            this.session = await navigator.xr.requestSession('immersive-vr', {
                requiredFeatures: ['local-floor'],
                optionalFeatures: ['hand-tracking']
            });
            
            console.log("BloxdVR: Session Started");
            buttonElement.style.display = 'none'; // Hide button while inside the headset

            // 3. Bind the browser canvas rendering layer to the headset display targets
            this.session.updateRenderState({
                baseLayer: new XRWebGLLayer(this.session, this.gl)
            });

            // 4. Request spatial grounding reference coordinates and start the loops
            this.xrRefSpace = await this.session.requestReferenceSpace('local-floor');
            
            this.session.addEventListener('end', () => {
                this.session = null;
                buttonElement.style.display = 'block';
                console.log("BloxdVR: Session Ended");
            });

            this.session.requestAnimationFrame((time, frame) => this.onVRFrame(time, frame));

        } catch (error) {
            console.error("BloxdVR: Failed to transition into VR tracking context:", error);
            alert(`VR Launch Failure: ${error.message}`);
        }
    }

    onVRFrame(time, frame) {
        if (!this.session) return;
        
        // Re-queue frame update immediately to stay synchronized with the device refresh rate
        this.session.requestAnimationFrame((t, f) => this.onVRFrame(t, f));

        const pose = frame.getViewerPose(this.xrRefSpace);
        if (pose) {
            const glLayer = this.session.renderState.baseLayer;
            
            // Re-route the active frame buffer mapping straight to the headset display textures
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, glLayer.framebuffer);
            
            // Clear screen buffers to redraw the voxel viewport space cleanly
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            // Extract position/orientation parameters from the physical tracking hardware
            const transform = pose.transform;
            this.headsetPose.position = transform.position;
            this.headsetPose.rotation = transform.orientation;

            // Step through stereoscopic left and right eye output allocations
            for (const view of pose.views) {
                const viewport = glLayer.getViewport(view);
                this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

                // Check the user's eye target allocation ('left' vs 'right')
                if (view.eye === 'left') {
                    this.headsetPose.matrices.leftEye = view.transform.inverse.matrix;
                } else if (view.eye === 'right') {
                    this.headsetPose.matrices.rightEye = view.transform.inverse.matrix;
                }
            }

            // Execute client overrides injecting spatial vectors directly into the active Bloxd matrix
            this.syncWithBloxdEngine();
        }
    }

    syncWithBloxdEngine() {
        /**
         * HOOK POINT FOR INJECTION:
         * This is where you pass `this.headsetPose` vectors into Bloxd's specific game engine.
         * Depending on Bloxd.io's underlying engine compilation, you will want to target:
         * 
         * 1. If Three.js engine variant is running:
         *    bloxdCamera.position.set(this.headsetPose.position.x, this.headsetPose.position.y, this.headsetPose.position.z);
         *    bloxdCamera.quaternion.set(this.headsetPose.rotation.x, this.headsetPose.rotation.y, this.headsetPose.rotation.z, this.headsetPose.rotation.w);
         * 
         * 2. If Babylon.js or custom WebGL matrix pipeline is running:
         *    Map `this.headsetPose.matrices.leftEye` directly over their uniform projection values.
         */
        
        // Debug position logging (Disable in production builds to optimize performance)
        // console.log("Current Headset Position Vector:", this.headsetPose.position);
    }
}
