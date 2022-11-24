import  * as Main from "./main_screen.js";

const loadingScreen = document.getElementById("selection_screen");

const mainScreen = document.getElementById("main_screen");

const button1 = document.getElementById("selection_button1")

const button2 = document.getElementById("selection_button2")

document.getElementById("selection_button1").addEventListener("mousedown", function()
        {

            console.log("OTC")
            localStorage.setItem("flower", "OTC BUILDING");

            onLoad();
            
        });

document.getElementById("selection_button2").addEventListener("mousedown", function()
        {
            console.log("PULUT")
            localStorage.setItem("flower", "PULUT TAI TAI");
            
            onLoad()

        });

function onLoad()
{
        loadingScreen.classList.add("fade");
        loadingScreen.classList.remove("starting")
        loadingScreen.classList.remove("visible")

        mainScreen.classList.add("starting")
        mainScreen.classList.remove("hide");
        
        document.documentElement.style.background = "#1622AB";

        document.body.style.background = "#1622AB";
  

        var delayInMilliseconds = 2000;

        setTimeout(function() {
            //your code to be executed after 1 second

            loadingScreen.classList.add("hide");


            mainScreen.classList.add("visible")

            Main.start();

            document.body.style.overflowY = "scroll";
            document.documentElement.style.overflowY = "scroll";            
       
    

        }, delayInMilliseconds);
            
}
