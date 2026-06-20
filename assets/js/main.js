/**
 * BloxdVR - Core Client Engine (main.js)
 * High-performance JavaScript bridge translating 6DOF inputs into voxel engine mechanics.
 */

class BloxdVREngine {
  constructor() {
    this.xrSession = null;
    this.xrRefSpace = null;
    this.glContext = null;
    this.canvas = null;
    
    // Core state tracking for avatar/world sync
    this.playerState = {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      controllers: { left: null, right: null },
      activeAvatar: 'Bob' // Fallback identity configuration
    };

    this.init();
  }

  /**
   * Initial bindings and browser capability scanning
   */
  async init() {
    this.canvas = document.getElementById('vr-canvas') || this.createFallbackCanvas();
    this.setupUIBindings();

    // Check WebXR accessibility status
    if (navigator.xr) {
      try {
        const isSupported = await navigator.xr.isSessionSupported('immersive-vr');
        if (isSupported) {
          this.enableVRButton();
        } else {
          console.warn('Immersive VR session layout unsupported natively.');
        }
      } catch (err) {
        console.error('WebXR compatibility scan failure:', err);
      }
    } else {
      console.warn('WebXR API missing. Verify webxr-polyfill build injection.');
    }
  }

  /**
   * UI button configuration handlers
   */
  setupUIBindings() {
    const vrBtn = document.getElementById('enter-vr-btn');
    if (vrBtn) {
      vrBtn.addEventListener('click', () => this.onRequestXRSession());
    }
  }

  enableVRButton() {
    const vrBtn = document.getElementById('enter-vr-btn');
    if (vrBtn) {
      vrBtn.disabled = false;
      vrBtn.textContent = 'ENTER BLOXD VR';
    }
  }

  /**
   * Handles initialization transitions into immersive headset rendering
   */
  async onRequestXRSession() {
    if (!this.xrSession) {
      try {
        // Initialize WebGL context with explicit XR requirements
        this.glContext = this.canvas.getContext('webgl', { xrCompatible: true });
        
        const session = await navigator.xr.requestSession('immersive-vr', {
          requiredFeatures: ['local-floor'],
          optionalFeatures: ['hand-tracking', 'layers']
        });

        this.onSessionStarted(session);
      } catch (error) {
        alert(`Failed to allocate VR runtime framework: ${error.message}`);
      }
    }
  }

  /**
   * Successful entry pipeline execution
   */
  async onSessionStarted(session) {
    this.xrSession = session;
    session.addEventListener('end', () => this.onSessionEnded());

    // Bind rendering pipeline targets
    this.glContext.makeXRCompatible().then(() => {
      session.updateRenderState({
        baseLayer: new XRWebGLLayer(session, this.glContext)
      });

      session.requestReferenceSpace('local-floor').then((refSpace) => {
        this.xrRefSpace = refSpace;
        // Kick off primary tick generation cycle
        session.requestAnimationFrame((time, frame) => this.onXRFrame(time, frame));
      });
    });
    
    this.toggleUIVisibility(true);
  }

  /**
   * Core Game and Render Loop (High Frequency Event Processing)
   */
  onXRFrame(time, frame) {
    const session = frame.session;
    // Requeue loop iteration target instantly to preserve display sync
    session.requestAnimationFrame((t, f) => this.onXRFrame(t, f));

    const pose = frame.getViewerPose(this.xrRefSpace);
    if (pose) {
      const glLayer = session.renderState.baseLayer;
      this.glContext.bindFramebuffer(this.glContext.FRAMEBUFFER, glLayer.framebuffer);

      // Clear viewport space for subsequent redraw executions
      this.glContext.clearColor(0.1, 0.1, 0.1, 1.0);
      this.glContext.clear(this.glContext.COLOR_BUFFER_BIT | this.glContext.DEPTH_BUFFER_BIT);

      // Process individual display view matrices (Stereoscopic Left vs Right eye)
      for (const view of pose.views) {
        const viewport = glLayer.getViewport(view);
        this.glContext.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
        
        // 3D Camera / WebGL matrix updates mapped directly into client viewport
        this.updateCameraViewMatrix(view.transform.inverse.matrix, view.projectionMatrix);
      }

      // Read physical trackpad/hand tracking changes
      this.processControllerInputs(frame);
    }
  }

  /**
   * Synchronizes spatial transforms targeting camera perspectives
   */
  updateCameraViewMatrix(viewMatrix, projectionMatrix) {
    // Pipeline implementation hooks targeting voxel mesh projections go here
    // Example: this.voxelRenderer.setViewProjection(viewMatrix, projectionMatrix);
  }

  /**
   * Maps connected inputs (Quest, Index, Rift) directly to actions
   */
  processControllerInputs(frame) {
    const inputSources = this.xrSession.inputSources;
    
    for (const source of inputSources) {
      if (source.gamepad) {
        const handedness = source.handedness; // 'left' or 'right'
        const axes = source.gamepad.axes;       // Thumbstick offsets [x, y]
        const buttons = source.gamepad.buttons; // Array of trigger/grip metadata

        // Trackpad/Thumbstick Axis Vector Extraction
        const stickX = axes[2] || axes[0] || 0;
        const stickY = axes[3] || axes[1] || 0;

        // Button States
        const triggerPressed = buttons[0]?.pressed || false;
        const gripPressed = buttons[1]?.pressed || false;

        this.playerState.controllers[handedness] = {
          stick: { x: stickX, y: stickY },
          trigger: triggerPressed,
          grip: gripPressed
        };

        // Fire input broadcast to the underlying voxel mechanics engine
        this.dispatchVoxelMovement(handedness, stickX, stickY, triggerPressed);
      }
    }
  }

  /**
   * Converts continuous thumbstick coordinate vectors into structural player position transforms
   */
  dispatchVoxelMovement(hand, x, y, trigger) {
    if (Math.abs(x) > 0.1 || Math.abs(y) > 0.1) {
      // Scale coordinates to step variables matching standard movement speeds
      const speedModifier = 0.08;
      this.playerState.position.x += x * speedModifier;
      this.playerState.position.z += y * speedModifier;
      
      // Hook routing target logic tracing out into sandbox coordinates
      // console.log(`Moving ${this.playerState.activeAvatar}:`, this.playerState.position);
    }
  }

  /**
   * Tear-down logic triggered upon tracking suspension alerts
   */
  onSessionEnded() {
    this.xrSession = null;
    this.xrRefSpace = null;
    this.toggleUIVisibility(false);
    console.log('Immersive VR Session successfully closed.');
  }

  toggleUIVisibility(isInVR) {
    const overlay = document.getElementById('vr-overlay-hud');
    if (overlay) {
      overlay.style.display = isInVR ? 'block' : 'none';
    }
  }

  createFallbackCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'vr-canvas';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    document.body.appendChild(canvas);
    return canvas;
  }
}

// Instantiate engine logic cleanly once DOM parameters register complete
window.addEventListener('DOMContentLoaded', () => {
  window.appEngine = new BloxdVREngine();
});
