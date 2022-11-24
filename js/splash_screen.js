

const splashScreen = document.getElementById("splash_screen");

const loadingScreen = document.getElementById("selection_screen");

setTimeout(function() {
    //your code to be executed after 1 second

    document.body.style.display = "block"




    document.getElementById("splash_screen").classList.add("splash_screen_loaded")
    
    onLoadSplash();


}, 500);



document.body.style.overflowY = "hidden";
document.documentElement.style.overflowY = "hidden";

export function onLoadSplash()
{
 
    
    console.log("Hi")
    var delayInMilliseconds = 2000;

    setTimeout(function() {
        //your code to be executed after 1 second

        console.log("test")

        splashScreen.classList.add("fade");
  

        var delayInMilliseconds = 2000;

        setTimeout(function() {
            //your code to be executed after 1 second

            splashScreen.remove()

            loadingScreen.classList.add("visible");

            document.documentElement.style.background = "#1622AB";

            document.body.style.background = "#1622AB";
            
       
    

        }, delayInMilliseconds);

    }, delayInMilliseconds);
}