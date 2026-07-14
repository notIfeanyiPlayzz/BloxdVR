/**
 * BloxdVR - Core Client Engine
 * WebXR + Phone VR Stereo Client
 */

class BloxdVREngine {

  constructor() {

    this.xrSession = null;
    this.xrRefSpace = null;
    this.glContext = null;
    this.canvas = null;

    this.mode = localStorage.getItem("bloxd_mode") || "xr";
    this.phoneVR = this.mode === "mobile_vr";

    this.playerState = {
      position: { x:0, y:0, z:0 },
      rotation: { x:0, y:0, z:0, w:1 },
      controllers:{
        left:null,
        right:null
      },
      activeAvatar:"Bob"
    };


    this.init();
  }



  async init(){

    this.canvas =
      document.getElementById("vr-canvas") ||
      this.createFallbackCanvas();


    this.setupUIBindings();


    /*
      PHONE VR MODE
    */
    if(this.phoneVR){

      console.log(
        "BloxdVR: Starting Phone VR mode"
      );

      this.startPhoneVR();
      return;
    }



    /*
      NORMAL WEBXR MODE
    */

    if(navigator.xr){

      try{

        const supported =
          await navigator.xr.isSessionSupported(
            "immersive-vr"
          );


        if(supported){

          this.enableVRButton();

        }


      }catch(e){

        console.error(
          "XR check failed",
          e
        );

      }

    }
    else{

      console.warn(
        "WebXR unavailable"
      );

    }

  }




  setupUIBindings(){

    const btn =
      document.getElementById(
        "enter-vr-btn"
      );


    if(btn){

      btn.onclick =
        ()=>this.onRequestXRSession();

    }

  }




  enableVRButton(){

    const btn =
      document.getElementById(
        "enter-vr-btn"
      );


    if(btn){

      btn.disabled=false;
      btn.innerText="ENTER BLOXD VR";

    }

  }




  async onRequestXRSession(){


    try{


      this.glContext =
        this.canvas.getContext(
          "webgl",
          {
            xrCompatible:true
          }
        );



      const session =
        await navigator.xr.requestSession(
          "immersive-vr",
          {
            requiredFeatures:[
              "local-floor"
            ],
            optionalFeatures:[
              "hand-tracking",
              "layers"
            ]
          }
        );



      this.onSessionStarted(session);



    }
    catch(err){

      alert(
        "VR failed: "+
        err.message
      );

    }

  }





  async onSessionStarted(session){


    this.xrSession=session;


    session.addEventListener(
      "end",
      ()=>this.onSessionEnded()
    );



    await this.glContext.makeXRCompatible();



    session.updateRenderState({

      baseLayer:
        new XRWebGLLayer(
          session,
          this.glContext
        )

    });



    this.xrRefSpace =
      await session.requestReferenceSpace(
        "local-floor"
      );



    session.requestAnimationFrame(
      (t,f)=>this.onXRFrame(t,f)
    );



    this.toggleUIVisibility(true);

  }





  onXRFrame(time,frame){


    const session =
      frame.session;



    session.requestAnimationFrame(
      (t,f)=>this.onXRFrame(t,f)
    );



    const pose =
      frame.getViewerPose(
        this.xrRefSpace
      );


    if(!pose)
      return;



    const layer =
      session.renderState.baseLayer;



    this.glContext.bindFramebuffer(
      this.glContext.FRAMEBUFFER,
      layer.framebuffer
    );



    this.glContext.clearColor(
      0.05,
      0.05,
      0.05,
      1
    );


    this.glContext.clear(
      this.glContext.COLOR_BUFFER_BIT |
      this.glContext.DEPTH_BUFFER_BIT
    );



    for(const view of pose.views){


      const viewport =
        layer.getViewport(view);



      this.glContext.viewport(
        viewport.x,
        viewport.y,
        viewport.width,
        viewport.height
      );



      this.updateCameraViewMatrix(
        view.transform.inverse.matrix,
        view.projectionMatrix
      );

    }



    this.processControllerInputs(frame);

  }






  /*
    PHONE VR MODE
    Cardboard style split screen
  */


  startPhoneVR(){


    const canvas=this.canvas;


    canvas.width =
      window.innerWidth;


    canvas.height =
      window.innerHeight;



    const ctx =
      canvas.getContext("2d");



    const loop=()=>{


      const half =
        canvas.width/2;



      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );



      // LEFT EYE

      ctx.save();

      ctx.beginPath();

      ctx.rect(
        0,
        0,
        half,
        canvas.height
      );

      ctx.clip();


      this.renderPhoneEye(
        ctx,
        0,
        half,
        "LEFT"
      );


      ctx.restore();





      // RIGHT EYE


      ctx.save();

      ctx.beginPath();

      ctx.rect(
        half,
        0,
        half,
        canvas.height
      );


      ctx.clip();


      this.renderPhoneEye(
        ctx,
        half,
        half,
        "RIGHT"
      );


      ctx.restore();



      requestAnimationFrame(loop);

    };


    loop();


  }





  renderPhoneEye(
    ctx,
    x,
    width,
    eye
  ){


    ctx.fillStyle="#000";


    ctx.fillRect(
      x,
      0,
      width,
      this.canvas.height
    );



    ctx.fillStyle="#2ecc00";


    ctx.font=
      "32px monospace";



    ctx.fillText(
      "BLOXDVR",
      x + width/2 - 80,
      this.canvas.height/2
    );



    ctx.font=
      "16px monospace";


    ctx.fillText(
      eye+" EYE",
      x + width/2 - 35,
      this.canvas.height/2 + 40
    );


  }







  processControllerInputs(frame){


    for(
      const source of this.xrSession.inputSources
    ){


      if(!source.gamepad)
        continue;



      const gp =
        source.gamepad;



      this.playerState.controllers[
        source.handedness
      ]={

        trigger:
          gp.buttons[0]?.pressed || false,

        grip:
          gp.buttons[1]?.pressed || false,

        x:
          gp.axes[0] || 0,

        y:
          gp.axes[1] || 0

      };

    }

  }







  updateCameraViewMatrix(
    view,
    projection
  ){

    // Connect your 3D renderer here

  }







  onSessionEnded(){


    this.xrSession=null;

    this.xrRefSpace=null;


    this.toggleUIVisibility(false);


  }






  toggleUIVisibility(v){


    const hud =
      document.getElementById(
        "vr-overlay-hud"
      );


    if(hud)
      hud.style.display =
        v ? "block":"none";

  }






  createFallbackCanvas(){


    const c =
      document.createElement(
        "canvas"
      );


    c.id="vr-canvas";


    c.style.width="100vw";
    c.style.height="100vh";


    document.body.appendChild(c);


    return c;

  }

}




window.addEventListener(
"DOMContentLoaded",
()=>{

  window.appEngine =
    new BloxdVREngine();

});
