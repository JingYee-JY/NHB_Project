import * as GameManager from "./game_manager.js";

var timer, gameStarted = true;
var scoreUI;
var score = 0;

const START_TIME = 59;


let cards = {};

let cardTypes = ["hearts", "spade", "club"];
let cardsOpened = [];

class Card {



    constructor(answer, imagePath) {

        this.timesUsed = 0;
        this.answer = answer;
        this.imagePath = imagePath;
        



    }
    


}


function initCards()
{
    
    for(let i = 0; i < cardTypes.length; i++)
    {
        var cardTypeName = cardTypes[i];

        cards[cardTypeName] = new Card("This is " + cardTypeName, cardTypeName + ".png");
        

        
    }

    
}




export function startGame()
{
    GameManager.initGame(true, function() {}, 
        "Card Flip", "Thank you for playing", 15)

    scoreUI = document.getElementById("score");

    initCards();
    score = 0;

    GameManager.setGameStarted(false)

    for(let i = 0; i < cardTypes.length * 2; i++) {


        
        var foundCard = false, toUseAnswerCard = false;
        var cardObjectFound = undefined; 
        
        while(!foundCard)
        {
            var randomCardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            
            var randomCardObject = cards[randomCardType];
            
            //console.log(randomCardObject)
            
            if(randomCardObject.timesUsed < 2)
            {



                if(randomCardObject.timesUsed === 1)
                {
                    toUseAnswerCard = true;
                }

                randomCardObject.timesUsed++;
                //console.log(randomCardType)
                cardObjectFound = randomCardObject;
                foundCard = true;
            }
        }
        
        var contents =   toUseAnswerCard ? "<p class='card-answer'>" + cardObjectFound.answer +"</p>" : 
            "<img class=\"card-image\" src=\"./css/images/" + cardObjectFound.imagePath + "\">" ;


        var innerHTML;


        innerHTML = "        <div class=\"flip-card rotate-card card-front\" " +
            "id=\"match_card_" + randomCardType + randomCardObject.timesUsed + "\"" + ">\n" +
            "            <div class=\"flip-card-inner\" >\n" +
            "                <div class=\"flip-card-front\">\n" +
            "                    <img src=\"./css/images/card_background.png\" alt=\"Avatar\" class='card-front'>\n" +
            "                </div>\n" +
            "                <div class=\"flip-card-back\">\n" +
                    contents +
            "" +
            "\n" +
            "                    \n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </div>";
        
  
        

        
        
        document.getElementById("play-area").innerHTML += innerHTML; // idk why it resets the previous on mouse down
        // so i need another for loop below. after everything is assigned


   
        
        

        

    }

    for(let i = 0; i < cardTypes.length; i++) {


        var cardTypeName = cardTypes[i];
        var cardElement1 = document.getElementById("match_card_" + cardTypeName + 1);

        var cardElement2 = document.getElementById("match_card_" + cardTypeName + 2);

        /*cardElement.onmousedown = function (event){
            
            //console.log("mouse down")
            //onFlipCard(event.target.parentElement.parentElement.parentElement.id)
        };*/

        //console.log("match_card_" + randomCardType + i)
        //console.log(cardElement1)

        cardElement1.onmousedown = function (event){

         
            onFlipCard(event.target.parentElement.parentElement.parentElement.id)
        };
        cardElement2.onmousedown = function (event){

    
            onFlipCard(event.target.parentElement.parentElement.parentElement.id)
        };




 



    }

    var delayInMilliseconds = 300; //1 second

    setTimeout(function() {
        //your code to be executed after 1 second

        for (const [key, value] of Object.entries(cards)) {
            
            
            //console.log(key, value + " TEST!");

            flipCardAnimation("match_card_" + key + 1, 180);
            flipCardAnimation("match_card_" + key + 2, 180);
        }

        delayInMilliseconds += 1000; //1 second

        setTimeout(function() {
            //your code to be executed after 1 second

            for (const [key, value] of Object.entries(cards)) {


                //console.log(key, value + " TEST!");

                flipCardAnimation("match_card_" + key + 1, 0);
                flipCardAnimation("match_card_" + key + 2, 0);
                
            }
            GameManager.setGameStarted(true);
        }, delayInMilliseconds);

    }, delayInMilliseconds);


  
    
    

    
    

}

function onFlipCard(id)
{
    
    if(!id.includes("match_card_"))
        return;
    
    if(GameManager.gameStarted)
    {
        
        if(cardsOpened.length < 2)
        {
            console.log(id + " FLIP")
            
            if(cardsOpened.length > 0)
            {
                console.log(cardsOpened[0].id + " IDDDD")
                if(id === cardsOpened[0].id)
                {
                    return;
                }
            }
            flipCardAnimation(id, 180);

            var delayInMilliseconds = 700; //1 second

            /*setTimeout(function() {
                //your code to be executed after 1 second
    
                flipCardAnimation(id, 0);
            }, delayInMilliseconds);*/

            
      
            cardsOpened.push(document.getElementById(id));
            

            
            
            if(cardsOpened.length === 2)
            {
   
                var correct = false;
                
                var card1 = cardsOpened[0];
                var card2 = cardsOpened[1];

                var cardType1 = card1.id.substring(0, card1.id.length - 1).replace("match_card_", "");
                var cardType2 = card2.id.substring(0, card2.id.length - 1).replace("match_card_", "");
                
                if(cardType1 === cardType2)
                {

                    correct = true;
                    score++;

                    scoreUI.innerHTML = "<b>" + score + "</b>"
                    
           
                
                }
         

                var delayInMilliseconds = 700; //1 second

                setTimeout(function() {
                    //your code to be executed after 1 second

                    if(correct)
                    {
                        card1.remove();
                        card2.remove();
                        
                        if(score === cardTypes.length)
                        {
                            GameManager.endGame();
                        }
                    }
                    else
                    {
                        flipCardAnimation(card1.id, 0);
                        flipCardAnimation(card2.id, 0);
                    }
                   
                }, delayInMilliseconds);

                cardsOpened = [];
            }
        }
  
        
        
    }
   

}


function flipCardAnimation(id, degrees)
{
    var card = document.getElementById(id);

    card.style.transform = "rotateY(" + degrees + "deg)";
    card.firstElementChild.style.transform = "rotateY(" + degrees + "deg)";
    
    //console.log(card.firstElementChild)
    
    //console.log(card.children[1])
}