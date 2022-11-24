
import  * as Main from "../main_screen.js";
import  * as GameManager from "../games/game_manager.js";
import  * as CameraScreen from "../index.js";
import  * as ThankYouScreen from "../thank_you_screen.js";
import  * as MCQ from "../games/mcq.js";

var gameStarted = true;
var once = true;
var mcq;
var gravityTimer;

var existingGenes = [];

var randomGeneList = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
var score = 0;
var lives;

var scoreUI, timerUI;

const MAX_GENES = 10;



class GeneObject {
    
    constructor(geneType, htmlElement, speed) 
    {
        this.geneType = geneType;
  
        
        this.htmlElement = htmlElement;
        this.speed = speed;
    }
}



export function startGame()
{

    console.log("new")
    gameStarted = once = true;
    score = 0;
    lives = 3;


    existingGenes = [];
    
    scoreUI = document.getElementById("score");
    scoreUI.innerHTML = "<b>" + score + "/" + MAX_GENES + "</b>"
    //timerUI = document.getElementById("timer");


    updateProgressBar()

    var timerVariable2 = window.setInterval(function () {

        if(GameManager.gameStarted)
        {
            
            console.log(existingGenes.length)

            if(existingGenes.length < MAX_GENES)
            {
                


                var randomGene = randomGeneList[Math.floor(Math.random() * randomGeneList.length)]

                var geneHTML = document.createElement("div");

                geneHTML.classList.add("gene_box");

                geneHTML.style.left = (Math.random() * (80 - 20) + 20) + "%";

                //geneHTML.textContent = randomGene;

                if(Main.flowerInformation.gameData.includes(randomGene))
                {
                    var randomCorrect = Math.floor(Math.random() * 2)
                    if(randomCorrect == 0){
                        geneHTML.classList.add("correct_gene_box");
                    }
                    if(randomCorrect == 1){
                        geneHTML.classList.add("correct_gene_box2");
                    }
                }

                geneHTML.addEventListener("touchstart", function () {

                    onCatchGene(randomGene, geneHTML);
                })

                document.body.append(geneHTML);



                var geneObject = new GeneObject(randomGene, geneHTML,
                    Math.random() * (5 - 2) + 1)

                existingGenes.push(geneObject);




                //window.clearInterval(gravityTimer)


            }

        }
        else{
            window.clearInterval(timerVariable2)
        }

    }, 500);

 
    /*var timerVariable = window.setInterval(function () {
        
        if(gameStarted)
        {
            timer -= 1;

     
            
            
            if(timer <= 0)
            {

                if(timer < 0)
                    timer = 0;
                
                gameStarted = false;

                window.clearInterval(gravityTimer);
                window.clearInterval(timerVariable);
                window.clearInterval(timerVariable2);

                removeAllGenes();
                document.getElementById("Falling Genes").remove();
               

                document.getElementById("thank_you_screen").classList.remove("hide");

                ThankYouScreen.registerThankYouScreen();

                
              
                
                
                
            }

            timerUI.innerHTML = "<b>" + timer + "s</b>";
            
        }
     
    }, 1000);*/


    gravityTimer = window.setInterval(function () {

        if(GameManager.gameStarted)
        {
            for(let i = 0; i < existingGenes.length; i++)
            {
                var currentGene = existingGenes[i];

                var computedStyle = getComputedStyle(currentGene.htmlElement);
                
             


                currentGene.htmlElement.style.top = (parseInt(computedStyle.top.replace("px", ""))
                    + currentGene.speed) + "px";
                
                

                
                if(parseInt(computedStyle.top.replace("px", "")) > 600)
                {
                    existingGenes.splice(i, 1);
                    currentGene.htmlElement.remove();
                }
        
                
            }
        }

    }, 10)

    GameManager.initGame(Main.flowerInformation.name, true, removeAllGenes, "Falling Genes", 30,
        timerVariable2, gravityTimer)




    /*const backButton = document.getElementById("back-button");

    backButton.ontouchstart = function () {

        document.getElementById("Falling Genes").remove();
        CameraScreen.cameFromGame();
        
        document.getElementById("main_screen").classList.remove("hide");

        window.clearInterval(gravityTimer);
        window.clearInterval(timerVariable);
        window.clearInterval(timerVariable2);
        
        
        removeAllGenes();

    
        
        Main.initInformation();
      
    }*/

    console.log("test");
}

function removeAllGenes()
{
    
    var genes = document.querySelectorAll(".gene_box");
    console.log(genes)

    for(let i = 0; i < genes.length; i++)
    {

        genes[i].remove();
    }
}

function onCatchGene(gene, element)
{
   
    if(!gameStarted)
        return;
    
    if(Main.flowerInformation.gameData.includes(gene))
    {
        score++;

        scoreUI.innerHTML = "<b>" + score + "/" + MAX_GENES + "</b>"
        
        if(score == MAX_GENES )
        {
            console.log("ZERO")
            GameManager.nextGame(Main.flowerInformation.name,"Falling Genes", removeAllGenes, GameManager.timerVariable, gravityTimer)
        }
        
    }
    else
    {
        lives -= 1;
        GameManager.setLives(lives)

        let heart = document.querySelector(".heart")
        heart.classList.add("empty")
        heart.classList.remove("heart")
        if(GameManager.lives == 0){
            GameManager.end("Falling Genes", removeAllGenes, GameManager.timerVariable, gravityTimer)
        }

        //GameManager.timer -= 5; // penalty

        /*console.log(GameManager.getTimer() + " PEN")
        GameManager.setTimer(GameManager.getTimer() - 5)
        
        if(GameManager.getTimer() < 0)
            GameManager.setTimer(0)
        
        GameManager.timerUI.innerHTML = "<b>" + GameManager.getTimer() + "s</b>";
        
        console.log(GameManager.getTimer())*/
    }
    
 
    
    
    for(let i = 0; i < existingGenes.length; i++)
    {
        if(existingGenes[i].htmlElement === element)
        {
            element.remove();
            existingGenes.splice(i, 1);
            
            break;
        }
    }
    
    
}

function updateProgressBar(){
    var timerVariable = window.setInterval(function () {

        if(GameManager.gameStarted)
        {
            let percentage = (score / MAX_GENES) * 100
            document.querySelector(".progress__fill").style.width = `${percentage}%`
        }
        else{
            window.clearInterval(timerVariable);
        }

    }, 100);
}