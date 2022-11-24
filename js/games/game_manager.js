﻿import * as ThankYouScreen from "../thank_you_screen.js";
import * as CameraScreen from "../index.js";
import * as Main from "../main_screen.js";

export var timer = 30, gameStarted = true, lives = 3;
export var timerUI;

const START_TIME = 30;
var savedGameName;

export var lose = true;
export var timerVariable;

export function initGame(object,timerBoolean, clearGame, gameName, startTime, ...timerVariables)
{
  
    
    if(timerBoolean)
    {


        savedGameName = gameName;
        gameStarted = true;
     
        
       

        timer = startTime;
        console.log(timer)

        timerUI = document.querySelector(".timer")

        timerUI.innerHTML = "<b>" + timer + "</b>";
        
        timerVariable = window.setInterval(function () {

            if(gameStarted)
            {
                console.log(lose)
               
                timer--;


                if(timer <= 0)
                {

                    if(timer < 0)
                        timer = 0;

                    end(gameName, clearGame ,timerVariable, ...timerVariables)





                }


                timerUI.innerHTML = "<b>" + timer + "</b>";

            }

        }, 1000);
        
    }


    /*const backButton = document.getElementById("back-button");

    backButton.ontouchstart = function () {

        clearAllTimers(timerVariable, timerVariables)

        
 
        //CameraScreen.cameFromGame();

        document.getElementById(gameName).remove();


        document.getElementById("thank_you_screen").classList.remove("hide");


        ThankYouScreen.registerThankYouScreen(true);
  


        clearGame();



        //Main.initInformation();

    }*/
}

export function nextGame(object, gameName, clearGame,timerVariable, ...timerVariables){

    gameStarted = false;

    clearAllTimers(timerVariable, timerVariables)

    clearGame();
    document.getElementById(gameName).remove();

    Main.setlowerInfo(Main.listOfFlowers[object + 1]);
    Main.onGameInfoLoad();
}


export function end(gameName, clearGame,timerVariable, ...timerVariables){

    gameStarted = false;

    if(timerVariable != null){
        clearAllTimers(timerVariable, timerVariables)
    }

    clearGame();

    document.getElementById(gameName).remove();


    document.getElementById("thank_you_screen").classList.remove("hide");

    ThankYouScreen.registerThankYouScreen(lose);
}


function clearAllTimers(timerVariable, timerVariables)
{


    window.clearInterval(timerVariable);
    for(let i = 0; i < timerVariables.length; i++)
    {
        
        window.clearInterval(timerVariables[i]);
    }
    
}

export function setTimer(newTime)
{
    
    console.log(timer + " TIMER")
    timer = newTime;
}

export function setLives(newLives)
{
    
    console.log(lives + " LIVES")
    lives = newLives;
}

export function getTimer()
{
    console.log(timer + " GET TIME")
    return timer;
}

export function setGameStarted(started)
{
    gameStarted = started;
}


export function endGame()
{
    timer = 0;
}

export function setLose(newValue)
{

    
    lose = newValue;
}