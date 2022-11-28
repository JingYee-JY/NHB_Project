import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/loaders/GLTFLoader.js';
import {onLoadSplash} from "../js/splash_screen.js";

var interval = undefined;
var width;
var height;
var model;
var rotation = false;

export function App(name, modelPath, scale, alphaMapArray, location) {


  console.log(scale)
  const scene = new THREE.Scene()

  var contentImage;
  
  if(location == true){
    contentImage = document.getElementById("content_image");
    width = document.getElementById("content_image").clientWidth;
    height = document.getElementById("content_image").clientHeight;
  }
  else{
    contentImage = document.getElementById("mcq_border");
  }
  console.log(width, height)
  //const camera = new THREE.PerspectiveCamera(
  //    50, document.getElementById("content_image").clientWidth / 
  //    document.getElementById("content_image").clientHeight, 1, 10000
  //);
  const camera = new THREE.PerspectiveCamera(
    50, width / 
    height, 1, 10000
);
  camera.position.z = 96


  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.gammaOutput = true;


  /*const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });*/
  renderer.setClearColor(0xffffff, 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  
  if(document.getElementById("preview_model"))
  {
    document.getElementById("preview_model").remove();
  }

  contentImage.appendChild(renderer.domElement);

  var newDiv = contentImage.appendChild(document.createElement("div"));
  
  newDiv.id = "test";

  renderer.domElement.id = "preview_model"


  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.castShadow = false;
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 1)
  spotLight.castShadow = false;
  spotLight.position.set(0, 64, 32);
  scene.add(spotLight);

  const fbxLoader = new FBXLoader();
  const gltfLoader = new GLTFLoader();

  interval = undefined;
  if(name == "FORMER THONG CHAI MEDICAL INSTITUTION"){
    gltfLoader.load(modelPath, (gltfScene) =>{
      gltfScene.scene.position.y = -5;
      gltfScene.scene.position.x = 0;

      model = gltfScene.scene;

      var previewModel = document.getElementById("preview_model");
        var threeDimensionIndicator = document.getElementById("threeD_canvas_icon");
        var threeDimensionIndicator2 = document.getElementById("threeD_canvas_icon2");
        
     
    
        previewModel.onpointerdown = function () {
    
        
          if(!interval)
          {
        
            interval = setInterval(function () {
              console.log("test")
              
              if(threeDimensionIndicator2.style.opacity >= 0)
              {
                threeDimensionIndicator.style.opacity-= 0.1;
                threeDimensionIndicator2.style.opacity -= 0.1;
                threeDimensionIndicator2.style.animation = "paused"
              }
              else
              {
                clearInterval(interval);
              }
                
              
            }, 40);
          }
    
        }

      console.log(gltfScene.scene)
      gltfScene.scene.scale.set(scale,scale,scale)
      scene.add(gltfScene.scene);
    })
  }
  else{
      fbxLoader.load(modelPath, (fbx)=> {
        fbx.position.y = -5;
        fbx.position.x = 0;
    
    
        model = fbx
        //onLoadSplash();
    
    
        
        console.log(fbx);
    
        const loader = new THREE.ImageLoader();
    
        var previewModel = document.getElementById("preview_model");
        var threeDimensionIndicator = document.getElementById("threeD_canvas_icon");
        var threeDimensionIndicator2 = document.getElementById("threeD_canvas_icon2");
        
     
    
        previewModel.onpointerdown = function () {
    
        
          if(!interval)
          {
        
            interval = setInterval(function () {
              console.log("test")
              
              if(threeDimensionIndicator2.style.opacity >= 0)
              {
                threeDimensionIndicator.style.opacity-= 0.1;
                threeDimensionIndicator2.style.opacity -= 0.1;
                threeDimensionIndicator2.style.animation = "paused"
              }
              else
              {
                clearInterval(interval);
              }
                
              
            }, 40);
          }
    
        }
    
    
    
        alphaMapArray.forEach((value) =>
        {
          fbx.children[value].traverse( function ( child ) {
    
            if ( child.isMesh ) {
    
              // switch the material here - you'll need to take the settings from the 
              //original material, or create your own new settings, something like:
              const oldMat = child.material;
    
              child.material = new THREE.MeshLambertMaterial( {
    
                  map: oldMat.map,
                  side: THREE.DoubleSide
                  //etc
              } );
    
    
    
            }
    
          } );
        })
        
    
        
    
        fbx.scale.set(scale,scale,scale)
        scene.add(fbx);
      })
  }

  //fbxLoader.load('./src/assets/stone/Stone.fbx', (fbx)=> {
  //  fbx.position.y = 30;
  //  fbx.scale.set(5,5,5)
  //  scene.add(fbx);
  //})
//
  //const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
  //const boxMaterial = new THREE.MeshNormalMaterial();
  //const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  //scene.add(boxMesh)

  //add orbit controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false
  controls.minDistance = 30
  controls.maxDistance = 50
  //Ingot
  controls.target.set(0,0,0)
  
  //Stone
  //controls.target.set(-25,30,15)

  controls.update()


  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);




  });
  
  const animate = () =>{
    //boxMesh.rotation.x += 0.01;
    //boxMesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate)
    if(model)
    {
      if(rotation)
      {
        if(model.rotation.y > -1.3)
        {
          model.rotation.y -= 0.01;
        }
        else
        {
          model = undefined;
        }
      }
    }
  }
  
  const gltfanimate = () =>{
    //boxMesh.rotation.x += 0.01;
    //boxMesh.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(gltfanimate)
    if(model)
    {
      if(rotation)
      {
        if(model.rotation.y > -1.3)
        {
          model.rotation.y -= 0.01;
        }
        else
        {
          model = undefined;
        }
      }
    }
  }

  if(name == "FORMER THONG CHAI MEDICAL INSTITUTION"){
    gltfanimate()
  }
  else{
    animate()
  }
}






export function allowModelRotation()
{
    rotation = true;
}


