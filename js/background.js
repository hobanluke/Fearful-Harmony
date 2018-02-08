//Adapted from: http://codepen.io/davidhartley/pen/seEki?editors=0010



//luke's stuff'
//PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
//
//
//
//
//
//const gl = canvas.getContext('webgl', {
//    
//    antialias: false,
//    
//    preserveDrawingBuffer: false,
//    
//    alpha: false,
//    
//    powerPrerence: 'low-power',
//    
//    failIfMajorPerformanceCaveat:true,
//
//});
//const minPixelRatio = .75;
//
//const pixelRatio = Math.min(minPixelRatio, window.devicePixelRatio);
//
//
//

//luke's stuff'




// destroy(removeView)
//    {
//        this.destroyPlugins();
//        // call the base destroy
//        super.destroy(removeView);
//        this.context = null;
//        this.refresh = true;
//        this.maskManager.destroy();
//        this.maskManager = null;
//        this.smoothProperty = null;
//    }

//add something

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.GC_MODE = PIXI.GC_MODES.MANUAL;

var width = window.innerWidth;
var height = window.innerHeight;
//var width = clientWidth;
//var height = clientHeight;
var scale = window.devicePixelRatio;

//const renderer = new PIXI.CanvasRenderer(250, 150, 
const renderer = new PIXI.autoDetectRenderer(250, 150, 
                                   
{
    forceCanvas: true,
    view: document.getElementById('background'),
    transparent : false,
    legacy: true,
//    resolution: window.devicePixelRatio,
    resolution: scale,
    roundPixels: true,
});

//var renderer = new PIXI.CanvasRenderer(250, 150, 
//                                   
//{
//view: document.querySelector('canvas'),
//transparent : false,
//legacy: true,
// resolution: 4,
// roundPixels: true,
//});

document.body.appendChild(renderer.view);


//var renderer = PIXI.autoDetectRenderer(size[0], size[1]);

PIXI.settings.RESOLUTION = window.devicePixelRatio;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.GC_MODE = PIXI.GC_MODES.MANUAL;


var stage = new PIXI.Container();

//function CustomFilter(fragmentSource) {
//  PIXI.Filter.call(this,
//      null,
//      fragmentSource
//  );
//}

//CustomFilter.prototype = Object.create(PIXI.Filter.prototype);
//CustomFilter.prototype.constructor = CustomFilter;

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.GC_MODE = PIXI.GC_MODES.MANUAL;

// smoke shader
var shaderCode = document.getElementById('shader').innerHTML
//var smokeShader = new CustomFilter(shaderCode);
var smokeShader = new PIXI.Filter(null,shaderCode);

smokeShader.resolution = window.devicePixelRatio;


smokeShader.uniforms.resolution[0] = width * scale;
smokeShader.uniforms.resolution[1] = height * scale;
smokeShader.uniforms.shift = 0.0;
//smokeShader.uniforms.time = 0.0;
smokeShader.uniforms.speed[0] = 0.0;
smokeShader.uniforms.speed[1] = 0.0;

//var texture = PIXI.Texture.fromImage('');
//var bg = new PIXI.Sprite(texture);
var bg = PIXI.Sprite.fromImage('');
bg.width = 250 * scale;
bg.height = 150 * scale;
bg.filters = [smokeShader]
//
stage.addChild(bg);

var count = 0;

animate()

function animate() {
    requestAnimationFrame(animate);

    count += 0.0002
    smokeShader.uniforms.time = count;
    $("canvas").show();    
    renderer.render(stage);
    
}

//var x= width/2;
//var y= height/2;

console.log(width);

document.onmousemove = function(evt){
  mousePos = {x:evt.clientX,y:evt.clientY}

  smokeShader.uniforms.mouse = mousePos;

}

var resize = function () {
        window.addEventListener('resize', rendererResize);
        window.addEventListener('deviceOrientation', rendererResize);
};

//potential fix

var rendererResize = function () {
    var width = window.innerWidth,
        height = window.innerHeight,
        targetScale;
    
        canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
        renderer().resize(canvas.width, canvas.height);

         if (height / targetHeight < width / targetWidth) {
         scene.scale.x = scene.scale.y = height / targetHeight;
     } else {
         scene.scale.x = scene.scale.y = width / targetWidth;
     }
}

//console.log(smokeShader.uniforms.mouse);
//
//function resize() {
//
//    var w = window.innerWidth;
//    var h = window.innerHeight;
//
//    renderer.view.style.width = w + 'px';
//    renderer.view.style.height = h + 'px';
//}
//
//window.onresize = resize;
//

