import * as Main from "./main_screen.js";
import  * as CameraScreen from "./index.js";
import  * as Selection from "./selection_screen.js";

export function registerThankYouScreen(lose)
{
    console.log(document.getElementById("share_icon"))

    
    

    const shareData = {
        title: 'Share Link',
        text: 'Visit our virtual Genomic Gardens!',
        url: 'https://eqn.zappar.io/870186909373705178/0.1.43/?flower=ciku'
    }


  
    /*document.getElementById("share_icon").onmousedown = function()
    {
    
        navigator.share(shareData);
    };*/
    
    console.log(document.getElementById("content_button"))
    
    const resultsTitle = document.getElementById("results_title");
    const resultsDescription = document.getElementById("content");
    const resultBackground = document.getElementById("play_content_div")
    const resultImage = document.getElementById("resultImage");
    const image = document.getElementById("image");
    const backButton = document.getElementById("back_button");
    const againButton = document.getElementById("visit_button");
    const camera = document.getElementById("navigate_camera");


    image.src = Main.flowerInformation.mainSpritePath;

    if(lose)
    {
        resultsTitle.textContent = "KEEP IT UP!"
        resultsDescription.style.opacity = 0;
        againButton.style.display = "";
        backButton.style.display = "none";
        resultBackground.style.background = ""
        resultImage.src = "./css/images/losehearts.png"
        camera.style.opacity = 0;
        resultBackground.style.marginTop = "30px"
        resultBackground.style.marginBottom = "-20px"
    }
    if(!lose)
    {

        resultsTitle.textContent = "YOU WIN!";
        resultsDescription.style.opacity = 1;
        againButton.style.display = "none";
        backButton.style.display = "";
        //resultBackground.style.background = `url("./css/images/win.png") no-repeat`
        resultBackground.style.backgroundSize = "100% 100%"
        resultImage.src = "./css/images/trophy.png"
        camera.onmousedown = Main.navigateToCamera;
        camera.style.opacity = 1;
        resultBackground.style.marginTop = "55px"
        resultBackground.style.marginBottom = "-70px"
    }
    
    againButton.onmousedown = function () {

        //window.scrollTop(0);
        window.scrollTo(0, 0);
        //window.scrollTo({ top: 0, behavior: 'smooth' });

        document.getElementById("thank_you_screen").classList.add("hide");
        Main.setlowerInfo(Main.listOfFlowers[Main.flowerInformation.name])
        Main.onGameInfoLoad();
    }
    
    backButton.onmousedown = function()
    {
      
        //window.scrollTop(0);
        window.scrollTo(0, 0);
        //window.scrollTo({ top: 0, behavior: 'smooth' });

        document.getElementById("thank_you_screen").classList.add("hide");
        document.getElementById("selection_screen").classList.remove("hide");
        document.getElementById("selection_screen").classList.remove("fade");

        document.getElementById("selection_button1").addEventListener("mousedown", function()
        {
            console.log("OTC")
            localStorage.setItem("flower", "FORMER THONG CHAI MEDICAL INSTITUTION");

            Selection.onLoad();
            
        });

        document.getElementById("selection_button2").addEventListener("mousedown", function()
        {

            console.log("PULUT")
            localStorage.setItem("flower", "PULUT TAI TAI");
            
            Selection.onLoad()

        });
        
        //Main.initInformation();
        //CameraScreen.cameFromGame();
    };
}





