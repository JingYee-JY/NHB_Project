import  * as MainPage from "./mainpage.js";
import  * as CameraScreen from "./index.js";
import  * as FallingGenes from "./games/falling_genes.js";
import  * as CardFlip from "./games/card_flip.js";
import  * as MCQ from "./games/mcq.js";

var mainScreen;
export var flowerInformation;
var infoInit = false;

var fallingGenes, cardFlip, mcq;

var lastSwipedXPos = 0, carouselSlider, imageModal;

var audioPlaying = false;


export class Game {
    constructor(name, description) {

        this.name = name;
        this.description = description;

    }
    
}

export class Question {


    constructor(question, options, answer)
    {
        this.question = question;
        this.options = options; // {A: , B:}
        this.answer = answer;
    }
}



function initGames()
{
    
    
    
    fallingGenes = new Game("Falling Genes", "Catch the correct falling genes! <br> <br> " +
        "Get one point for catching the correct gene. Lose 5 seconds if you catch the wrong gene! :( ");

    cardFlip = new Game("Card Flip", 
        "Flip the cards and match the cards with the correct definition!");

    mcq = new Game("MCQ",
        "Answer the multiple-choice questions! Correct answers give you one point!");
    
    

    console.log(fallingGenes)
}

export class Flower {
    
    constructor(name, title, gameData, description, modelPath, scale, secondScale, audio, game, alphaMapArray, pictureGallery, 
                mainSpritePath) {
        
        this.name = name;
        this.title = title;

        this.gameData = gameData;
        this.description = description;
        
        this.modelPath = modelPath;
        this.scale = scale;
        this.secondScale = secondScale;
        this.audio = audio;
        this.game = game;
        
        this.alphaMapArray = alphaMapArray;
        
        this.pictureGallery = pictureGallery;
        this.mainSpritePath = mainSpritePath;
    }
    
}

export var listOfFlowers;

function initFlowers()
{
    listOfFlowers = {
        "FORMER THONG CHAI MEDICAL INSTITUTION" : new Flower("FORMER THONG CHAI MEDICAL INSTITUTION","FORMER THONG<br>" + "CHAI MEDICAL<br>" + "INSTITUTION", ["A", "B", "C", "D", "E", "F"], 
        `The National Monument testifies to the Chinese pioneers’ spirit of mutual assistance and their generosity towards the poor and needy. Apart from being a medical facility, the building also housed various Chinese guilds and served as the HQ of the Singapore Chinese Chamber of Commerce when it was first established. Read more on <a href="https://www.roots.gov.sg/places/places-landing/Places/national-monuments/former-thong-chai-medical-institution" target="_blank" class="hightlight">Roots.sg`,
            './models/otc/scene.gltf', 7, 9,
            "sounds/chiku.mp3", fallingGenes, [0], 
            ["./css/main_menu/carousel/chiku/1.png",
                "./css/main_menu/carousel/chiku/2.png",
                "./css/main_menu/carousel/chiku/3.png"],
                "./css/plants/otcBuilding.png"),

        "PULUT TAI TAI" : new Flower("PULUT TAI TAI","PULUT<br>" + "TAI TAI",["A", "B", "C", "D", "E", "F"], 
        `Kueh (or kuih in Malay) are types of snacks that have become a staple in Singaporean food culture. This Peranakan kueh, also a traditional Nyonya wedding specialty, is made of glutinous rice tinted blue by butterfly pea flowers. It is then steamed in coconut milk and is served together with kaya. Learn more on <a href="https://www.roots.gov.sg/ich-landing/ich/kueh" target="_blank" class="hightlight">Roots.sg`,
            './models/pulut/PulutTaiTai.fbx', 0.1, 0.7,
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", fallingGenes, [0],
            ["./css/main_menu/carousel/chiku/1.png",
                "./css/main_menu/carousel/chiku/2.png",
                "./css/main_menu/carousel/chiku/3.png"],
            "./css/plants/pulutTauTai.png"),

            "FORMER THONG CHAI MEDICAL INSTITUTION1" :new Flower("FORMER THONG CHAI MEDICAL INSTITUTION","FORMER THONG<br>" + "CHAI MEDICAL<br>" + "INSTITUTION", [new Question("How many<br>courtyards does<br>the building have?", 
        {"A" : "A) 2",
            "B" : "B) 3",
            "C" : "C) 4"},

        "A"

        )], 
        `The National Monument testifies to the Chinese pioneers’ spirit of mutual assistance and their generosity towards the poor and needy. Apart from being a medical facility, the building also housed various Chinese guilds and served as the HQ of the Singapore Chinese Chamber of Commerce when it was first established. Read more on <span class="hightlight">Roots.sg</span>`,
        './models/otc/scene.gltf', 7, 9,
            "sounds/chiku.mp3", mcq, [0], 
            ["./css/main_menu/carousel/chiku/1.png",
                "./css/main_menu/carousel/chiku/2.png",
                "./css/main_menu/carousel/chiku/3.png"],
            "./css/plants/otcBuilding.png"),

        "PULUT TAI TAI1" : new Flower("PULUT TAI TAI","PULUT<br>" + "TAI TAI",[new Question("Which ingredient is<br>NOT needed to make<br>Pulut Tai Tai?", 
                {"A" : "A) Glutinous rice",
                    "B" : "b) Coconut milk",
                    "C" : "C) Gula melaka"},

                "C"

                )], 
                `Kueh (or kuih in Malay) are types of snacks that have become a staple in Singaporean food culture. This Peranakan kueh, also a traditional Nyonya wedding specialty, is made of glutinous rice tinted blue by butterfly pea flowers. It is then steamed in coconut milk and is served together with kaya. Learn more on <a href="https://www.roots.gov.sg/ich-landing/ich/kueh" target="_blank" class="hightlight">Roots.sg`,
                './models/pulut/PulutTaiTai.fbx', 0.07, 0.5,
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", mcq, [0],
            ["./css/main_menu/carousel/jambu/1.png",
                "./css/main_menu/carousel/jambu/2.png",
                "./css/main_menu/carousel/jambu/3.png",
                "./css/main_menu/carousel/jambu/4.png",
                "./css/main_menu/carousel/jambu/5.png"],
                "./css/plants/pulutTauTai.png")
    }
}

export function start(){
    console.log(flowerInformation,"test")

    if(!infoInit) 
    {
        initGames();
        initFlowers();
    }

    initInformation()
    //else
    //{
    //    window.clearInterval(timerVariable);
    //}
}

function openImageModal() 
{
    console.log("test")

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    imageModal.classList.remove("hide");
    
    document.body.style.overflowY = "hidden";
    document.documentElement.style.overflowY = "hidden";

}

function swipeCarouselImage(e)
{

    console.log(e.touches[0].clientX);
    const style = getComputedStyle(carouselSlider);
    
    var marginLeft;
 
    
    if(e.touches[0].clientX > lastSwipedXPos)
    {
        console.log("Swipe right");
        
        if(parseInt(style.marginLeft.replace("px", "")) < 0)
        {
            marginLeft = 10;
            console.log("yes")
        }
         
    }
    else
    {
        console.log("Swipe left");
        
        marginLeft = -10;
        
    }

    console.log(style.marginLeft + " Margin left")

    carouselSlider.style.marginLeft =
        (parseInt(style.marginLeft.replace("px", "")) + marginLeft) + "px";


    lastSwipedXPos = e.touches[0].clientX;



}

export function navigateToCamera()
{
    document.getElementById("thank_you_screen").classList.add("hide");
    document.getElementById("camera_screen").classList.remove("hide");
    CameraScreen.initCamera(flowerInformation.mainSpritePath)
}

function populateImageModal()
{
    var carouselInner = document.querySelector(".carousel-inner");

    var count = 0;

    carouselInner.innerHTML = "";

    flowerInformation.pictureGallery.forEach((value) => 
    {
        console.log(value)
        

        var className = "carousel-item";
        
        if(count === 0)
        {
            className += " active";
        }

        var innerHTML = "        <div class=\"" + className + "\">\n" +
            "                    <img class=\"d-block w-100\" src=\"" +
            "" + value + "\">\n" +
            "                </div>"
        
        count++;
        
        
        carouselInner.innerHTML += innerHTML;
    })
}

export function initInformation()
{

    try {



        imageModal = document.getElementById("start-div");
        document.getElementById("image_anchor").pointerdown = openImageModal;
        

        
        document.getElementById("close_button_image_modal").pointerdown = function () {
            
            imageModal.classList.add("hide");
            document.body.style.overflowY = "scroll";
            document.documentElement.style.overflowY = "scroll";
            
        }
        document.addEventListener("touchmove", function(event){
            event.preventDefault();
            
        });
        
    
        
        /*carouselSlider = document.getElementById("carousel_slider");
        carouselSlider.addEventListener("touchmove", function (e) {

            swipeCarouselImage(e);
        });*/
  

        console.log(document.getElementById("navigate_camera") + " NAV")
        mainScreen = document.getElementById("main_screen");

   
        console.log(document.getElementById("navigate_camera"))


        const contentTitle = document.getElementById("content_title");

        const contentTitle1 = document.getElementById("content_title1");

        var flowerType = decodeURI(localStorage.getItem("flower"));

        

        if(!listOfFlowers[flowerType])
        {
            flowerType = "FLOWER NOT FOUND!"
        }


        flowerInformation = listOfFlowers[flowerType];

        populateImageModal();


        contentTitle.innerHTML = "<b>" + flowerInformation.title + "</b>";


        contentTitle1.innerHTML = "<b>" + flowerType.substring(0, 1).toUpperCase() +
            flowerType.substring(1)+ "</b>";

        const contentDescription = document.getElementById("content_description");


        var description;

        if(flowerInformation)
            description = flowerInformation.description;
        else
        {
            description = "";

            document.getElementById("content_button").remove()
        }

        contentDescription.innerHTML = description;


 

        if(!flowerInformation)
            return;

        MainPage.App(flowerInformation.name,flowerInformation.modelPath, flowerInformation.scale, flowerInformation.alphaMapArray, true);

        var audio = document.createElement("AUDIO")
        
        audio.type = "audio/ogg";

        document.body.appendChild(audio);
        audio.src = flowerInformation.audio;
      

        const audioPlayer = document.getElementById("audio-player");
        const audioPlayerIcon = audioPlayer.querySelector("img");

        audioPlayer.addEventListener("mousedown", function()
        {
         
            
            if(!audioPlaying)
            {
                audioPlayerIcon.src = "./css/main_menu/audio.svg";
                //audioPlayer.style.opacity = 1;
                
                audio.play();
            }
            else
            {
                //audioPlayer.style.opacity = 0.5;

                audioPlayerIcon.src = "./css/main_menu/muted_audio.svg";

                audio.currentTime = 0;  
                audio.pause();
            }
            console.log(audioPlayer.style.opacity)

            audioPlaying = !audioPlaying;
            
        });
  
        console.log(flower + " Flower")

        document.getElementById("content_button").addEventListener("pointerdown", function()
        {
            
            /*var html1 = 
                "<div id=\"how_to_play" + "\" " +
                "w3-include-html=\"./pages/games/how_to_play.html\">" +
                "</div>"*/



            
            
            mainScreen.classList.add("hide");
            //document.body.innerHTML = html1 + document.body.innerHTML;
            //w3.includeHTML();
       

            onGameInfoLoad()
         
        
            
        });


        document.getElementById("threeD_canvas_icon").style.opacity = 1;

        infoInit = true;
    }
    catch(e)
    {
        console.log(e)
        infoInit = false;
    }
    

}


export function onGameInfoLoad()
{

    console.log( flowerInformation,flowerInformation.game)
    
    //const gameTitle = document.getElementById("play_content_game_title");
    //const gameDescription = document.getElementById("content_description");
    
    //gameTitle.innerHTML = "<b>" + flowerInformation.game.name + "</b>"
    //gameDescription.innerHTML = flowerInformation.game.description;



    //const startButton = document.getElementById("content_button");
    
    //startButton.pointerdown = function () {
        console.log("TEST")

        //document.getElementById("how_to_play").remove();
        
        var html2 =
            "<div id=\"" + flowerInformation.game.name + "\" " +
            "w3-include-html=\"./pages/games/" + flowerInformation.game.name.toLowerCase()
                .replace(" ", "_") + ".html\">" +
            "</div>"


        
    

        
        document.querySelector(".game-container").innerHTML = html2 + document.querySelector(".game-container").innerHTML;
        w3.includeHTML();

        if(flowerInformation.game.name.includes("Falling Genes"))
        {
            //window.scrollTop(0);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and 
            //window.scrollTo({ top: 0, behavior: 'smooth' });
            
            document.body.style.overflowY = "hidden";
            document.documentElement.style.overflowY = "hidden";
            FallingGenes.startGame();
        }
        else if(flowerInformation.game.name.includes("Card Flip"))
        {   
            CardFlip.startGame();
        }
        else if(flowerInformation.game.name.includes("MCQ"))
        {
            MCQ.startGame();
        }
    //}

}

export function setlowerInfo(newInfor)
{
    flowerInformation = newInfor;
}







