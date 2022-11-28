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

var ctx, image, dragok, canvas, timeout = undefined, videoMediaStream, takenPhoto, front, mediaInstance,
imageHeight = 200, imageWidth = 200;        
var x = 75;
var y = 50;


// Setup ThreeJS in the usual way
const renderer = new THREE.WebGLRenderer();

var constraints;


function updateConstraints()
{
    constraints = {

        video: {     width: 1280, height: 720,
            facingMode: !front ? "user" : "environment",
        }
    };
    
    console.log(constraints['video']['facingMode'])
}

const video = document.createElement("video");

function flipPhoto()
{
    front = !front;



    navigator.mediaDevices.getUserMedia(constraints)
        .then((mediaStream) => {

            console.log(mediaStream.id)


            videoMediaStream = mediaStream;


            video.srcObject = mediaStream;
            video.onloadedmetadata = () => {
                video.play();
                
            }
        });
}


export function cameFromGame()
{
    listeners = false;
}

function myMove(e){

    if (dragok){
        
        console.log((imageHeight / 3) - 15)
        x = (e.touches[0].clientX - canvas.offsetLeft) - (imageHeight / 3) - 17;
        y = (e.touches[0].clientY - canvas.offsetTop)  - (imageHeight / 3) - 17;
    }
}

function myDown(e){


    x = (e.touches[0].clientX - canvas.offsetLeft) - (imageHeight / 3) - 17;
    y = (e.touches[0].clientY - canvas.offsetTop) - (imageHeight / 3) - 17;
    dragok = true;
    canvas.onmousemove = myMove;
    canvas.ontouchmove = myMove;



    
    e.preventDefault()

}

function myUp(){
    dragok = false;
    console.log("UP")
    canvas.onmousemove = null;
    canvas.ontouchmove = null;
}



export function initCamera(spritePath)
{
    
 




    video.setAttribute('playsinline', 'playsinline');
    
    
    if(!listeners)
    {
        listeners = true;
        objectHint = document.getElementById("object_hint");
        flashIcon = document.getElementById("flash_camera");
        cameraNavbar = document.querySelector(".camera_icons_navbar");
        previewNavbar = document.getElementById("preview_navbar");
        
        const sharePhotoUI = document.getElementById("share-photo");
        const downloadPhotoUI = document.getElementById("download-photo");
        const retakePhotoUI = document.getElementById("retake-photo");
        const flipPhotoUI = document.getElementById("flip-photo");
        const gobackUI = document.getElementById("go-back");
        const gobackUI1 = document.getElementById("go-back1");
        objectHint = document.getElementById("object_hint");
        flashIcon = document.getElementById("flash_camera");
        cameraNavbar = document.querySelector(".camera_icons_navbar");
        previewNavbar = document.getElementById("preview_navbar");

        sharePhotoUI.ontouchstart = savePhoto;
        downloadPhotoUI.ontouchstart = downloadPhoto;
        retakePhotoUI.ontouchstart = retakePhoto;
        flipPhotoUI.ontouchstart = flipPhoto;
        gobackUI.ontouchstart = goBack;
        gobackUI1.ontouchstart = goBack;


        window.addEventListener( 'touchstart', onTouchStart );
        window.addEventListener( 'touchmove', onTouchMove );
        window.addEventListener( 'touchend', onTouchEnd );
    }

    updateConstraints();

    navigator.mediaDevices.getUserMedia(constraints)
        .then((mediaStream) => {

            console.log(mediaStream.id)

   
            videoMediaStream = mediaStream;
            
            
            video.srcObject = mediaStream;
            video.onloadedmetadata = () => {
                video.play();

             
                video.onplay = function () {

                    mediaInstance = this;
                    updateConstraints();
                    console.log(constraints)
             

                    console.log("HU2s");

                    
                    if(canvas)
                    {
                        canvas.remove();
                        console.log("removed")
                    }
                    
                    canvas = document.createElement("canvas");


                    canvas.height = window.innerHeight;
                    canvas.width = window.innerWidth;

                    canvas.id = "camera_canvas";
                    ctx = canvas.getContext('2d');
                    image = new Image();

                    image.src = spritePath;

                    canvas.onmousedown = myDown;
                    canvas.onmouseup = myUp;

                    canvas.ontouchstart = myDown;
                    canvas.ontouchend = myUp;

                    const placementUI = document.getElementById("take-photo");
                    placementUI.onmousedown = takeScreenshot;
                 
                    
                    (function loop ()
                    {




            

                        

                        ctx.drawImage(mediaInstance, 0, 0, window.innerWidth, window.innerHeight);
                        
            
                  
                 
                        timeout = setTimeout(loop, 1000 / 60);
                    
                           

                        /*ctx.fillRect(25, 25, 100, 100);
                        ctx.clearRect(45, 45, 60, 60);
                        ctx.strokeRect(50, 50, 50, 50);*/

                        ctx.drawImage(image, x - 50, y - 50, imageWidth, imageHeight);

                  
                    })();

                
                    console.log(document.getElementById("camera_screen").firstChild)
                    document.getElementById("camera_screen").insertBefore(canvas,
                        document.getElementById("camera_screen").firstChild)
   
               
                    
                    if(takenPhoto)
                    {
                        canvas.classList.add("hide");
                    }

                    
                    
                };

                console.log(mediaStream)
                
                
          
                
                
                
                

            };
        })
        .catch((err) => {
            // always check for errors at the end.
            console.error(`${err.name}: ${err.message}`);
        });
    
    



    document.addEventListener('dblclick', function(event) {
        event.preventDefault();
    }, { passive: false });

}



function takeScreenshot()
{
    


    // Get canvas from dom


    takenPhoto = true;


    var myCanvas = canvas.cloneNode();
    var ctx = myCanvas.getContext('2d');
    
    
    console.log(myCanvas.height);
    var image = new Image();
    
    image.src = canvas.toDataURL('image/jpeg', 0.8);
    
    console.log(canvas.toDataURL('image/jpeg', 0.8))
    
    
    //image.src = document.getElementById("image_canvas").toDataURL('image/jpeg', 100);
    
    console.log(myCanvas)
    
    
    image.onload = function ()
    {
        
  
        ctx.drawImage(image, 0, 0)
        
        
        
        var image2 = new Image();
        image2.src = './css/camera/cameraBottom.svg';

        var image3 = new Image();
        image3.src = './css/main_menu/logo.svg';
    

        image2.onload = function ()
        {

            //ar image3 = new Image();
            //image3.src = document.getElementById("image_canvas").toDataURL('image/jpeg', 100);
            
         
            
            //ctx.drawImage(image3, 0, 0)
            
            
            console.log(renderer.domElement.offsetHeight)

            console.log(canvas.offsetHeight)
            myCanvas.style.height =
                (myCanvas.height / 1.3) + "px";

            myCanvas.style.width =
                (myCanvas.width / 1.3) + "px";

            console.log(myCanvas.style.height  + " WIEHEDTH")
            console.log(renderer.domElement.offsetHeight - 110)

            //console.log(canvas.offsetHeight)
            ctx.drawImage(image2, 0, parseInt(ctx.canvas.style.height.replace("px", "")) + 87
                , window.innerWidth,
                window.innerHeight / 10);
            // Convert canvas data to url



            url = myCanvas.toDataURL('image/jpeg', 0.8);

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
            
            canvas.classList.add("hide");

            canvasPreview.append(myCanvas)

            myCanvas.style.height =
                (myCanvas.height / 1.5) + "px";

            myCanvas.style.width =
                (myCanvas.width / 1.5) + "px";
            
            
            console.log((myCanvas.style.height.replace("px", "") / 1.2) + "px" )
        
            
            
            
            

        
            
            
            
            
            // Take snapshot
            /*ZapparSharing({
                data: url,
            });*/
        }

        image3.onload = function ()
        {

            //ar image3 = new Image();
            //image3.src = document.getElementById("image_canvas").toDataURL('image/jpeg', 100);
            
         
            
            //ctx.drawImage(image3, 0, 0)
            
            
            console.log(renderer.domElement.offsetHeight)

            console.log(canvas.offsetHeight)
            myCanvas.style.height =
                (myCanvas.height / 1.3) + "px";

            myCanvas.style.width =
                (myCanvas.width / 1.3) + "px";

            console.log(myCanvas.style.height  + " WIEHEDTH")
            console.log(renderer.domElement.offsetHeight - 110)

            //console.log(canvas.offsetHeight)
            ctx.drawImage(image3, parseInt(ctx.canvas.style.width.replace("px", "")) /2.1, 0 + 10

                , window.innerWidth/3.7,
                window.innerHeight / 11);
            // Convert canvas data to url



            url = myCanvas.toDataURL('image/jpeg', 0.8);

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
            
            canvas.classList.add("hide");

            canvasPreview.append(myCanvas)

            myCanvas.style.height =
                (myCanvas.height / 1.5) + "px";

            myCanvas.style.width =
                (myCanvas.width / 1.5) + "px";
            
            
            console.log((myCanvas.style.height.replace("px", "") / 1.2) + "px" )
        
            
            
            
            

        
            
            
            
            
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


    videoMediaStream.getTracks()[0].stop();
    canvas.remove();
    clearTimeout(timeout)
    //camera.pause();
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
    //resizeCanvas();


    takenPhoto = false;

    document.getElementById("canvas_preview").querySelector("canvas").remove()
    
    canvas.classList.remove("hide");

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
            event.touches[0].pageY - event.touches[1].pageY);

     
        
        
        imageHeight = dist;
        imageWidth = dist;

        console.log(imageHeight);

    
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








