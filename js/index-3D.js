import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

//import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader';


var height, width;
var scene;
let hasPlaced = false;
var tracker, trackerGroup;

var model;
var url;
var scaleIndex;
var listeners = false;

var objectHint;

// Setup a Zappar camera instead of one of ThreeJS's cameras
var camera;

var cameraBorder, flashIcon, cameraNavbar, previewNavbar, imageCanvas;


// Setup ThreeJS in the usual way
const renderer = new THREE.WebGLRenderer();


function resizeCanvas()
{
    height = renderer.domElement.style.height;
    width = renderer.domElement.style.width;



    console.log(renderer.domElement.style.height  + " HEIGHT")
    renderer.domElement.style.height =
        (renderer.domElement.style.height.replace("px", "")) + "px";

    renderer.domElement.style.width =
        (renderer.domElement.style.width.replace("px", "")) + "px";
    console.log(renderer.domElement.style.height  + " HEIGHT")
}



export function cameFromGame()
{
    listeners = false;
}

export function initCamera(modelPath, scale)
{
    
    scaleIndex = scale;
    cameraBorder = document.getElementById("camera-border");

    if(document.getElementById("camera_preview"))
    {
        document.getElementById("camera_preview").remove();
    }


    /*imageCanvas = document.createElement("canvas");
    imageCanvas.id = "image_canvas";
    imageCanvas.height = renderer.domElement.style.height + "px"; */
    
    //Crafty.init(renderer.domElement.style.height,renderer.domElement.style.width,
       // document.getElementById('camera-border'));

    //Crafty.e('2D, Color, Canvas, Draggable').attr({x: 0, y: 0, w: 200, h: 200}).color('#F00');
    
    //document.querySelector("canvas").id = "image_canvas";


    
    var cameraBorder = document.getElementById("camera-border");
    
    console.log(cameraBorder.children)
    
    cameraBorder.appendChild(renderer.domElement);
    



    
    //document.getElementById("camera-border").appendChild(renderer.domElement);

    renderer.domElement.id = "camera_preview";
    renderer.gammaOutput = true;
    camera = new ZapparThree.Camera();
  


    renderer.setSize(window.innerWidth, window.innerHeight);
    
    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);

        resizeCanvas();


    });

    renderer.setAnimationLoop(render);



// The Zappar library needs your WebGL context, so pass it
    ZapparThree.glContextSet(renderer.getContext());

// Create a ThreeJS Scene and set its background to be the camera background texture
    scene = new THREE.Scene();
    scene.background = camera.backgroundTexture;

    

// Request the necessary permission from the user
    ZapparThree.permissionRequestUI().then((granted) => {
        if (granted)
        {

            resizeCanvas()
            camera.start(true);


        }
        else ZapparThree.permissionDeniedUI();
    });

// Set up our instant tracker group
    tracker = new ZapparThree.InstantWorldTracker();
    trackerGroup = new ZapparThree.InstantWorldAnchorGroup(camera, tracker);



    scene.add(trackerGroup);
    





    var flipped = true;

    function flipPhoto()
    {
        flipped = !flipped;
        camera.start(flipped)
    }

    if(!listeners)
    {

        listeners = true;
        const placementUI = document.getElementById("take-photo");
        const sharePhotoUI = document.getElementById("share-photo");
        const downloadPhotoUI = document.getElementById("download-photo");
        const retakePhotoUI = document.getElementById("retake-photo");
        const flipPhotoUI = document.getElementById("flip-photo");
        const gobackUI = document.getElementById("go-back");
        const gobackUI1 = document.getElementById("go-back1");
        objectHint = document.getElementById("object_hint");
        flashIcon = document.getElementById("flash_camera");
        cameraNavbar = document.getElementById("camera_navbar");
        previewNavbar = document.getElementById("preview_navbar");

        sharePhotoUI.pointerdown = savePhoto;
        downloadPhotoUI.pointerdown = downloadPhoto;
        retakePhotoUI.pointerdown = retakePhoto;
        flipPhotoUI.pointerdown = flipPhoto;
        gobackUI.pointerdown = goBack;
        gobackUI1.pointerdown = goBack;
        
        placementUI.addEventListener("click", () => {

            //hasPlaced = true; // place the guy


            takeScreenshot();


        })



        window.addEventListener( 'touchstart', onTouchStart );
        window.addEventListener( 'touchmove', onTouchMove );
        window.addEventListener( 'touchend', onTouchEnd );
    }




    const loader = new FBXLoader();

    loader.load( modelPath, function ( gltf ) {



        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        ambientLight.castShadow = false;
        scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff, 1)
        spotLight.castShadow = false;
        spotLight.position.set(0, 64, 32);
        scene.add(spotLight);

        gltf.children[1].traverse( function ( child ) {

            if ( child.isMesh ) {

                // switch the material here - you'll need to take the settings from the 
                //original material, or create your own new settings, something like:
                const oldMat = child.material;

                child.material = new THREE.MeshLambertMaterial( {

                    transparent: true,
                    map: oldMat.map,
                    side: THREE.DoubleSide
                    //etc
                } );



            }

        } );


        model = gltf;

        model.position.setX(0);
        model.position.setY(0);

        model.scale.set(scale, scale, scale)
      
        model.isDraggable = true;

        trackerGroup.add(model);





    }, undefined, function ( error ) {

        console.error( error );

    } );





    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });

}



function takeScreenshot()
{
    
    renderer.render( scene, camera );

    // Get canvas from dom
    const canvas = document.querySelector('#camera_preview');
    
    console.log(canvas)


    canvas.style.height = height
    canvas.style.width = width

    


    var myCanvas = canvas.cloneNode();
    var ctx = myCanvas.getContext('2d');
    
    var image = new Image();
    
    image.src = canvas.toDataURL('image/jpeg', 100);
    
    console.log(canvas.toDataURL('image/jpeg', 100))
    
    
    //image.src = document.getElementById("image_canvas").toDataURL('image/jpeg', 100);
    
    console.log(myCanvas)
    
    
    image.onload = function ()
    {
        
  
        ctx.drawImage(image, 0, 0)
        
        
        
        var image2 = new Image();
        image2.src = './css/branding/branding.svg';
    

        image2.onload = function ()
        {

            //ar image3 = new Image();
            //image3.src = document.getElementById("image_canvas").toDataURL('image/jpeg', 100);
            
         
            
                //ctx.drawImage(image3, 0, 0)
            
            
            console.log(renderer.domElement.offsetHeight)

            console.log(canvas.offsetHeight)
            myCanvas.style.height =
                (myCanvas.style.height.replace("px", "") / 1.3) + "px";

            myCanvas.style.width =
                (myCanvas.style.width.replace("px", "") / 1.3) + "px";

            console.log(myCanvas.style.height  + " WIEHEDTH")
            console.log(renderer.domElement.offsetHeight - 110)

            //console.log(canvas.offsetHeight)
            ctx.drawImage(image2, 0, parseInt(ctx.canvas.style.height.replace("px", "")) + 20

                , window.innerWidth,
                window.innerHeight / 5);
            // Convert canvas data to url



            url = myCanvas.toDataURL('image/jpeg', 100);

            document.getElementById("camera-border").classList.add("no-show");
            var preview = document.getElementById("preview");

            preview.classList.remove("no-show");


            var canvasPreview = document.getElementById("canvas_preview");

            var existingCanvas = canvasPreview.querySelector("canvas");

            if(existingCanvas)
                existingCanvas.remove()


            myCanvas.id = "camera_preview_2";
            objectHint.classList.add("hide0");
            flashIcon.classList.add("hideO");
            cameraNavbar.classList.add("hide");
            previewNavbar.classList.remove("hide");

            canvasPreview.append(myCanvas)

            myCanvas.style.height =
                (myCanvas.style.height.replace("px", "") / 1.2) + "px";

            myCanvas.style.width =
                (myCanvas.style.width.replace("px", "") / 1.2) + "px";
        
            
            
            
            

        
            
            
            
            
// Take snapshot
            /*ZapparSharing({
                data: url,
            });*/
        }
        
       
    }
    
    console.log(myCanvas)


        

}

function goBack()
{
    document.getElementById("camera_screen").classList.add("hide");
    document.getElementById("thank_you_screen").classList.remove("hide");
    camera.pause();
}


function savePhoto()
{
    shareCanvasAsImage(url, "test");
}
function downloadPhoto()
{
    saveBase64AsFile(url, "photo");
}

function retakePhoto()
{
    toggleCanvas(document.getElementById("preview"), document.getElementById("camera-border"))
    resizeCanvas();

    //document.getElementById("preview").querySelector("canvas").remove()

    objectHint.classList.remove("hideO");
    flashIcon.classList.remove("hideO");
    cameraNavbar.classList.remove("hide");
    previewNavbar.classList.add("hide");

}


function toggleCanvas(removeShow, addShow)
{
    removeShow.classList.add("no-show");

    addShow.classList.remove("no-show");
}

function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");


    document.body.appendChild(link);
    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
    document.body.removeChild(link);






}

async function shareCanvasAsImage(base64) {


    fetch(base64)
        .then(function(response) {
            return response.blob()
        })
        .then(function(blob) {



            var file = new File([blob], "new_picture.png", {type: blob.type});
            var filesArray = [file];
            var shareData = { files: filesArray};

            console.log(URL.createObjectURL(blob))

            if (navigator.canShare && navigator.canShare(shareData)) {

                // Adding title afterwards as navigator.canShare just
                // takes files as input


                navigator.share(shareData)
                    .then(() => {
                        
                        
                        console.log('Share was successful.')
                    }
                    
                    
                    
                    
                    )
                    .catch((error) => console.log('Sharing failed', error));

            } else {
                console.log("Your system doesn't support sharing files.");
            }

        });
}

const pointer = new THREE.Vector2();

// Set up our render loop
function render() {
    camera.updateFrame(renderer);

    if (!hasPlaced) tracker.setAnchorPoseFromCameraOffset(0, 0, -5);


    
    renderer.render(scene, camera);
    
    
}

var pinching = false;


function onTouchStart(event)
{
  
 

    if(event.touches.length === 2)
    {
        pinching = true;
    }
}

function onTouchEnd(event)
{
    if(pinching)
    {
        pinching = false;
    }
}

var previousDist;

function onTouchMove( event ) {


    console.log(event.touches.length)
    if(pinching)
    {
        event.preventDefault();

        var dist = Math.hypot(
            event.touches[0].pageX - event.touches[1].pageX,
            event.touches[0].pageY - event.touches[1].pageY) / (1000 * scaleIndex);

        console.log(dist);
        
       
        /*if(previousDist < dist) // scaling up
        {
            
        }
        else
        {
            // scaling down
            dist = -dist;
        }
        
        previousDist = Math.sign(dist);*/

        // check current dis and prev dis maybe.
        model.scale.set(dist,  dist,
            dist)
    }
    else
    {
        onAnyTouch(event)
    }
    
    

}

function onAnyTouch(event)
{

    if(!model)
    {
        return;
    }
    event = event.changedTouches[ 0 ];

    var rect = renderer.domElement.getBoundingClientRect();

    pointer.x = ( ( event.clientX - rect.left ) / rect.width ) * 3 - 1;
    pointer.y = - ( ( event.clientY - rect.top ) / rect.height ) * 3 + 2.5;
    



    model.position.setX(pointer.x);
    model.position.setY(pointer.y);
}








